"use client";

import { useEffect, useState } from "react";

import Tabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/server/data/events";

export default function BeyondStudies() {
  const [events, _setEvents] = useState(eventsData);

  useEffect(() => {
    console.log(events);
  });

  return (
    <>
      <div className="mx-auto text-center md:container">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Beyond Studies
        </h1>
        <Button className="inline-block"></Button>
        <Tabs tabsData={eventsData} />{" "}
      </div>
    </>
  );
}
