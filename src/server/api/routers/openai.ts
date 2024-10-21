import { env } from "@/env";
import { OpenAI } from "openai";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// export const openai: OpenAIProvider = createOpenAI({
//   apiKey: env.OPENAI_API_KEY,
// });
export  const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const prompt = ` 
Based on the this image, extract the following details from the infographic and return it in the JSON format given.`;

const img_url = "https://imgur.com/a0HHtuo.png";

export const openaiRouter = createTRPCRouter({
  parseEvent: publicProcedure.input(z.object({})).mutation(async ({}) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: img_url,
              },
            },
          ],
        },
      ],
      // schema: z.object({}),
      // prompt: "",
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
    return completion.choices[0].message.content;
  }),
});
