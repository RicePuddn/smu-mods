"use client";

import { ReadMore } from "@/components/acad-clubs/ReadMore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Event } from "@/types/primitives/event";
import { useState } from "react";
import { Button } from "../ui/button";

type TabsProps = {
  tabsData: {
    [key: string]: {
      name: string;
      title: string;
      description: string;
      date: string;
      time: string;
      venue: string;
    }[];
  };
};

export default function Tabs({ tabsData }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    Object.keys(tabsData)[0] || "clubs",
  ); // Default to the first tab

  const tabs = Object.keys(tabsData);

  const renderCards = (items: Event[]) => {
    return items.map((value, index) => (
      <Card
        key={index}
        className="flex flex-col justify-between rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-300"
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
            <li key={id} role="presentation" className="me-2">
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
            className={`grid grid-cols-1 gap-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
              activeTab === id ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby={`${id}-tab`}
          >
            {/* Render cards for active tab */}
            {tabsData && tabsData[id] ? (
              tabsData[id].length > 0 ? (
                renderCards(tabsData[id])
              ) : (
                <div>No Events Added</div>
              )
            ) : (
              <div>No Events Added</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
