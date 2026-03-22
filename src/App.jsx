import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import "./App.css";
import Login from "./pages/Login.jsx";
import Dash from "./pages/Dash.jsx";
import AuthCallback from './pages/auth/callback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dash" element={<Dash />} />
      <Route path="/auth/callback/*" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
