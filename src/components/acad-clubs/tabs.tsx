"use client";

import { useState } from "react";

import type { Event } from "@/types/primitives/event";
import { ReadMore } from "@/components/acad-clubs/ReadMore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
        className="flex min-w-[350px] max-w-[350px] flex-col justify-between rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-300"
      >
        <CardHeader>{value.title}</CardHeader>
        <CardContent>
          <CardDescription className="text-left">
            <ReadMore id={value.description} text={value.description} />
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto flex justify-end">
          <Button>Pin</Button>
        </CardFooter>
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
            className={`grid grid-cols-1 gap-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${
              activeTab === id ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby={`${id}-tab`}
          >
            {/* Render cards for the active tab
            {(tabsData[id]?.length || 0) > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {renderCards(tabsData[id] ?? [])}
              </div>
            ) : (
              <div>No Events Added</div>
            )} */}
            {/* Render cards for the active tab */}
            {(tabsData[id]?.length || 0) > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
