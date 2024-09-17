import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';

interface Course {
  id: string;
  name: string;
  code: string;
  units: number;
  date: string;
}

interface Term {
  id: string;
  name: string;
  courses: Course[];
}

const initialSemesters: Term[] = [
  {
    id: 'term1',
    name: 'Term 1',
    courses: [
      { id: 'cs1010', name: 'Programming Methodology', code: 'CS1010', units: 4, date: 'Nov 25, 1:00 PM' },
      { id: 'ma1301', name: 'Introductory Mathematics', code: 'MA1301', units: 4, date: 'Nov 23, 9:00 AM' },
    ],
  },
  {
    id: 'term2',
    name: 'Term 2',
    courses: [
      { id: 'cs2030s', name: 'Programming Methodology II', code: 'CS2030S', units: 4, date: 'Apr 30, 1:00 PM' },
      { id: 'cs1231', name: 'Discrete Structures', code: 'CS1231', units: 4, date: 'May 2, 2:30 PM' },
    ],
  },
];

const CoursePlanner: React.FC = () => {
  const [term, setSemesters] = useState<Term[]>(initialSemesters);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceSemester = term.find(sem => sem.id === source.droppableId);
    const destSemester = term.find(sem => sem.id === destination.droppableId);

    if (!sourceSemester || !destSemester) return;

    const newSemesters = [...term];
    const [removedCourse] = sourceSemester.courses.splice(source.index, 1);
    
    // Ensure removedCourse is defined before inserting
    if (removedCourse) {
      destSemester.courses.splice(destination.index, 0, removedCourse);
    }

    setSemesters(newSemesters);
  };

  return (
    <div className="">
      <div className="p-4 rounded-lg"> 
        {/* The Year Container */}
        <h2 className="text-xl font-semibold mb-2">Year 1 - 2024/2025</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            {term.map(semester => (
              <div key={semester.id} className="rounded-lg flex-1">
                <h3 className="text-lg font-semibold mb-2">{semester.name}</h3>
                <Droppable droppableId={semester.id}>
                  {(provided) => (
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px]"
                    >
                      {semester.courses.map((course, index) => (
                        <Draggable key={course.id} draggableId={course.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-green-500 p-2 mb-2 rounded"
                            >
                              <h4 className="font-semibold">{course.code} {course.name}</h4>
                              <p>{course.units} Units</p>
                              <p className="text-sm">{course.date}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default CoursePlanner;