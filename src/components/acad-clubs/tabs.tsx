"use client";

import { ReadMore } from "@/components/acad-clubs/ReadMore";
import {
  Card,
  CardContent,
  CardDescription,
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
        className="mx-3 mb-6 flex transform flex-col justify-between rounded-2xl bg-foreground shadow-md transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-400"
      >
        <CardHeader className="rounded-t-lg bg-blue-500 p-3 text-center text-lg font-bold text-white">
          {value.title}
        </CardHeader>
        <CardContent className="mt-0 flex flex-col gap-3 px-0">
          {/* Add event details */}
          <table className="border-separate rounded-sm border p-0 text-left text-sm text-gray-600">
            <tr>
              <td className="rounded-sm bg-black p-2 text-white">
                <strong>Date:</strong>
              </td>
              <td className="pl-3">{value.date}</td>
            </tr>
            <tr>
              <td className="rounded-sm bg-black p-2 text-white">
                <strong>Time:</strong>
              </td>
              <td className="pl-3">
                {value.startTime} - {value.endTime}
              </td>
            </tr>
            <tr>
              <td className="rounded-sm bg-black p-2 text-white">
                <strong>Venue:</strong>
              </td>
              <td className="pl-3">{value.venue}</td>
            </tr>
          </table>
          <p className="text-red-500">
            <strong>Registration Deadline: {value.deadline}</strong>
          </p>
          <CardDescription className="px-3 text-left leading-relaxed text-gray-700">
            <ReadMore id={value.description} text={value.description} />
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between bg-white pt-4">
          <p className="inline-block text-sm font-bold text-gray-500">
            Date: {value.date}
          </p>
          <Button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            View
          </Button>
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
