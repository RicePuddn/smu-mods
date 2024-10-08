import { Draggable } from "@hello-pangea/dnd";
import { ReactNode } from "react";

type EventItemProps = {
  id: string;
  index: number;
  children: ReactNode;
};
const EventItem: React.FC<EventItemProps> = ({ id, index, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default EventItem;
