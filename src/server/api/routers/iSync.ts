import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const iSyncRouter = createTRPCRouter({
  getToken: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const createToken = await ctx.db.token.create({
        data: {
          content: input.content,
        },
      });
      return { token: createToken.id };
    }),
  getContent: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const token = await ctx.db.token.findUnique({
        where: {
          id: input.token,
        },
      });
      if (!token) {
        throw new TRPCError({ message: "Token not found", code: "NOT_FOUND" });
      }
      return { token: token.id, content: token.content };
    }),
  deleteToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.token.delete({
        where: {
          id: input.token,
        },
      });
      return { success: true };
    }),
});
