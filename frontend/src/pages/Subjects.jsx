import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import api from "../api/client";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/subjects/", { params: { page_size: 100 } })
      .then(({ data }) => setSubjects(data.results || data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-500">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fanlar</h1>
        <p className="mt-1 text-sm text-gray-500">Fanni tanlang — shu fanga oid barcha materiallar ochiladi.</p>
      </div>

      {subjects.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-400">
          Hozircha fanlar qo'shilmagan
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((s) => (
            <Link
              key={s.id}
              to={`/materiallar?subject=${encodeURIComponent(s.name)}`}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <BookOpen className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-400">Materiallarni ko'rish</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
