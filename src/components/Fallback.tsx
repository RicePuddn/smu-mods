export default function Fallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">
        Welcome to SMU Mods
      </h1>
      <p className="mb-8 text-sm md:text-xl lg:text-2xl">
        Your ultimate university module planning tool
      </p>
      <div className="mb-8 flex space-x-4">
        <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-white p-2 shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-200/20">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      <p className="text-sm md:text-lg lg:text-xl">
        Loading your personalized study space...
      </p>
      <div className="mt-8 h-4 w-48 rounded-full bg-blue-200 md:w-64 lg:w-80">
        <div className="h-4 w-full animate-pulse rounded-full bg-blue-600"></div>
      </div>
    </div>
  );
}
