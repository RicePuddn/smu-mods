import { getModule, modules, searchModule } from "@/server/data/modules";
import type { ModuleCode } from "@/types/primitives/module";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const moduleRouter = createTRPCRouter({
  getModule: publicProcedure
    .input(
      z.object({
        moduleCode: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const module = await getModule(input.moduleCode as ModuleCode);
      return module;
    }),
  searchModule: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const resultModules = searchModule(modules, input.query);
      return resultModules;
    }),
  getAllModules: publicProcedure.query(async () => {
    return modules;
  }),
});
