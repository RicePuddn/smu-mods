import { modules } from '@/server/data/modules'; // Ensure the correct import path

export default function CourseCatalogueNested() {
    // Debug: log the modules object to check if it contains the expected data
    console.log(modules);

    return (
        <div>
            <h1>Course Catalogue</h1>
            {Object.values(modules).map((course) => (
                <div key={course.moduleCode}>
                    <h2>{course.name} ({course.moduleCode})</h2>
                    <p>{course.description}</p>
                    
                    {course.exam?.dateTime && (
                        <p><strong>Exam Date:</strong> {new Date(course.exam.dateTime).toLocaleDateString()}</p>
                    )}

                    <h3>Sections</h3>
                    {course.sections?.length > 0 ? (
                        <ul>
                            {course.sections.map((section) => (
                                <li key={section.code}>
                                    <strong>Section:</strong> {section.code}, 
                                    <strong> Professor:</strong> {section.professor?.name},
                                    <strong> Day(s):</strong> {Array.isArray(section.day) ? section.day.join(', ') : section.day},
                                    <strong> Start Time:</strong> {Array.isArray(section.startTime) ? section.startTime.join(', ') : section.startTime},
                                    <strong> Duration:</strong> {section.duration} hours,
                                    <strong> Location:</strong> {section.location?.building} - {section.location?.room}, Level {section.location?.level}
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
