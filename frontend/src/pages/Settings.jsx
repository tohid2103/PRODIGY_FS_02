import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const [pwMessage, setPwMessage] = useState("");
  const [pwError, setPwError] = useState("");

  const handleProfileSubmit = async (e) => {
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwMessage("");
    setPwError("");

    if (newPassword !== confirmNewPassword) {
      setPwError("New passwords do not match");
      return;
    }

    try {
      const res = await api.put("/auth/change-password", { currentPassword, newPassword });
      setPwMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPwError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Update your account details</p>

      <form onSubmit={handleProfileSubmit} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 max-w-xl space-y-4 mb-6">
        <h2 className="text-sm font-semibold">Profile Information</h2>
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

      <form onSubmit={handlePasswordSubmit} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 max-w-xl space-y-4">
        <h2 className="text-sm font-semibold">Change Password</h2>
        {pwMessage && <p className="text-green-600 text-sm">{pwMessage}</p>}
        {pwError && <p className="text-red-500 text-sm">{pwError}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#92400e" }}
            />
            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#92400e" }}
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmNew ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#92400e" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showConfirmNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="text-white px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: "#92400e" }}
        >
          Change Password
        </button>
      </form>
    </Layout>
  );
};

export default Settings;