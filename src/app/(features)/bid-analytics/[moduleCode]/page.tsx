"use client";

import { useState } from "react";

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
import { api } from "@/trpc/react";
import { type ModuleCode } from "@/types/primitives/module";

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

  const {
    data: instructors,
    isLoading,
    isError,
    error,
  } = api.bidAnalytics.getInstructors.useQuery({
    moduleCode: params.moduleCode,
  });

  const { data: terms } = api.bidAnalytics.getTermsAvailable.useQuery(
    {
      moduleCode: params.moduleCode,
      instructor: instructors?.at(selectedInstructor)!,
    },
    {
      enabled: !!instructors?.at(selectedInstructor),
    },
  );

  const { data: sections } = api.bidAnalytics.getSections.useQuery(
    {
      moduleCode: params.moduleCode,
      instructor: instructors?.at(selectedInstructor)!,
      term: terms?.at(selectedTerm)!,
    },
    {
      enabled:
        !!instructors?.at(selectedInstructor) && !!terms?.at(selectedTerm),
    },
  );

  const { data: chartData } = api.bidAnalytics.getChartData.useQuery(
    {
      moduleCode: params.moduleCode,
      instructor: instructors?.at(selectedInstructor)!,
      term: terms?.at(selectedTerm)!,
      section: sections?.at(selectedSection)!,
    },
    {
      enabled:
        !!instructors?.at(selectedInstructor) &&
        !!terms?.at(selectedTerm) &&
        !!sections?.at(selectedSection),
    },
  );

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

  if (isLoading) {
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

  if (isError) {
    return (
      <div
        style={{
          padding: PADDING,
        }}
      >
        Error: {error.message}
      </div>
    );
  }

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
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Instructors</SelectLabel>
              {instructors?.map((instructor, index) => (
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
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Terms</SelectLabel>
              {terms?.map((term, index) => (
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
              {sections?.map((section, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {section}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <BidAnalyticChart chartData={chartData ?? []} />
    </div>
  );
}
