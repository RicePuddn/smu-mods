import { Draggable } from "@hello-pangea/dnd";

type CardProps = {
  id: string;
  index: number;
  listId: string;
};
const DndCard: React.FC<CardProps> = ({ id, index, listId }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {/* Card content */}
        </div>
      )}
    </Draggable>
  );
};

export default DndCard;
