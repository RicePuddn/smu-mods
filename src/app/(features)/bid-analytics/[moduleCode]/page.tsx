"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BidAnalyticChart } from "@/components/BidAnalyticChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PADDING } from "@/config";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { type ModuleCode } from "@/types/primitives/module";
import { bitAnalytics } from "@/utils/bid-analytics";

interface BidAnalyticsPageProps {
  params: {
    moduleCode: string;
  };
}

export default function BidAnalyticsPage({ params }: BidAnalyticsPageProps) {
  const { modules } = useModuleBankStore((state) => state);
  const [selectedInstructor, setSelectedInstructor] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [selectedSection, setSelectedSection] = useState(0);

  const instructors = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      return await bitAnalytics.getInstructors(params.moduleCode);
    },
  });

  const termsAvailable = useQuery({
    queryKey: ["termsAvailable", instructors.data?.at(selectedInstructor)],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        return [];
      }
      return await bitAnalytics.getTermsAvailable(
        params.moduleCode,
        queryKey[1],
      );
    },
  });

  const sectionsAvailable = useQuery({
    queryKey: [
      "sectionsAvailable",
      instructors.data?.at(selectedInstructor),
      termsAvailable.data?.at(selectedTerm),
    ],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1] || !queryKey[2]) {
        return [];
      }
      return await bitAnalytics.getSections(
        params.moduleCode,
        queryKey[1],
        queryKey[2],
      );
    },
  });

  const chartData = useQuery({
    queryKey: [
      "chartData",
      instructors.data?.at(selectedInstructor),
      termsAvailable.data?.at(selectedTerm),
      sectionsAvailable.data?.at(selectedSection),
    ],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1] || !queryKey[2] || !queryKey[3]) {
        return [];
      }
      return await bitAnalytics.getChartData(
        params.moduleCode,
        queryKey[1],
        queryKey[2],
        queryKey[3],
      );
    },
  });

  if (modules[params.moduleCode as ModuleCode] === undefined) {
    return (
      <div
        style={{
          padding: PADDING,
        }}
      >
        Module not found
      </div>
    );
  }

  if (instructors.isLoading) {
    return (
      <div
        style={{
          padding: PADDING,
        }}
      >
        Loading...
      </div>
    );
  }

  if (instructors.isError) {
    return (
      <div
        style={{
          padding: PADDING,
        }}
      >
        Error: {instructors.error.message}
      </div>
    );
  }

  console.log(chartData.data);
  return (
    <div
      style={{
        padding: PADDING,
      }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold">
        Bid Price Analytics for {params.moduleCode} -{" "}
        {modules[params.moduleCode as ModuleCode]!.name}
      </h1>
      <div className="flex flex-wrap items-center justify-start gap-2">
        <Select
          value={selectedInstructor.toString()}
          onValueChange={async (e) => {
            setSelectedInstructor(parseInt(e));
            setSelectedTerm(0);
            setSelectedSection(0);
            await termsAvailable.refetch();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Instructors</SelectLabel>
              {instructors.data?.map((instructor, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {instructor}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedTerm.toString()}
          onValueChange={async (e) => {
            setSelectedTerm(parseInt(e));
            setSelectedSection(0);
            await sectionsAvailable.refetch();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Terms</SelectLabel>
              {termsAvailable.data?.map((term, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {term}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedSection.toString()}
          onValueChange={(e) => {
            setSelectedSection(parseInt(e));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sections</SelectLabel>
              {sectionsAvailable.data?.map((section, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {section}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <BidAnalyticChart chartData={chartData.data ?? []} />
    </div>
  );
}
