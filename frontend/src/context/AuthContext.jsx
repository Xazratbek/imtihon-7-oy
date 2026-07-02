import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      setLoading(false);
      return;
    }
    api
      .get("/accounts/me/")
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/accounts/login/", { email, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    const me = await api.get("/accounts/me/");
    setUser(me.data);
  };

  const register = async (fullName, email, password) => {
    await api.post("/accounts/register/", { full_name: fullName, email, password });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
