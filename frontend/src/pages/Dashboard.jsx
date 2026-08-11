import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users, UserCheck, Building2, UserPlus, Eye, Pencil, Trash2 } from "lucide-react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";

const DEPT_COLORS = ["#92400e", "#b45309", "#d97706", "#f59e0b", "#ca8a04", "#a16207"];
const STATUS_COLORS = { Active: "#22c55e", Inactive: "#ef4444" };
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const cardClass = "bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm";

const StatCard = ({ icon, iconBg, iconColor, label, value, trendLabel }) => (
  <div className={`${cardClass} p-5`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
    </div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-semibold mt-0.5">{value}</p>
    {trendLabel && (
      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#b45309" }}>
        ▲ {trendLabel}
      </p>
    )}
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
      status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {status}
  </span>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </Layout>
    );
  }

  const deptData = stats?.employeesByDepartment || [];
  const statusData = [
    { name: "Active", value: stats?.activeCount || 0 },
    { name: "Inactive", value: stats?.inactiveCount || 0 },
  ];
  const monthData = (stats?.employeesByMonth || []).map((m) => ({
    name: MONTH_NAMES[m.month - 1],
    count: m.count,
  }));

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Welcome back, {user?.name || "Admin"}! 👋</h1>
      <p className="text-gray-500 text-sm mb-6">Here's what's happening in your organization today.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users size={20} />}
          iconBg="bg-amber-100"
          iconColor="text-amber-800"
          label="Total Employees"
          value={stats?.totalEmployees ?? 0}
          trendLabel={`${stats?.addedThisMonth ?? 0} this month`}
        />
        <StatCard
          icon={<UserCheck size={20} />}
          iconBg="bg-amber-100"
          iconColor="text-amber-800"
          label="Active Employees"
          value={stats?.activeCount ?? 0}
        />
        <StatCard
          icon={<Building2 size={20} />}
          iconBg="bg-amber-100"
          iconColor="text-amber-800"
          label="Departments"
          value={stats?.totalDepartments ?? 0}
        />
        <StatCard
          icon={<UserPlus size={20} />}
          iconBg="bg-amber-100"
          iconColor="text-amber-800"
          label="New Hires"
          value={stats?.newHiresThisMonth ?? 0}
          trendLabel={`${stats?.newHiresThisMonth ?? 0} this month`}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium mb-2">Employees by Department</p>
          {deptData.length === 0 ? (
            <p className="text-gray-400 text-sm py-10 text-center">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={deptData}
                  dataKey="count"
                  nameKey="department"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {deptData.map((_, index) => (
                    <Cell key={index} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium mb-2">Employee Status</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`${cardClass} p-5`}>
          <p className="text-sm font-medium mb-2">New Employees (This Month)</p>
          {monthData.length === 0 ? (
            <p className="text-gray-400 text-sm py-10 text-center">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eddca0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="natural" dataKey="count" stroke="#92400e" strokeWidth={2.5} dot={{ r: 4, fill: "#92400e" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Employees */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="flex justify-between items-center px-5 py-4">
          <p className="text-sm font-medium">Recent Employees</p>
          <Link to="/employees" className="text-sm hover:underline" style={{ color: "#92400e" }}>
            View All Employees →
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-100 text-gray-600 text-left">
              <th className="px-5 py-2.5">Employee</th>
              <th className="px-5 py-2.5">Department</th>
              <th className="px-5 py-2.5">Designation</th>
              <th className="px-5 py-2.5">Joining Date</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats?.recentEmployees?.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-6 text-center text-gray-500">
                  No employees yet
                </td>
              </tr>
            ) : (
              stats?.recentEmployees?.map((emp) => (
                <tr key={emp._id} className="border-t border-[#eddca0]">
                  <td className="px-5 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-semibold">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{emp.name}</span>
                  </td>
                  <td className="px-5 py-3">{emp.department}</td>
                  <td className="px-5 py-3 text-gray-500">{emp.designation}</td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(emp.joiningDate)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-3 text-gray-400">
                      <Link to={`/employees/${emp._id}`}>
                        <Eye size={16} className="hover:text-amber-800" />
                      </Link>
                      <Link to={`/employees/edit/${emp._id}`}>
                        <Pencil size={16} className="hover:text-amber-800" />
                      </Link>
                      <Trash2 size={16} className="hover:text-red-600 cursor-pointer" />
                    </div>
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

export default Dashboard;