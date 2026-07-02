export default function ProgressBar({ label, elapsedSeconds }) {
  return (
    <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span>{elapsedSeconds}s</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="animate-indeterminate absolute h-full rounded-full bg-gray-900" />
      </div>
    </div>
  );
}
