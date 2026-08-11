import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await api.put("/auth/profile", { name });
      login({ name: res.data.name, email: res.data.email }, localStorage.getItem("token"));
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Update your account details</p>

      <form onSubmit={handleSubmit} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 max-w-xl space-y-4">
        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#92400e" }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="text-white px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: "#92400e" }}
        >
          Save Changes
        </button>
      </form>
    </Layout>
  );
};

export default Settings;