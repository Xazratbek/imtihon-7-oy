import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Upload from "./pages/Upload";
import Subjects from "./pages/Subjects";
import AiTools from "./pages/AiTools";
import AiHistory from "./pages/AiHistory";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/materiallar" element={<Materials />} />
            <Route path="/materiallar/yuklash" element={<Upload />} />
            <Route path="/materiallar/:id" element={<MaterialDetail />} />
            <Route path="/fanlar" element={<Subjects />} />
            <Route path="/ai" element={<AiTools />} />
            <Route path="/ai/tarix" element={<AiHistory />} />
            <Route path="/profil" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
