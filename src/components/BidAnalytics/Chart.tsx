"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

export type ChartData = {
  window: string;
  befVac: number;
  aftVac: number;
  minBid: number;
  medBid: number;
};

const chartConfig = {
  befVac: {
    label: "befVac",
    color: "hsl(var(--chart-1))",
  },
  aftVac: {
    label: "aftVac",
    color: "hsl(var(--chart-5))",
  },
  minBid: {
    label: "minBid",
    color: "hsl(var(--chart-2))",
  },
  medBid: {
    label: "medBid",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BidAnalyticChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <div className="rounded-lg border p-2 shadow">
      <ChartContainer
        config={chartConfig}
        className="aspect-[2/3] w-full md:aspect-[4/3] lg:aspect-[3/1]"
      >
        <ComposedChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="befVac"
            fill="var(--color-befVac)"
            yAxisId={"vac"}
            name="Before Process Vacancy"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="aftVac"
            fill="var(--color-aftVac)"
            yAxisId={"vac"}
            name="After Process Vacancy"
            radius={[4, 4, 0, 0]}
          />
          <XAxis
            dataKey="window"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            orientation="left"
            tickLine={true}
            axisLine={true}
            yAxisId="vac"
            label={{
              value: "Vacancy",
              angle: -90,
            }}
          />
          <YAxis
            orientation="right"
            tickLine={true}
            axisLine={true}
            yAxisId="bid"
            label={{
              value: "Bid Amount",
              angle: 90,
            }}
          />
          <Line
            dataKey="minBid"
            type="linear"
            stroke="var(--color-minBid)"
            yAxisId={"bid"}
            name="Minimum Bid"
            strokeWidth={2}
          />
          <Line
            dataKey="medBid"
            type="linear"
            stroke="var(--color-medBid)"
            yAxisId={"bid"}
            name="Median Bid"
            strokeWidth={2}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
