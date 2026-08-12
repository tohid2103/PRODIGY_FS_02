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
    <div className="min-h-screen flex items-center justify-center gap-16 px-8" style={{ backgroundColor: "#fdf3d9" }}>
     {/* Left side - heading + description + illustration */}
<div className="hidden xl:flex flex-col max-w-md">
  <h2 className="text-4xl font-bold text-gray-800 leading-tight text-left">
    Manage Your People.
    <br />
    Empower Your Organization.
  </h2>
  <p className="text-gray-600 text-base mt-4 text-left">
    WorkSphere helps you streamline employee management and build a better workplace.
  </p>
  <img
    src="/assets/ems-illustration.svg"
    alt="Employee Management System"
    className="w-full max-w-md mt-8"
  />
</div>

      {/* Center - login card */}
      <div className="bg-[#fffbea] border border-[#eddca0] shadow-md rounded-2xl p-8 w-full max-w-sm flex-shrink-0">
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