"use client"; 
import CoursePlanner from '@/components/planner/coursePlanner';

export default function Home() {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">Course Planner</h1>
      <CoursePlanner />
      
    </div>
  );
}