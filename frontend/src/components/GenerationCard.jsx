import { useState } from "react";
import { Sparkles, PenLine, Trash2, Loader2, AlertCircle } from "lucide-react";
import Markdown from "./Markdown";
import PublishToggle from "./PublishToggle";

function StatusBadge({ status, isPublic }) {
  if (status === "pending") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
        <Loader2 className="h-3 w-3 animate-spin" /> Jarayonda...
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
        <AlertCircle className="h-3 w-3" /> Xatolik
      </span>
    );
  }
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${isPublic ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}>
      {isPublic ? "Ommaviy" : "Shaxsiy"}
    </span>
  );
}

export default function GenerationCard({ item, ownerView, onToggle, onDelete }) {
  const [open, setOpen] = useState(false);
  const Icon = item.kind === "summary" ? Sparkles : PenLine;
  const isPending = item.status === "pending";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => !isPending && setOpen((o) => !o)}
        disabled={isPending}
        className="flex w-full items-center justify-between px-6 py-4 text-left disabled:cursor-default"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 shrink-0 text-gray-400" />
          <div>
            <div className="font-medium text-gray-900">{item.title}</div>
            <div className="text-xs text-gray-400">
              {item.kind === "summary" ? "AI Xulosa" : "AI Referat"} · {new Date(item.created_at).toLocaleDateString("uz-UZ")}
              {!ownerView && <> · {item.user}</>}
            </div>
          </div>
        </div>
        <StatusBadge status={item.status} isPublic={item.is_public} />
      </button>

      {open && !isPending && (
        <div className="border-t border-gray-100 p-6">
          {item.status === "failed" ? (
            <p className="text-sm text-red-600">AI natijani yaratishda xatolik yuz berdi.</p>
          ) : (
            <Markdown>{item.content}</Markdown>
          )}
          {ownerView && (
            <div className="mt-4 flex gap-2">
              {item.status === "completed" && (
                <PublishToggle id={item.id} isPublic={item.is_public} onChange={(v) => onToggle(item.id, v)} />
              )}
              <button
                onClick={() => onDelete(item.id)}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> O'chirish
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
