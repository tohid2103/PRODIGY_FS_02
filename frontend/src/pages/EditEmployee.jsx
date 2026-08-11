import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        setGeneralError("Failed to load employee");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    setErrors([]);
    setGeneralError("");
    try {
      await api.put(`/employees/${id}`, { ...formData, salary: Number(formData.salary) });
      navigate("/employees");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError(err.response?.data?.message || "Failed to update employee");
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Edit Employee</h1>
      <p className="text-gray-500 text-sm mb-6">Update employee information</p>

      {generalError && (
        <div className="bg-red-50 text-red-600 text-sm rounded-md p-2 mb-4 max-w-2xl">{generalError}</div>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <EmployeeForm initialData={employee} onSubmit={handleSubmit} submitLabel="Update Employee" errors={errors} />
      )}
    </Layout>
  );
};

export default EditEmployee;