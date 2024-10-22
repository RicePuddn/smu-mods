export default function Banner() {
  return (
    <div className="absolute left-0 top-0 z-50 w-full p-4">
      <div className="relative flex h-24 w-full items-center justify-between rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white md:text-4xl">SMU Mods</h1>
        <p className="text-sm font-semibold text-white md:text-lg">
          Your Ultimate Module Planning Tool
        </p>
      </div>
    </div>
  );
}
