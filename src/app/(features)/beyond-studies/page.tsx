"use client";

import { useState } from "react";

export default function BeyondStudies() {
  const [item, setItem] = useState("");

  return (
    <div className="mx-auto text-center md:container">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Beyond Studies
      </h1>
      <div className="grid grid-cols-4 gap-4 rounded border p-12">
        <div className="max-w-fit rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
        <div className="rounded border p-8">Placeholder</div>
      </div>
    </div>
  );
}
