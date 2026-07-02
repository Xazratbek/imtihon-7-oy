import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload as UploadIcon, X } from "lucide-react";
import api from "../api/client";
import Select from "../components/Select";

export default function Upload() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/subjects/", { params: { page_size: 100 } }).then(({ data }) => {
      setSubjects(data.results || data);
    });
  }, []);

  const addTag = (name) => {
    const clean = name.trim().toLowerCase();
    if (clean && !tags.includes(clean)) setTags([...tags, clean]);
  };

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  };

  const handleSuggest = async () => {
    if (!title) return;
    setSuggesting(true);
    try {
      const { data } = await api.post("/ai/auto-tag/", { title, description });
      data.tags.forEach(addTag);
    } catch {
      setError("Teg tavsiyasini olishda xatolik");
    } finally {
      setSuggesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!subject) {
      setError("Fanni tanlang");
      return;
    }
    if (!file) {
      setError("Fayl tanlang (PDF, DOCX yoki PPTX)");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("file", file);
    if (coverImage) formData.append("cover_image", coverImage);
    tags.forEach((t) => formData.append("tags", t));
    try {
      const { data } = await api.post("/materials/", formData);
      navigate(`/materiallar/${data.id}`);
    } catch {
      setError("Yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Material yuklash</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Sarlavha</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masalan: Django REST Framework konspekti"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Tavsif</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Material haqida qisqacha..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Fan</label>
          <Select
            value={subject}
            onChange={setSubject}
            placeholder="Fanni tanlang"
            className="w-full"
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Fayl (PDF, DOCX, PPTX)</label>
          <input
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-1.5 file:text-sm file:text-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Muqova rasmi <span className="font-normal text-gray-400">(ixtiyoriy)</span>
          </label>
          <div className="flex items-center gap-4">
            {coverPreview && (
              <img src={coverPreview} alt="Muqova" className="h-16 w-16 rounded-xl border border-gray-200 object-cover" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                setCoverImage(f || null);
                setCoverPreview(f ? URL.createObjectURL(f) : null);
              }}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-1.5 file:text-sm file:text-gray-700"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Teglar</label>
            <button
              type="button"
              onClick={handleSuggest}
              disabled={suggesting || !title}
              className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 disabled:opacity-40"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {suggesting ? "Tavsiya olinmoqda..." : "AI teg tavsiyasi"}
            </button>
          </div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            placeholder="Teg yozing va Enter bosing (masalan: django)"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  #{t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <UploadIcon className="h-4 w-4" />
          {loading ? "Yuklanmoqda..." : "Yuklash"}
        </button>
      </form>
    </div>
  );
}
