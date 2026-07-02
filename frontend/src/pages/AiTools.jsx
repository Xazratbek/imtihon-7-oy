import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, PenLine, Search, X, Copy, Check, Globe } from "lucide-react";
import api from "../api/client";
import Select from "../components/Select";
import Markdown from "../components/Markdown";
import ProgressBar from "../components/ProgressBar";
import PublishToggle from "../components/PublishToggle";
import GenerationCard from "../components/GenerationCard";
import { pollTask } from "../utils/pollTask";
import { useElapsedSeconds } from "../hooks/useElapsedSeconds";

const docTypes = [
  { value: "referat", label: "Referat" },
  { value: "konspekt", label: "Konspekt" },
  { value: "mustaqil_ish", label: "Mustaqil ish" },
];

const tabs = [
  { value: "xulosa", label: "AI Xulosa", icon: Sparkles },
  { value: "referat", label: "AI Referat", icon: PenLine },
  { value: "ommaviy", label: "Ommaviy", icon: Globe },
];

function SummaryTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [summary, setSummary] = useState("");
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const boxRef = useRef(null);
  const stopPollRef = useRef(null);
  const elapsedSeconds = useElapsedSeconds(loading);

  useEffect(() => {
    const handler = setTimeout(() => {
      api
        .get("/materials/", { params: { search: query, page_size: 20 } })
        .then(({ data }) => setResults(data.results));
    }, 250);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => () => stopPollRef.current?.(), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (material) => {
    setSelected(material);
    setDropdownOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setSelected(null);
    setSummary("");
    setGeneration(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    stopPollRef.current?.();
    setError("");
    setSummary("");
    setGeneration(null);
    setLoading(true);
    try {
      const { data } = await api.post("/ai/summary/", { material: selected.id });
      stopPollRef.current = pollTask(data.task_id, {
        onSuccess: (result) => {
          setSummary(result.summary);
          setGeneration({ id: result.id, is_public: result.is_public });
          setLoading(false);
        },
        onError: (message) => {
          setError(message);
          setLoading(false);
        },
      });
    } catch {
      setError("Xulosa olishda xatolik yuz berdi");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}
        <div ref={boxRef} className="relative">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Material</label>

          {selected ? (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-sm">
              <span className="text-gray-900">{selected.title} <span className="text-gray-400">({selected.subject_name})</span></span>
              <button type="button" onClick={handleClear} className="text-gray-400 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setDropdownOpen(true)}
                placeholder="Material nomi bo'yicha qidiring..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-gray-400"
              />
            </div>
          )}

          {dropdownOpen && !selected && (
            <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">Material topilmadi</div>
              ) : (
                results.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelect(m)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                  >
                    <span className="text-gray-900">{m.title}</span>
                    <span className="text-xs text-gray-400">{m.subject_name}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !selected}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Tahlil qilinmoqda..." : "Tahlil qilish"}
        </button>
      </form>

      {loading && <div className="mt-4"><ProgressBar label="AI material matnini tahlil qilmoqda..." elapsedSeconds={elapsedSeconds} /></div>}

      {summary && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
              <Sparkles className="h-4 w-4" /> Natija
            </h2>
            {generation && (
              <PublishToggle
                id={generation.id}
                isPublic={generation.is_public}
                onChange={(is_public) => setGeneration({ ...generation, is_public })}
              />
            )}
          </div>
          <div className="mt-3">
            <Markdown>{summary}</Markdown>
          </div>
        </div>
      )}
    </>
  );
}

function ReferatTab() {
  const [topic, setTopic] = useState("");
  const [docType, setDocType] = useState("referat");
  const [size, setSize] = useState("5 bet");
  const [details, setDetails] = useState("");
  const [content, setContent] = useState("");
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const stopPollRef = useRef(null);
  const elapsedSeconds = useElapsedSeconds(loading);

  useEffect(() => () => stopPollRef.current?.(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    stopPollRef.current?.();
    setError("");
    setContent("");
    setGeneration(null);
    setLoading(true);
    try {
      const { data } = await api.post("/ai/generate/", { topic, doc_type: docType, size, details });
      stopPollRef.current = pollTask(data.task_id, {
        onSuccess: (result) => {
          setContent(result.content);
          setGeneration({ id: result.id, is_public: result.is_public });
          setLoading(false);
        },
        onError: (message) => {
          setError(message);
          setLoading(false);
        },
      });
    } catch {
      setError("Matn yaratishda xatolik yuz berdi");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Mavzu</label>
          <input
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Masalan: Sun'iy intellekt"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Hujjat turi</label>
            <Select value={docType} onChange={setDocType} options={docTypes} className="w-full" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Taxminiy hajm</label>
            <input
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="5 bet"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Batafsil talablar <span className="font-normal text-gray-400">(ixtiyoriy)</span>
          </label>
          <textarea
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Masalan: kirish qismida tarixiy misollar bo'lsin, xulosada amaliy tavsiyalar keltirilsin..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <PenLine className="h-4 w-4" />
          {loading ? "Yaratilmoqda..." : "Yaratish"}
        </button>
      </form>

      {loading && <div className="mt-4"><ProgressBar label="AI matn yaratmoqda..." elapsedSeconds={elapsedSeconds} /></div>}

      {content && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Natija</h2>
            <div className="flex items-center gap-2">
              {generation && (
                <PublishToggle
                  id={generation.id}
                  isPublic={generation.is_public}
                  onChange={(is_public) => setGeneration({ ...generation, is_public })}
                />
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Nusxalandi" : "Nusxalash"}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      )}
    </>
  );
}

function PublicTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/ai/public/").then(({ data }) => setItems(data.results)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-500">Yuklanmoqda...</div>;
  if (items.length === 0) return <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-400">Hali ommaviy natijalar yo'q</div>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <GenerationCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function AiTools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = ["referat", "ommaviy"].includes(searchParams.get("tab")) ? searchParams.get("tab") : "xulosa";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sun'iy intellekt</h1>
        <p className="mt-1 text-sm text-gray-500">
          AI yordamida material xulosasini oling yoki referat/konspekt yarating. Natijalaringizni shaxsiy saqlang yoki ommaviy qiling.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
        {tabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSearchParams({ tab: value })}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
              activeTab === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "xulosa" && <SummaryTab />}
      {activeTab === "referat" && <ReferatTab />}
      {activeTab === "ommaviy" && <PublicTab />}
    </div>
  );
}
