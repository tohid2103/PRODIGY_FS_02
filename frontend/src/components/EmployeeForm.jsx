import { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
  status: "Active",
};

const EmployeeForm = ({ initialData, onSubmit, submitLabel, errors }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        department: initialData.department || "",
        designation: initialData.designation || "",
        salary: initialData.salary || "",
        joiningDate: initialData.joiningDate ? initialData.joiningDate.slice(0, 10) : "",
        status: initialData.status || "Active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fieldError = (field) => errors?.find((err) => err.field === field)?.message;

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2";

  return (
    <form onSubmit={handleSubmit} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("name") && <p className="text-red-500 text-xs mt-1">{fieldError("name")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("email") && <p className="text-red-500 text-xs mt-1">{fieldError("email")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required
            placeholder="10 digit number" className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("phone") && <p className="text-red-500 text-xs mt-1">{fieldError("phone")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("department") && <p className="text-red-500 text-xs mt-1">{fieldError("department")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("designation") && <p className="text-red-500 text-xs mt-1">{fieldError("designation")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required min="0"
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("salary") && <p className="text-red-500 text-xs mt-1">{fieldError("salary")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Joining Date</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }} />
          {fieldError("joiningDate") && <p className="text-red-500 text-xs mt-1">{fieldError("joiningDate")}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange}
            className={inputClass} style={{ "--tw-ring-color": "#92400e" }}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white px-6 py-2.5 rounded-full text-sm font-semibold"
        style={{ backgroundColor: "#92400e" }}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default EmployeeForm;