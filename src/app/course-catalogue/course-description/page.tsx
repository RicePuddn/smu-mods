// page.tsx
import { modules } from '@/server/data/modules'; // Import the `modules` object

export default function CourseCatalogueNested() {
    return (
        <div>
            <h1>Course description nested</h1>
            {Object.values(modules).map((course) => (
                <h1 key={course.moduleCode}>{course.name}</h1> // Display the course name
            ))}
        </div>
    );
}