"use client";

import EventContainer from "@/components/acad-clubs/eventContainer";
import { ReadMore } from "@/components/acad-clubs/ReadMore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { clubs } from "@/server/data/club-board";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Image from "next/image";
import { useState } from "react";

export default function BeyondStudies() {
  const [item, setItem] = useState("");
  const [clubData, setclubData] = useState(clubs);
  const eventList = [
    { id: "1", name: "Event 1" },
    { id: "2", name: "Event 2" },
    // Add more events as needed
  ];

  //   console.log(clubData);
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
  };

  return (
    <div className="mx-auto text-center md:container">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Beyond Studies
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=""></div>
        <>
          <EventContainer
            events={eventList}
            droppableId="event-container"
          ></EventContainer>
        </>
        <div className="grid grid-cols-4 gap-4 rounded p-12">
          {Object.entries(clubData).map(([key, value], index) => (
            <Card className="p-6 hover:shadow-lg hover:shadow-gray-300">
              <Image
                className="rounded-t-lg border bg-gray-400"
                src={`/${value.image}`}
                alt="logo"
                width={500}
                height={500}
              />
              <CardHeader>{value.name}</CardHeader>
              <CardDescription className="text-left">
                <ReadMore id={value.name} text={value.desc}></ReadMore>
              </CardDescription>
              <CardFooter className="pt-2 text-center">
                {value.contact}
              </CardFooter>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
