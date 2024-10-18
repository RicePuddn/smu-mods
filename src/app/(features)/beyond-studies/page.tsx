"use client";

import Tabs from "@/components/acad-clubs/tabs";
import { eventsData } from "@/server/data/events";
import { useEffect, useState } from "react";

export default function BeyondStudies() {
  const [events, setEvents] = useState(eventsData);

  useEffect(() => {
    console.log(events);
  });

  return (
    <>
      <div className="mx-auto text-center md:container">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Beyond Studies
        </h1>
        <Tabs tabsData={eventsData} />
      </div>
    </>
  );
}
