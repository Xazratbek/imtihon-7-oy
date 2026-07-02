import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Download, ThumbsUp, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/client";
import Select from "../components/Select";

const sortOptions = [
  { value: "-created_at", label: "Eng yangi" },
  { value: "-download_count", label: "Eng ko'p yuklangan" },
  { value: "-like_count", label: "Eng ko'p layk olgan" },
];

export default function Materials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [materials, setMaterials] = useState([]);
  const [count, setCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const subject = searchParams.get("subject") || "";
  const tag = searchParams.get("tag") || "";
  const ordering = searchParams.get("ordering") || "-created_at";
  const page = Number(searchParams.get("page") || 1);
  const totalPages = Math.max(1, Math.ceil(count / 10));

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };

  useEffect(() => {
    api.get("/subjects/", { params: { page_size: 100 } }).then(({ data }) => {
      setSubjects(data.results || data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/materials/", { params: { search, subject, tag, ordering, page } })
      .then(({ data }) => {
        setMaterials(data.results);
        setCount(data.count);
      })
      .finally(() => setLoading(false));
  }, [search, subject, tag, ordering, page]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Materiallar</h1>
        <Link
          to="/materiallar/yuklash"
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" /> Material yuklash
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            defaultValue={search}
            onKeyDown={(e) => e.key === "Enter" && updateParam("search", e.target.value)}
            placeholder="Qidirish..."
            className="w-64 rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-gray-400"
          />
        </div>
        <Select
          value={subject}
          onChange={(v) => updateParam("subject", v)}
          placeholder="Barcha fanlar"
          options={[{ value: "", label: "Barcha fanlar" }, ...subjects.map((s) => ({ value: s.name, label: s.name }))]}
        />
        <Select
          value={ordering}
          onChange={(v) => updateParam("ordering", v)}
          options={sortOptions}
        />
        {tag && (
          <button
            onClick={() => updateParam("tag", "")}
            className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
          >
            #{tag} ✕
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-gray-500">Yuklanmoqda...</div>
      ) : materials.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-400">
          Materiallar topilmadi
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {materials.map((m) => (
            <Link
              key={m.id}
              to={`/materiallar/${m.id}`}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {m.cover_image && (
                <img src={m.cover_image} alt={m.title} className="h-36 w-full object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {m.subject_name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleDateString("uz-UZ")}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{m.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{m.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.tag_list.map((t) => (
                    <span key={t.id} className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
                      #{t.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Download className="h-4 w-4" /> {m.download_count}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {m.like_count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => updateParam("page", String(page - 1))}
            className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Oldingi
          </button>
          <span className="text-sm text-gray-500">{page} / {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => updateParam("page", String(page + 1))}
            className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm disabled:opacity-40"
          >
            Keyingi <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
