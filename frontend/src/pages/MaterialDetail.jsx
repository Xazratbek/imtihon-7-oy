import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, ThumbsUp, ThumbsDown, Sparkles, ArrowLeft, FileText } from "lucide-react";
import api from "../api/client";
import Markdown from "../components/Markdown";
import Toast from "../components/Toast";
import ProgressBar from "../components/ProgressBar";
import { pollTask } from "../utils/pollTask";
import { useElapsedSeconds } from "../hooks/useElapsedSeconds";

export default function MaterialDetail() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const stopPollRef = useRef(null);
  const elapsedSeconds = useElapsedSeconds(summaryLoading);

  useEffect(() => () => stopPollRef.current?.(), []);

  const load = () => {
    api
      .get(`/materials/${id}/`)
      .then(({ data }) => setMaterial(data))
      .catch(() => setError("Material topilmadi"));
  };

  useEffect(load, [id]);

  const handleDownload = async () => {
    const response = await api.post(`/materials/${id}/download/`, null, { responseType: "blob" });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = material.file.split("/").pop();
    a.click();
    URL.revokeObjectURL(url);
    load();
  };

  const handleRate = async (type) => {
    await api.post("/ratings/", { material: Number(id), type });
    load();
  };

  const handleSummary = async () => {
    stopPollRef.current?.();
    setSummaryLoading(true);
    setSummary("");
    try {
      const { data } = await api.post("/ai/summary/", { material: Number(id) });
      setToast("AI faylni o'rganishni boshladi...");
      stopPollRef.current = pollTask(data.task_id, {
        onSuccess: (result) => {
          setSummary(result.summary);
          setSummaryLoading(false);
          setToast("AI xulosa tayyor bo'ldi");
        },
        onError: (message) => {
          setSummary(message);
          setSummaryLoading(false);
        },
      });
    } catch {
      setSummary("Xulosa olishda xatolik yuz berdi. Keyinroq urinib ko'ring.");
      setSummaryLoading(false);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!material) return <div className="text-gray-500">Yuklanmoqda...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Toast message={toast} onClose={() => setToast("")} />

      <Link to="/materiallar" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Materiallarga qaytish
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {material.cover_image && (
          <img src={material.cover_image} alt={material.title} className="h-56 w-full object-cover" />
        )}
        <div className="p-8">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {material.subject_name}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(material.created_at).toLocaleDateString("uz-UZ")}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">{material.title}</h1>
        <p className="mt-3 leading-relaxed text-gray-600">{material.description}</p>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <FileText className="h-4 w-4" />
          {material.file.split("/").pop()}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {material.tag_list.map((t) => (
            <Link
              key={t.id}
              to={`/materiallar?tag=${t.name}`}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 hover:bg-gray-50"
            >
              #{t.name}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Download className="h-4 w-4" /> {material.download_count} yuklab olingan</span>
          <span className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" /> {material.like_count}</span>
          <span className="flex items-center gap-1.5"><ThumbsDown className="h-4 w-4" /> {material.dislike_count}</span>
          <span className="text-gray-400">Yuklagan: {material.uploaded_by}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Download className="h-4 w-4" /> Yuklab olish
          </button>
          <button
            onClick={handleSummary}
            disabled={summaryLoading}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" /> {summaryLoading ? "Tahlil qilinmoqda..." : "AI Xulosa"}
          </button>
          <button
            onClick={() => handleRate("like")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <ThumbsUp className="h-4 w-4" /> Layk
          </button>
          <button
            onClick={() => handleRate("dislike")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <ThumbsDown className="h-4 w-4" /> Dislayk
          </button>
        </div>
        </div>
      </div>

      {(summary || summaryLoading) && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            <Sparkles className="h-4 w-4" /> AI Xulosa
          </h2>
          {summaryLoading ? (
            <div className="mt-3">
              <ProgressBar label="AI material matnini tahlil qilmoqda..." elapsedSeconds={elapsedSeconds} />
            </div>
          ) : (
            <div className="mt-3">
              <Markdown>{summary}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
