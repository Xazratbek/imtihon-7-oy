import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";

const POSITION_CLASSES = {
  "top-right": "right-6 top-6",
  "top-center": "left-1/2 top-6 -translate-x-1/2",
};

export default function Toast({ message, onClose, duration = 3000, position = "top-right" }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed z-50 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg ${POSITION_CLASSES[position]}`}>
      <Sparkles className="h-4 w-4 shrink-0 text-gray-700" />
      <span className="text-sm text-gray-900">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
