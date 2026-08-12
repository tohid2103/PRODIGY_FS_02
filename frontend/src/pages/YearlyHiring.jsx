import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { formatDate } from "../utils/formatDate";

const getTenure = (joiningDateStr) => {
  const joiningDate = new Date(joiningDateStr);
  const today = new Date();

  if (joiningDate > today) {
    const diffTime = joiningDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Joins in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  }

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

const YearlyHiring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openYears, setOpenYears] = useState({});
  const [openEmployees, setOpenEmployees] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/employees/by-year");
        setData(res.data);
        if (res.data.length > 0) {
          setOpenYears({ [res.data[res.data.length - 1].year]: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleYear = (year) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleEmployee = (id) => {
    setOpenEmployees((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Yearly Hiring</h1>
      <p className="text-gray-500 text-sm mb-6">See how many employees were hired each year</p>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm">No hiring data available</p>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {data.map((group) => (
            <div key={group.year} className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleYear(group.year)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <div className="flex items-center gap-2">
                  {openYears[group.year] ? (
                    <ChevronDown size={18} style={{ color: "#92400e" }} />
                  ) : (
                    <ChevronRight size={18} style={{ color: "#92400e" }} />
                  )}
                  <span className="font-semibold text-lg">{group.year}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {group.count} employee{group.count !== 1 ? "s" : ""} hired
                </span>
              </button>

              {openYears[group.year] && (
                <div className="border-t border-[#eddca0]">
                  {group.employees.map((emp) => (
                    <div key={emp._id} className="border-b border-[#eddca0] last:border-b-0">
                      <button
                        onClick={() => toggleEmployee(emp._id)}
                        className="w-full flex justify-between items-center px-5 py-3 text-left hover:bg-amber-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-semibold">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.designation} • {emp.department}</p>
                          </div>
                        </div>

                        <div
                          className="w-10 h-5 rounded-full flex items-center px-0.5 transition"
                          style={{ backgroundColor: openEmployees[emp._id] ? "#92400e" : "#eddca0" }}
                        >
                          <div
                            className="w-4 h-4 bg-white rounded-full shadow transition-transform"
                            style={{
                              transform: openEmployees[emp._id] ? "translateX(20px)" : "translateX(0)",
                            }}
                          />
                        </div>
                      </button>

                      {openEmployees[emp._id] && (
                        <div className="px-5 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm bg-amber-50/50">
                          <div>
                            <p className="text-gray-500 text-xs">Email</p>
                            <p className="font-medium">{emp.email}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Phone</p>
                            <p className="font-medium">{emp.phone}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Salary</p>
                            <p className="font-medium">₹{emp.salary.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Joining Date</p>
                            <p className="font-medium">{formatDate(emp.joiningDate)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Time with Company</p>
                            <p className="font-medium">{getTenure(emp.joiningDate)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Status</p>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {emp.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default YearlyHiring;