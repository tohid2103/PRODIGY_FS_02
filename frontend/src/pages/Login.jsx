import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login({ name: res.data.name, email: res.data.email }, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center gap-16 px-8"
      style={{ backgroundColor: "#fdf3d9" }}
    >
      {/* Left side - intro + illustration */}
      <div className="hidden lg:block max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Manage Your People.
          <br />
          Empower Your Organization.
        </h1>
        <p className="text-gray-600 mb-8">
          WorkSphere helps you streamline employee management, boost productivity and build a
          better workplace.
        </p>

        <svg viewBox="0 0 400 300" className="w-full">
          {/* Table */}
          <ellipse cx="200" cy="240" rx="150" ry="18" fill="#eddca0" />
          <rect x="120" y="190" width="160" height="14" rx="4" fill="#b45309" />
          <rect x="140" y="204" width="12" height="36" fill="#92400e" />
          <rect x="248" y="204" width="12" height="36" fill="#92400e" />

          {/* Laptop on table */}
          <rect x="170" y="170" width="60" height="20" rx="2" fill="#fffbea" stroke="#92400e" strokeWidth="2" />
          <rect x="175" y="150" width="50" height="24" rx="2" fill="#92400e" />

          {/* Plant */}
          <rect x="40" y="220" width="26" height="30" rx="3" fill="#b45309" />
          <circle cx="53" cy="205" r="10" fill="#d97706" />
          <circle cx="42" cy="212" r="8" fill="#ca8a04" />
          <circle cx="64" cy="212" r="8" fill="#ca8a04" />

          {/* Person 1 - left */}
          <circle cx="90" cy="130" r="18" fill="#f2c48d" />
          <rect x="72" y="148" width="36" height="45" rx="10" fill="#92400e" />

          {/* Person 2 - middle back */}
          <circle cx="180" cy="110" r="18" fill="#e8b384" />
          <rect x="162" y="128" width="36" height="45" rx="10" fill="#d97706" />

          {/* Person 3 - right */}
          <circle cx="270" cy="125" r="18" fill="#f2c48d" />
          <rect x="252" y="143" width="36" height="45" rx="10" fill="#b45309" />

          {/* Person 4 - far right, sitting */}
          <circle cx="330" cy="145" r="16" fill="#e8b384" />
          <rect x="314" y="161" width="32" height="40" rx="10" fill="#ca8a04" />

          {/* Chairs */}
          <rect x="80" y="193" width="20" height="30" rx="3" fill="#eddca0" />
          <rect x="260" y="188" width="20" height="30" rx="3" fill="#eddca0" />

          {/* Decorative dots */}
          <circle cx="30" cy="60" r="3" fill="#d97706" />
          <circle cx="50" cy="60" r="3" fill="#d97706" />
          <circle cx="70" cy="60" r="3" fill="#d97706" />
          <circle cx="30" cy="80" r="3" fill="#f59e0b" />
          <circle cx="50" cy="80" r="3" fill="#f59e0b" />
          <circle cx="70" cy="80" r="3" fill="#f59e0b" />

          <circle cx="370" cy="60" r="24" fill="none" stroke="#eddca0" strokeWidth="4" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Center - login card */}
      <div className="bg-[#fffbea] border border-[#eddca0] shadow-md rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl"
            style={{ backgroundColor: "#92400e" }}
          >
            ✦
          </div>
          <div>
            <p className="font-bold text-lg" style={{ color: "#92400e" }}>WorkSphere</p>
            <p className="text-xs text-gray-500">Employee Management System</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-1">Welcome Back!</h1>
        <p className="text-gray-500 text-sm mb-6">Enter your credentials to access your account</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-md p-2 mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#92400e" }}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#92400e" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2.5 rounded-full text-sm font-semibold transition disabled:opacity-60"
            style={{ backgroundColor: "#92400e" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium" style={{ color: "#b45309" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;