import { type ReactNode } from "react";
import { format } from "date-fns";

import { type ExtendedSchoolEvent } from "@/stores/event";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: ExtendedSchoolEvent;
  actions?: ((
    event: ExtendedSchoolEvent,
    index: string | number,
  ) => ReactNode)[];
}

export const EventCard = ({ event, actions }: EventCardProps) => {
  return (
    <Card className="group relative h-60 overflow-hidden rounded-lg bg-accent shadow-md transition-all duration-500 ease-in-out hover:shadow-lg">
      
      {/* parent container */}
        <div className="relative h-full w-full overflow-hidden">
        
        {/* event title and organiser*/}
        <div className={cn("absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out group-hover:translate-y-[-50%] space-y-1")}>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.name}</p>
        </div>

        {/* more information (hidden initially) */}
        <div className={cn( "absolute inset-0 mt-12 flex flex-col items-center justify-start p-4 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 space-y-1")}>
            <p>{format(new Date(event.date), "MMMM d, yyyy")}</p>
            <p className="text-sm">
                {format(new Date(event.startTime), "HH:mm")} to{" "}
                {format(new Date(event.endTime), "HH:mm")}
            </p>
            <p className="text-sm">{event.venue}</p>
            <p className="mt-2 text-red-500 text-center">
                <strong>
                Registration Deadline:{" "} {format(new Date(event.deadline), "MMMM d, yyyy HH:mm")}
                </strong>
            </p>

          {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-2">
                {actions?.map((action, index) => (
                <div key={index} className="flex-shrink-0">
                    {action(event, index)}
                </div>
            ))}
            </div>
        </div>
    </div>
    </Card>
  );
};