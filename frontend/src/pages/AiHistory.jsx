import { useEffect, useState } from "react";
import api from "../api/client";
import GenerationCard from "../components/GenerationCard";
import Toast from "../components/Toast";

export default function AiHistory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get("/ai/history/").then(({ data }) => setItems(data.results)).finally(() => setLoading(false));
  }, []);

  const handleToggle = (id, is_public) => {
    setItems(items.map((i) => (i.id === id ? { ...i, is_public } : i)));
    setToast(is_public ? "Natija endi ommaviy" : "Natija endi shaxsiy");
  };

  const handleDelete = async (id) => {
    await api.delete(`/ai/history/${id}/`);
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Toast message={toast} onClose={() => setToast("")} position="top-center" />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mening natijalarim</h1>
        <p className="mt-1 text-sm text-gray-500">AI Xulosa va AI Referat orqali yaratgan natijalaringiz.</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Yuklanmoqda...</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-400">Hali AI natijalaringiz yo'q</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <GenerationCard key={item.id} item={item} ownerView onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
