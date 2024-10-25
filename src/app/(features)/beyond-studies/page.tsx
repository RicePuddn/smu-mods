"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { atcb_action } from "add-to-calendar-button-react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { format } from "date-fns";
import { Calendar, Loader2, Star, Trash } from "lucide-react";

import EventTabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PADDING } from "@/config";
import { eventsData } from "@/server/data/events";
import { useEventStore } from "@/stores/event/provider";
import { api } from "@/trpc/react";
import { schoolEventSchema } from "@/types/primitives/event";

export default function BeyondStudies() {
  const { events, addEvent, removeEvent } = useEventStore((state) => state);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: uploadFile } = api.s3.upload.useMutation();
  const { mutateAsync: parseEvent } = api.chatgpt.parseEvent.useMutation();

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

  async function uploadImageToS3(signedUrl: string, file: File) {
    try {
      const response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
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
      setIsLoading(true);
      const hashedImg = await hashImage(selectedFile);

      if (hashedImg) {
        const response = await uploadFile({
          key: hashedImg,
          type: selectedFile.type,
        });
        await uploadImageToS3(response.signedUrl, selectedFile);

        const content = await parseEvent({
          srcUrl: response.srcUrl,
          key: response.key,
        });
        const parsed = schoolEventSchema.parse(JSON.parse(content));
        addEvent(parsed);
      }
    } catch (error) {
      console.error("Error processing the file:", error);
    } finally {
      setSelectedFile(null);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: PADDING,
      }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold">Beyond Studies</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Upload Image</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <Button
        onClick={handleAddCard}
        className="mb-4"
        disabled={isLoading || !selectedFile}
      >
        {isLoading && <Loader2 className="mr-2 animate-spin" />} Add Event
        Details
      </Button>
      <div>
        <h2 className="text-xl font-bold">Your Starred Events</h2>
        <EventTabs
          tabsData={{
            upcoming: events.filter(
              (event) => new Date(event.startTime) > new Date(),
            ),
            past: events.filter(
              (event) => new Date(event.endTime) < new Date(),
            ),
          }}
          eventCardActions={[
            (event, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    atcb_action({
                      name: event.title,
                      description: event.description,
                      startDate: format(
                        new Date(event.startTime),
                        "yyyy-MM-dd",
                      ),
                      startTime: format(new Date(event.startTime), "HH:mm"),
                      endTime: format(new Date(event.endTime), "HH:mm"),
                      location: event.venue,
                      options: ["Google", "Outlook.com", "iCal", "Apple"],
                      listStyle: "modal",
                      lightMode: "bodyScheme",
                    });
                  }}
                >
                  <Calendar className="mr-2" />
                  Add to Calendar
                </Button>
              );
            },
            (event, index) => {
              return (
                <Button
                  onClick={() => event.id && removeEvent(event.id)}
                  key={index}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash />
                </Button>
              );
            },
          ]}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">Available Events</h2>
        <EventTabs
          tabsData={eventsData}
          eventCardActions={[
            (event, index) => {
              return (
                <Button onClick={() => addEvent(event)} key={index}>
                  <Star className="mr-2" />
                  Star
                </Button>
              );
            },
          ]}
        />
      </div>
    </div>
  );
}
