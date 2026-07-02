import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import api from "../api/client";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
          <Icon className="h-4 w-4 text-gray-700" />
        </div>
      </div>
      <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function MaterialTable({ title, materials }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900">{title}</div>
      {materials.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">Hozircha materiallar yo'q</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
              <th className="px-6 py-3 font-medium">NOMI</th>
              <th className="px-6 py-3 font-medium">FAN</th>
              <th className="px-6 py-3 font-medium">YUKLAB OLISHLAR</th>
              <th className="px-6 py-3 font-medium">LAYK</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-3">
                  <Link to={`/materiallar/${m.id}`} className="font-medium text-gray-900 hover:underline">
                    {m.title}
                  </Link>
                </td>
                <td className="px-6 py-3 text-gray-500">{m.subject_name}</td>
                <td className="px-6 py-3 text-gray-500">{m.download_count}</td>
                <td className="px-6 py-3 text-gray-500">{m.like_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/materials/dashboard/")
      .then((res) => setData(res.data))
      .catch(() => setError("Statistikani yuklashda xatolik"));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div className="text-gray-500">Yuklanmoqda...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Yuklangan materiallar" value={data.my_materials_count} />
        <StatCard icon={Download} label="Jami yuklab olishlar" value={data.my_total_downloads} />
        <StatCard icon={ThumbsUp} label="Olingan layklar" value={data.my_likes_received} />
        <StatCard icon={ThumbsDown} label="Olingan dislayklar" value={data.my_dislikes_received} />
      </div>

      <MaterialTable title="Eng mashhur materiallar" materials={data.top_popular_materials} />
      <MaterialTable title="Oxirgi yuklangan materiallar" materials={data.latest_materials} />
    </div>
  );
}
