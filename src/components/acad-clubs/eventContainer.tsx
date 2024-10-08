import { Droppable } from "@hello-pangea/dnd";

interface EventContainerProps {
  events: { id: string; name: string }[];
  droppableId: string;
}

// {title, pinnedEvents, droppableId}
const EventContainer: React.FC<EventContainerProps> = () => {
  return (
    <div className="flex-1">
      Saved
      <div className="justify-start border p-5 hover:bg-green-50">
        <Droppable droppableId="event-container">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {/* {Events will be rendered here} */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default EventContainer;
