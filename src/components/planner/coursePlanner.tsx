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

interface Year {
  id: string;
  name: string;
  semesters: Term[];
}

const createYear = (yearNumber: number): Year => ({
  id: `year${yearNumber}`,
  name: `Year ${yearNumber} - ${2024 + yearNumber - 1}/${2024 + yearNumber}`,
  semesters: [
    {
      id: `year${yearNumber}-semester1`,
      name: 'Term 1',
      courses: [],
    },
    {
      id: `year${yearNumber}-semester2`,
      name: 'Term 2',
      courses: [],
    },
  ],
});

const initialYears: Year[] = [
  {
    id: 'year1',
    name: 'Year 1 - 2024/2025',
    semesters: [
      {
        id: 'year1-semester1',
        name: 'Semester 1',
        courses: [
          { id: 'cs1010', name: 'Programming Methodology', code: 'CS1010', units: 4, date: 'Nov 25, 1:00 PM' },
          { id: 'ma1301', name: 'Introductory Mathematics', code: 'MA1301', units: 4, date: 'Nov 23, 9:00 AM' },
        ],
      },
      {
        id: 'year1-semester2',
        name: 'Semester 2',
        courses: [
          { id: 'cs2030s', name: 'Programming Methodology II', code: 'CS2030S', units: 4, date: 'Apr 30, 1:00 PM' },
          { id: 'cs1231', name: 'Discrete Structures', code: 'CS1231', units: 4, date: 'May 2, 2:30 PM' },
        ],
      },
    ],
  },
  createYear(2),
  createYear(3),
  createYear(4)
];

const CoursePlanner: React.FC = () => {
  const [years, setYears] = useState<Year[]>(initialYears);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceYearId = source.droppableId.split('-')[0];
    const destYearId = destination.droppableId.split('-')[0];

    const sourceYear = years.find(year => year.id === sourceYearId);
    const destYear = years.find(year => year.id === destYearId);
    
    if (!sourceYear || !destYear) return;

    const sourceSemester = sourceYear.semesters.find(sem => sem.id === source.droppableId);
    const destSemester = destYear.semesters.find(sem => sem.id === destination.droppableId);

    if (!sourceSemester || !destSemester) return;

    const newYears = [...years];
    const [removedCourse] = sourceSemester.courses.splice(source.index, 1);
    
    // Ensure removedCourse is defined before inserting
    if (removedCourse) {
      destSemester.courses.splice(destination.index, 0, removedCourse);
    }

    setYears(newYears);
  };

  const YearContainer: React.FC<{ year: Year }> = ({ year }) => (
    <div key={year.id} className="border-2 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">{year.name}</h2>
      <div className="flex space-x-4">
        {year.semesters.map(semester => (
          <div key={semester.id} className="border-2 p-4 rounded-lg flex-1">
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
    </div>
  );

  return (
    <div className="course-planner">
      <DragDropContext onDragEnd={onDragEnd}>
        {years.map((year) => (
          <YearContainer key={year.id} year={year} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default CoursePlanner;