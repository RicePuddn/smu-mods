"use client";

// import { ReadMore } from "@/components/acad-clubs/ReadMore";
import Tabs from "@/components/acad-clubs/tabs";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
import { clubs } from "@/server/data/club-board";
// import Image from "next/image";
import { useState } from "react";

export default function BeyondStudies() {
  const [item, setItem] = useState("");
  const [clubData, setclubData] = useState(clubs);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  return (
    <div className="mx-auto text-center md:container">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Beyond Studies
      </h1>
      <Tabs></Tabs>
      {/* {Object.entries(clubData).map(([key, value], index) => (
        <Card
          key={index}
          className="grid grid-cols-1 gap-4 rounded p-6 hover:shadow-lg hover:shadow-gray-300 sm:shrink-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div className="flex h-full w-full items-center justify-center">
            <Image
              className="h-full w-full rounded-lg border bg-transparent object-contain"
              src={`/${value.image}`}
              alt="logo"
              width={500}
              height={500}
            />
          </div>
          <CardHeader>{value.name}</CardHeader>
          <CardDescription className="text-left">
            <ReadMore id={value.name} text={value.desc} />
          </CardDescription>
          <CardFooter className="pt-2 text-center">{value.contact}</CardFooter>
        </Card>
      ))} */}
    </div>
  );
}
