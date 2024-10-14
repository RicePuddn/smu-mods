"use client";

import ModuleDetails from "@/components/ModuleDetails";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import { getClassEndTime } from "@/utils/timetable";

export default function CourseCatalogueNested() {
  const { modules } = useModuleBankStore((state) => state);
  return (
    <div>
      <h1>Course Catalogue</h1>
      {Object.values(modules).map((module) => (
        <div key={module.moduleCode}>
          <ModuleDetails moduleCode={module.moduleCode}>
            <h2>
              {module.name} ({module.moduleCode})
            </h2>
            <p>{module.description}</p>

            {module.exam?.dateTime && (
              <p>
                <strong>Exam Date:</strong>{" "}
                {new Date(module.exam.dateTime).toLocaleDateString()}
              </p>
            )}

            <h3>Sections</h3>
            {module.sections?.length > 0 ? (
              <ul>
                {module.sections.map((section) => (
                  <li key={section.code}>
                    <strong>Section:</strong> {section.code},
                    <strong> Professor:</strong> {section.professor?.name},
                    {section.classes.map((classTime) => (
                      <p key={classTime.day}>
                        <strong>Day:</strong> {classTime.day},
                        <strong> Time:</strong> {classTime.startTime} -{" "}
                        {getClassEndTime(
                          classTime.startTime,
                          classTime.duration,
                        )}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sections available</p>
            )}
          </ModuleDetails>
        </div>
      ))}
    </div>
  );
}
