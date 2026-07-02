import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function Select({ value, onChange, options, placeholder = "Tanlang", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => String(o.value) === String(value));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-left text-sm text-gray-900 outline-none hover:bg-gray-50"
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 max-h-64 w-full min-w-max overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              {o.label}
              {String(o.value) === String(value) && <Check className="h-4 w-4 text-gray-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
