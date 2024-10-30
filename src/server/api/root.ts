import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { analyticsRouter } from "./routers/analytics";
import { basketRouter } from "./routers/basket";
import { iSyncRouter } from "./routers/iSync";
import { moduleRouter } from "./routers/module";
import { openaiRouter } from "./routers/openai";
import { s3Router } from "./routers/s3";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  module: moduleRouter,
  iSync: iSyncRouter,
  basket: basketRouter,
  s3: s3Router,
  chatgpt: openaiRouter,
  analytics: analyticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
