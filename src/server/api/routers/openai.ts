import { TRPCError } from "@trpc/server";
import { OpenAI } from "openai";
import { z } from "zod";

import { env } from "@/env";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { deleteImage } from "./s3";

// export const openai: OpenAIProvider = createOpenAI({
//   apiKey: env.OPENAI_API_KEY,
// });
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const prompt = ` 
Based on the this image, extract the following details from the infographic and return it in the JSON format given.`;

export const openaiRouter = createTRPCRouter({
  parseEvent: publicProcedure
    .input(
      z.object({
        srcUrl: z.string().url(),
        key: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
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
                    url: input.srcUrl,
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
                    description: "YYYY-MM-DDTHH:MM:SS+08:00",
                    type: "string",
                  },
                  startTime: {
                    description: "YYYY-MM-DDTHH:MM:SS+08:00",
                    type: "string",
                  },
                  endTime: {
                    description: "YYYY-MM-DDTHH:MM:SS+08:00",
                    type: "string",
                  },
                  venue: {
                    description: "the-venue-listed",
                    type: "string",
                  },
                  deadline: {
                    description: "YYYY-MM-DDTHH:MM:SS+08:00",
                    type: "string",
                  },
                },
                additionalProperties: false,
              },
            },
          },
        });
        // Logger.log(completion.choices[0].finish_reason);
        // Logger.log(completion.choices[0].message.content);
        const content = completion.choices?.[0]?.message?.content;

        if (!content) {
          throw new TRPCError({
            message: "No content returned from OpenAI.",
            code: "BAD_REQUEST",
          });
        }

        await deleteImage(input.key);

        return content;
      } catch (error) {
        console.error("Error fetching completion:", error);
        throw new TRPCError({
          message: "No content returned from OpenAI.",
          code: "BAD_REQUEST",
        });
      }
    }),
});
