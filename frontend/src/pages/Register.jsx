import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;
      if (data?.email) setError("Bu email allaqachon ro'yxatdan o'tgan");
      else if (data?.password) setError("Parol juda oddiy (kamida 8 ta belgi bo'lsin)");
      else setError("Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-semibold text-gray-900">
          <GraduationCap className="h-6 w-6" /> EduShare
        </Link>
        <h1 className="text-center text-2xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Bir daqiqada hisob yarating</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">To'liq ism</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Aliyev Vali"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="siz@misol.uz"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Parol</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kamida 8 ta belgi"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 py-2.5 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Yaratilmoqda..." : "Hisob yaratish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Hisobingiz bormi?{" "}
          <Link to="/login" className="font-medium text-gray-900 hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}
