import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getTenure = (joiningDateStr) => {
  const joiningDate = new Date(joiningDateStr);
  const today = new Date();

  let years = today.getFullYear() - joiningDate.getFullYear();
  let months = today.getMonth() - joiningDate.getMonth();
  let days = today.getDate() - joiningDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);

  return parts.join(", ");
};

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      navigate("/employees");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete employee");
    }
  };

  if (loading) return <Layout><p className="text-gray-500 text-sm">Loading...</p></Layout>;
  if (!employee) return <Layout><p className="text-gray-500 text-sm">Employee not found</p></Layout>;

  return (
    <Layout>
      <Link to="/employees" className="text-sm hover:underline" style={{ color: "#92400e" }}>
        ← Back to Employees
      </Link>

      <div className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 mt-4 max-w-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold">{employee.name}</h1>
            <p className="text-gray-500 text-sm">{employee.designation}</p>
            <p className="text-gray-400 text-sm">{employee.department} Department</p>
          </div>
          <div className="space-x-2">
            <Link
              to={`/employees/edit/${employee._id}`}
              className="text-white px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#92400e" }}
            >
              Edit Employee
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-100"
            >
              Delete Employee
            </button>
          </div>
        </div>

        <hr className="my-5 border-[#eddca0]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{employee.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{employee.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Salary</p>
            <p className="font-medium">₹{employee.salary.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Joining Date</p>
            <p className="font-medium">{formatDate(employee.joiningDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Time with Company</p>
            <p className="font-medium">{getTenure(employee.joiningDate)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetails;