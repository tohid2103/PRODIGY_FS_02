import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { formatDate } from "../utils/formatDate";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees", {
        params: { search, department, sortBy, order, page: 1, limit: 1000 },
      });
      setEmployees(res.data.employees);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department, sortBy, order]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete employee");
    }
  };

  const sortIcon = (field) => (sortBy === field ? (order === "asc" ? "▲" : "▼") : "");

  return (
    <Layout>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-xl font-semibold">Employees</h1>
          <p className="text-gray-500 text-sm">Manage all employee records</p>
        </div>
        <Link
          to="/employees/add"
          className="text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: "#92400e" }}
        >
          + Add Employee
        </Link>
      </div>

      <div className="flex gap-3 my-4">
        <input
          type="text"
          placeholder="Search by name, department or designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": "#92400e" }}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-100 text-gray-600 text-left">
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                Name {sortIcon("name")}
              </th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("salary")}>
                Salary {sortIcon("salary")}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("joiningDate")}>
                Joining Date {sortIcon("joiningDate")}
              </th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="px-4 py-6 text-center text-gray-500">Loading...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan="7" className="px-4 py-6 text-center text-gray-500">No employees found</td></tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className="border-t border-[#eddca0]">
                  <td className="px-4 py-3 font-medium">{emp.name}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3 text-gray-500">{emp.designation}</td>
                  <td className="px-4 py-3">₹{emp.salary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(emp.joiningDate)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => navigate(`/employees/${emp._id}`)}
                        className="text-gray-500 hover:text-amber-800"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        to={`/employees/edit/${emp._id}`}
                        className="text-gray-500 hover:text-amber-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {total} employee{total !== 1 ? "s" : ""}
      </div>
    </Layout>
  );
};

export default Employees;