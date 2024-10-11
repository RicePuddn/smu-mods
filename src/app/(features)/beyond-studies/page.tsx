"use client";

import { ReadMore } from "@/components/acad-clubs/ReadMore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { clubs } from "@/server/data/club-board";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { useState } from "react";

export default function BeyondStudies() {
  const [item, setItem] = useState("");
  const [clubData, setclubData] = useState(clubs);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  //   console.log(clubData);
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === "saved-box" &&
      source.droppableId !== "saved-box"
    ) {
      const droppedItem = clubData[source.index];

      if (droppedItem) {
        setDroppedItems((prev) => [...prev, droppedItem.name]);
      }

      return;
    }
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
        {/* Top box where events can be dropped */}
        <div className="grid grid-cols-2">
          <Droppable droppableId="saved-box" type="event">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="d-inline-block mb-4 h-60 w-60 items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:to-blue-50"
              >
                <p className="text-gray-500">Drag Events Here</p>
                {droppedItems.map((item, index) => (
                  <div key={index} className="m-2 rounded-md bg-gray-200 p-2">
                    {item}
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="border">Hello</div>
        </div>

        {/* Droppable container for the club cards */}
        <Droppable droppableId="event-container" type="event">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 gap-4 rounded p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {Object.entries(clubData).map(([key, value], index) => (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card className="p-6 hover:shadow-lg hover:shadow-gray-300 sm:shrink-0">
                        <div className="flex h-full w-full items-center justify-center">
                          <Image
                            className="h-full w-full rounded-t-lg border bg-gray-300 object-contain"
                            src={`/${value.image}`}
                            alt="logo"
                            width={500}
                            height={500}
                          />
                        </div>
                        <CardHeader>{value.name}</CardHeader>
                        <CardDescription className="text-left">
                          <ReadMore
                            id={value.name}
                            text={value.desc}
                          ></ReadMore>
                        </CardDescription>
                        <CardFooter className="pt-2 text-center">
                          {value.contact}
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
