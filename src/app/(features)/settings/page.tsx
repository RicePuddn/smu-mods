import { GenerateQRCode } from "@/components/iSync/QRCode";
import { PADDING } from "@/config";

export default function SettingsPage() {
  return (
    <div
      className="space-y-4"
      style={{
        padding: PADDING,
      }}
    >
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="space-y-3 rounded-lg border p-4 shadow">
        <h3 className="text-lg font-semibold">iSync</h3>
        <p>
          Synchronize your timetable and module planning data between your
          devices.
        </p>
        <GenerateQRCode />
      </div>
    </div>
  );
}
