"use client";

import Tabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/server/data/events";
import { ChangeEvent, useEffect, useState } from "react";

export default function BeyondStudies() {
  const [events, setEvents] = useState(eventsData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(events);
  });

  // upload the file to the s3 bucket
  const handleClick = () => {
    if (!selectedFile) return;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        console.log(file);
        setSelectedFile(file);
      }
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
        <Button className="inline-block justify-end" onClick={handleClick}>
          Add Card
        </Button>
        <Tabs tabsData={eventsData} />{" "}
      </div>
    </>
  );
}
