import type { OpenAIProvider } from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { env } from "@/env";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const openai: OpenAIProvider = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const model = openai.languageModel("gpt-4o");

export const openaiRouter = createTRPCRouter({
  parseEvent: publicProcedure
    .input(
      z.object({
        srcUrl: z.string(),
      }),
    )
    .mutation(async () => {
      const { object } = await generateObject({
        model: model,
        schema: z.object({}),
        prompt: "",
      });
      return object;
    }),
});
