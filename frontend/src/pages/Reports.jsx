import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const Reports = () => {
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

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">Reports</h1>
      <p className="text-gray-500 text-sm mb-6">Department-wise employee summary</p>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <div className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm overflow-hidden max-w-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-100 text-gray-600 text-left">
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Employee Count</th>
                <th className="px-4 py-3">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {stats?.employeesByDepartment?.length === 0 ? (
                <tr><td colSpan="3" className="px-4 py-6 text-center text-gray-500">No data available</td></tr>
              ) : (
                stats?.employeesByDepartment?.map((d) => (
                  <tr key={d.department} className="border-t border-[#eddca0]">
                    <td className="px-4 py-3 font-medium">{d.department}</td>
                    <td className="px-4 py-3">{d.count}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {stats.totalEmployees > 0 ? ((d.count / stats.totalEmployees) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Reports;