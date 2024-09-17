"use client";

import {
    DragDropContext,
    Draggable,
    Droppable,
    type OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useState } from "react";

const ClusteringVisualization = () => {
  const [strings, setStrings] = useState<string[]>([]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCluster = clusters.find(
      (cluster) => cluster.id === source.droppableId,
    );
    const destCluster = clusters.find(
      (cluster) => cluster.id === destination.droppableId,
    );

    if (!sourceCluster || !destCluster) return;

    if (source.droppableId === destination.droppableId) {
      const newItems = Array.from(sourceCluster.items);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem!);

      const newClusters = clusters.map((cluster) =>
        cluster.id === sourceCluster.id
          ? { ...cluster, items: newItems }
          : cluster,
      );

      setClusters(newClusters);
    } else {
      const sourceItems = Array.from(sourceCluster.items);
      const destItems = Array.from(destCluster.items);
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Recalculate cluster fit
      const updatedItem: ClusterItem = {
        ...movedItem!,
        cluster: parseInt(destCluster.id),
        distance: calculateDistance(
          movedItem!.embeddings,
          kmeansResult.centroids[parseInt(destCluster.id)]!,
          clusterFitCalculationMethod,
        ),
      };

      destItems.splice(destination.index, 0, updatedItem);

      const newClusters = clusters.map((cluster) => {
        if (cluster.id === sourceCluster.id) {
          return { ...cluster, items: sourceItems };
        }
        if (cluster.id === destCluster.id) {
          return { ...cluster, items: destItems };
        }
        return cluster;
      });

      setClusters(newClusters);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap gap-4">
        {clusters.map((cluster) => (
          <Droppable key={cluster.id} droppableId={cluster.id}>
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="w-full rounded-lg border p-4"
              >
                <h2 className="mb-2 text-lg font-bold">{cluster.name}</h2>
                {cluster.items.map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(draggableProvided, snapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className={cn(
                          "mb-2 rounded border p-2 shadow",
                          snapshot.isDragging && "border-green-500",
                        )}
                      >
                        <MarkdownRender content={item.content} />
                        <p className="text-sm text-gray-600">
                          Distance: {item.distance.toFixed(4)}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ClusteringVisualization;