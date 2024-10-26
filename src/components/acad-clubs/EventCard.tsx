import { type ReactNode } from "react";
import { format } from "date-fns";

import { type ExtendedSchoolEvent } from "@/stores/event";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface EventCardProps {
  event: ExtendedSchoolEvent;
  actions?: ((
    event: ExtendedSchoolEvent,
    index: string | number,
  ) => ReactNode)[];
}

export const EventCard = ({ event, actions }: EventCardProps) => {
  return (
    <Card className="overflow-hidden bg-accent">
      
      {/* Title remains visible */}
      <CardHeader className="bg-primary p-3 text-center text-lg font-bold text-primary-foreground">
        {event.title}
      </CardHeader>

      {/* Content is positioned outside of view and moved up on hover */}
      <CardContent className="p-4">
        <p className="text-sm">{event.name}</p>
        <p>{format(new Date(event.date), "MMMM d, yyyy")}</p>
        <p className="text-sm">
          {format(new Date(event.startTime), "HH:mm")} to{" "}
          {format(new Date(event.endTime), "HH:mm")}
        </p>
        <p className="text-sm">{event.venue}</p>
        <p className="mt-2 text-red-500">
          <strong>
            Registration Deadline:{" "}
            {format(new Date(event.deadline), "MMMM d, yyyy HH:mm")}
          </strong>
        </p>
        {/* <CardDescription className="mt-2 leading-relaxed text-gray-700">
      <ReadMore id={value.description} text={value.description} />
    </CardDescription> */}
      </CardContent>

      <CardFooter className="gap-2">
        {actions?.map((action, index) => action(event, index))}
      </CardFooter>
    </Card>
  );
};
