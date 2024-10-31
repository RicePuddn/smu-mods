import { z } from "zod";

import type { BidOutputData, VacancyOutputData } from "@/utils/bid-analytics";
import { env } from "@/env";
import { mergeDatasets } from "@/utils/bid-analytics";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const analyticsRouter = createTRPCRouter({
  getInstructors: publicProcedure
    .input(z.object({ moduleCode: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/instructor/${encodeURIComponent(input.moduleCode)}`,
      );
      const data = (await res.json()) as { data: string[] };
      return data.data;
    }),
  getTermsAvailable: publicProcedure
    .input(z.object({ moduleCode: z.string(), instructor: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/terms_available/${encodeURIComponent(input.moduleCode)}/${encodeURIComponent(input.instructor)}`,
      );
      const data = (await res.json()) as { data: string[] };
      return data.data;
    }),
  getSections: publicProcedure
    .input(
      z.object({
        moduleCode: z.string(),
        instructor: z.string(),
        term: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/sections_available/${encodeURIComponent(input.moduleCode)}/${encodeURIComponent(input.instructor)}/${encodeURIComponent(input.term)}`,
      );
      const data = (await res.json()) as { data: string[] };
      return data.data;
    }),
  getChartData: publicProcedure
    .input(
      z.object({
        moduleCode: z.string(),
        instructor: z.string(),
        term: z.string(),
        section: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/coursedata/sectionbidpriceacrosswindows/${encodeURIComponent(input.moduleCode)}/${encodeURIComponent(input.term)}/${encodeURIComponent(input.instructor)}/${encodeURIComponent(input.section)}`,
      );
      const data = (await res.json()) as BidOutputData;

      const res2 = await fetch(
        `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/coursedata/sectionbidpriceacrosswindows/vacancies/${encodeURIComponent(input.moduleCode)}/${encodeURIComponent(input.term)}/${encodeURIComponent(input.instructor)}/${encodeURIComponent(input.section)}`,
      );
      const data2 = (await res2.json()) as VacancyOutputData;

      return mergeDatasets(data, data2);
    }),
});
