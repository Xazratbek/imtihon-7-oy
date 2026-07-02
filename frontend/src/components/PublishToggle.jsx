import { useState } from "react";
import { Globe, Lock } from "lucide-react";
import api from "../api/client";

export default function PublishToggle({ id, isPublic, onChange }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const { data } = await api.patch(`/ai/history/${id}/`, { is_public: !isPublic });
      onChange(data.is_public);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium disabled:opacity-50 ${
        isPublic ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {isPublic ? <Globe className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
      {isPublic ? "Ommaviy" : "Shaxsiy"}
    </button>
  );
}
