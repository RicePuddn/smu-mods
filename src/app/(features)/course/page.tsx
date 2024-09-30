"use client";

import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { getClassEndTime } from "@/utils/timetable";

export default function CourseCatalogueNested() {
  const { modules } = useModuleBankStore((state) => state);
  return (
    <div>
      <h1>Course Catalogue</h1>
      {Object.values(modules).map((course) => (
        <div key={course.moduleCode}>
          <h2>
            {course.name} ({course.moduleCode})
          </h2>
          <p>{course.description}</p>

          {course.exam?.dateTime && (
            <p>
              <strong>Exam Date:</strong>{" "}
              {new Date(course.exam.dateTime).toLocaleDateString()}
            </p>
          )}

          <h3>Sections</h3>
          {course.sections?.length > 0 ? (
            <ul>
              {course.sections.map((section) => (
                <li key={section.code}>
                  <strong>Section:</strong> {section.code},
                  <strong> Professor:</strong> {section.professor?.name},
                  {section.classes.map((classTime) => (
                    <p key={classTime.day}>
                      <strong>Day:</strong> {classTime.day},
                      <strong> Time:</strong> {classTime.startTime} -{" "}
                      {getClassEndTime(classTime.startTime, classTime.duration)}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p>No sections available</p>
          )}
        </div>
      ))}
    </div>
  );
}
