import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setErrors([]);
    setGeneralError("");
    try {
      await api.post("/employees", { ...formData, salary: Number(formData.salary) });
      navigate("/employees");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError(err.response?.data?.message || "Failed to add employee");
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Add Employee</h1>
      <p className="text-gray-500 text-sm mb-6">Fill in the details to add a new employee</p>

      {generalError && (
        <div className="bg-red-50 text-red-600 text-sm rounded-md p-2 mb-4 max-w-2xl">{generalError}</div>
      )}

      <EmployeeForm onSubmit={handleSubmit} submitLabel="Save Employee" errors={errors} />
    </Layout>
  );
};

export default AddEmployee;