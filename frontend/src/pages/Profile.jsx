import { useNavigate } from "react-router-dom";
import { LogOut, Mail, User as UserIcon, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profil</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-2xl font-semibold text-white">
            {user?.full_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{user?.full_name}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-gray-100 pt-6 text-sm">
          <div className="flex items-center gap-3 text-gray-600">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">To'liq ism:</span> {user?.full_name}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Email:</span> {user?.email}
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Ro'yxatdan o'tgan:</span>{" "}
            {user?.date_joined && new Date(user.date_joined).toLocaleDateString("uz-UZ")}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Tizimdan chiqish
        </button>
      </div>
    </div>
  );
}
