"use client";

import { useEffect, useState } from "react";

import Tabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/server/data/events";
import { api } from "@/trpc/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

export default function BeyondStudies() {
  const [events, setEvents] = useState(eventsData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync: uploadFile } = api.s3.upload.useMutation();
  const { mutateAsync: parseEvent } = api.chatgpt.parseEvent.useMutation();

  useEffect(() => {
    console.log(events);
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    }
  };

  // Function to load an image and convert it to Base64
  function getImageBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result); // Ensure reader.result is a string
        } else {
          reject(new Error("Failed to convert file to Base64."));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Converts the file to Base64
    });
  }

  // Function to hash the image
  async function hashImage(file: File) {
    try {
      const base64Image = (await getImageBase64(file)) as string;

      // Hash the Base64 string
      const hash = CryptoJS.SHA256(base64Image).toString(CryptoJS.enc.Hex);
      // console.log("Hash:", hash);
      return hash;
    } catch (error) {
      console.error("Error hashing image:", error);
    }
  }
  // Function to upload the image to S3 using the signedUrl
  async function uploadImageToS3(signedUrl: string, file: File) {
    try {
      const response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type, // Ensure correct content type is passed
        },
      });

      if (response.status === 200) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image to S3:", error);
    }
  }

  // Function to handle file upload
  const handleAddCard = async () => {
    if (!selectedFile) return;
    try {
      const hashedImg = await hashImage(selectedFile);

      if (hashedImg) {
        // Use the tRPC mutation to get the signed URL from the backend
        const response = await uploadFile({ key: hashedImg });
        // console.log("Signed URL:", response.signedUrl);
        // console.log("Source URL:", response.srcUrl);

        // post file to the signed URL
        await uploadImageToS3(response.signedUrl, selectedFile);

        const content = await parseEvent({ srcUrl: response.srcUrl });
        console.log("Content:", content);
      }
    } catch (error) {
      console.error("Error processing the file:", error);
    }
  };

  return (
    <>
      <div className="mx-auto text-center md:container">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Beyond Studies
        </h1>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          onChange={handleFileChange}
        ></input>
        <Button className="inline-block justify-end" onClick={handleAddCard}>
          Add Card
        </Button>
        <Tabs tabsData={eventsData} />{" "}
      </div>
    </>
  );
}
