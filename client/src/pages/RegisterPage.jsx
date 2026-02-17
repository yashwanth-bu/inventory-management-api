import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRules, setShowRules] = useState(false);

  // Password validation checks
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser({ email, password });
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const message = err.response?.data?.message;

      const errorMap = {
        PASSWORD_MIN_LENGTH:
          "Password must be at least 8 characters long.",
        PASSWORD_LOWERCASE_REQUIRED:
          "Password must contain at least one lowercase letter.",
        PASSWORD_UPPERCASE_REQUIRED:
          "Password must contain at least one uppercase letter.",
        PASSWORD_NUMBER_REQUIRED:
          "Password must contain at least one number.",
        PASSWORD_SPECIAL_CHAR_REQUIRED:
          "Password must contain at least one special character.",
        EMAIL_REQUIRED: "Email is required.",
        EMAIL_INVALID: "Please enter a valid email address.",
        USER_ALREADY_TAKEN: "This email is already registered.",
      };

      setError(errorMap[message] || "Registration failed.");
    }
  };

  const Rule = ({ valid, text }) => (
    <div
      className={`flex items-center gap-2 text-xs transition-all duration-300 ${
        valid ? "text-green-400" : "text-slate-400"
      }`}
    >
      <span>{valid ? "✔" : "•"}</span>
      {text}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-96 shadow-lg border border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h1>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              value={password}
              onFocus={() => setShowRules(true)}
              onBlur={() => password === "" && setShowRules(false)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Animated Rules */}
            <div
              className={`mt-3 space-y-1 transition-all duration-300 ${
                showRules ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              <Rule valid={validations.length} text="At least 8 characters" />
              <Rule valid={validations.uppercase} text="One uppercase letter" />
              <Rule valid={validations.lowercase} text="One lowercase letter" />
              <Rule valid={validations.number} text="One number" />
              <Rule valid={validations.special} text="One special character" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
