"use client";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Event } from "@/types/primitives/event";
import { useState } from "react";
import { Button } from "../ui/button";

type TabsProps = {
  tabsData: Record<string, Event[]>; // Use Record instead of index signature
};

export default function Tabs({ tabsData }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    Object.keys(tabsData)[0] ?? "clubs",
  ); // Default to the first tab

  const tabs = Object.keys(tabsData);
  const renderCards = (items: Event[]) => {
    return items.map((value, index) => (
      <Card
        key={index}
        className="mx-3 mb-6 flex flex-col justify-between rounded-2xl bg-white shadow-md hover:shadow-xl hover:shadow-gray-400"
      >
        {/* Title remains visible */}
        <CardHeader className="rounded-t-lg bg-blue-500 p-3 text-center text-lg font-bold text-white">
          {value.title}
        </CardHeader>

        {/* Content is positioned outside of view and moved up on hover */}
        <div className="flex flex-col gap-3 rounded-2xl bg-white">
          <CardContent className="p-4">
            <p className="text-sm text-gray-800">{value.name}</p>
            <p className="text-sm text-gray-800">{value.date}</p>
            <p className="text-sm text-gray-800">
              {value.startTime} to {value.endTime}
            </p>
            <p className="text-sm text-gray-800">{value.venue}</p>
            <p className="mt-2 text-red-500">
              <strong>Registration Deadline: {value.deadline}</strong>
            </p>
            {/* <CardDescription className="mt-2 leading-relaxed text-gray-700">
              <ReadMore id={value.description} text={value.description} />
            </CardDescription> */}
          </CardContent>

          <CardFooter className="flex items-center justify-between bg-white px-4 py-2">
            <p className="inline-block text-sm font-bold text-gray-500">
              Date: {value.date}
            </p>
            <Button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              View
            </Button>
          </CardFooter>
        </div>
      </Card>
    ));
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="-mb-px flex flex-wrap text-center text-sm font-medium"
          role="tablist"
        >
          {tabs.map((id) => (
            <li key={id} className="tabs">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-4 ${
                  activeTab === id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500"
                }`}
                type="button"
                role="tab"
                aria-controls={id}
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
              >
                {id.toUpperCase()} {/* Capitalize tab labels */}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-tab-content">
        {tabs.map((id) => (
          <div
            key={id}
            className={`rounded-lg bg-gray-50 dark:bg-gray-800 ${
              activeTab === id ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby={`${id}-tab`}
          >
            {/* Render cards for the active tab */}
            {(tabsData[id]?.length || 0) > 0 ? (
              <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {renderCards(tabsData[id] ?? [])}
              </div>
            ) : (
              <div>No Events Added</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
