import { useState, useEffect } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/departments", { name, description });
      setName("");
      setDescription("");
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add department");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deleting this department will also permanently delete all employees assigned to it. Are you sure you want to continue?"
      )
    )
      return;
    try {
      const res = await api.delete(`/departments/${id}`);
      alert(res.data.message);
      fetchDepartments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete department");
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Departments</h1>
      <p className="text-gray-500 text-sm mb-6">Manage company departments</p>

      <form onSubmit={handleAdd} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-5 mb-6 max-w-xl">
        <h2 className="text-sm font-medium mb-3">Add New Department</h2>
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Department name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#92400e" }}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#92400e" }}
          />
          <button
            type="submit"
            className="text-white px-5 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: "#92400e" }}
          >
            Add
          </button>
        </div>
      </form>

      <div className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm overflow-hidden max-w-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-100 text-gray-600 text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Employees</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-500">Loading...</td></tr>
            ) : departments.length === 0 ? (
              <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-500">No departments yet</td></tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept._id} className="border-t border-[#eddca0]">
                  <td className="px-4 py-3 font-medium">{dept.name}</td>
                  <td className="px-4 py-3 text-gray-500">{dept.description || "-"}</td>
                  <td className="px-4 py-3">{dept.employeeCount}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(dept._id)} className="text-red-500 text-sm hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Departments;