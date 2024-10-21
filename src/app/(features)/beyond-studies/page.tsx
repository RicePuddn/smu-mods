"use client";

import Tabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { eventsData } from "@/server/data/events";
import { OpenAI } from "openai";
import { ChangeEvent, useEffect, useState } from "react";

export default function BeyondStudies() {
  const [events, setEvents] = useState(eventsData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(events);
    console.log(env.OPENAI_API_KEY);
  });

  async function askChatGPT(file: File) {
    const chatgpt = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const prompt = ` 
          Based on the this image, extract the following details from the infographic and return it in the JSON format given. 
          {
              name: "the-club-name",
              title: "the-event-title",
              description: "description-of-event",
              date: "YYYY-MM-DD",
              startTime:"HH:MM:SS+08:00",
              endTime:"HH:MM:SS+08:00",
              venue: "the-venue-listed",
              deadline: "YYYY-MM-DD",
          }`;

    try {
      const query = prompt; // add image in
      const completion = await chatgpt.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: "https://imgur.com/a0HHtuo.png",
                },
              },
            ],
          },
        ],
        response_format: {
          // See /docs/guides/structured-outputs
          type: "json_schema",
          json_schema: {
            name: "event_schema",
            schema: {
              type: "object",
              properties: {
                name: {
                  description: "the-club-name",
                  type: "string",
                },
                title: {
                  description: "the-event-title",
                  type: "string",
                },
                description: {
                  description: "description-of-event",
                  type: "string",
                },
                date: {
                  description: "YYYY-MM-DD",
                  type: "string",
                },
                startTime: {
                  description: "HH:MM:SS+08:00",
                  type: "string",
                },
                endTime: {
                  description: "HH:MM:SS+08:00",
                  type: "string",
                },
                venue: {
                  description: "the-venue-listed",
                  type: "string",
                },
                deadline: {
                  description: "YYYY-MM-DD",
                  type: "string",
                },
              },
              additionalProperties: false,
            },
          },
        },
      });
      // console.log(completion.choices[0].finish_reason);
      // console.log(completion.choices[0].message.content);
      // console.log(typeof completion.choices[0].message.content);
      // return eventDetails;
    } catch (error: any) {
      const msg = `An error occurred while querying ChatGPT`;
      console.error(`${msg}: ${error.message}`);
      throw new Error(msg);
    }
  }

  // upload the file to the s3 bucket
  const handleClick = () => {
    if (!selectedFile) return;

    console.log(askChatGPT(selectedFile));
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
