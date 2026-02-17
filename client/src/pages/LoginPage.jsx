import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

  try {
    await login({ email, password });
    navigate("/");
  } catch (err) {
    setError(
    err.response?.data?.message || "Login failed"
    );
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-96 shadow-lg border border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-4 text-center">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-400 cursor-pointer"
        >
        Register
        </span>
        </p>
      </div>
    </div>
  );
}

