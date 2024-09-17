"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { clubs } from "@/server/data/club-board";
import Image from "next/image";
import { useState } from "react";

export default function BeyondStudies() {
  const [item, setItem] = useState("");
  const [clubData, setclubData] = useState(clubs);
  //   console.log(clubData);

  return (
    <div className="mx-auto text-center md:container">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Beyond Studies
      </h1>
      <div className="grid grid-cols-3 gap-4 rounded p-12">
        {Object.entries(clubData).map(([key, value]) => (
          <Card className="p-6">
            <Image
              className="rounded-t-lg bg-gray-400"
              src="/ellipsis_badge.png"
              alt="logo"
              width={500}
              height={500}
            />
            <CardHeader>{value.name}</CardHeader>
            <CardDescription className="text-left">
              {value.desc}
            </CardDescription>
            <CardFooter className="pt-2 text-center">
              {value.contact}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
