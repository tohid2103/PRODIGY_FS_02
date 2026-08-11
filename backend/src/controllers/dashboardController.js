const Employee = require("../models/Employee");

const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalEmployees = await Employee.countDocuments();

    const activeCount = await Employee.countDocuments({ status: "Active" });
    const inactiveCount = await Employee.countDocuments({ status: "Inactive" });

    const newHiresThisMonth = await Employee.countDocuments({
      joiningDate: { $gte: startOfThisMonth },
    });

    const addedThisMonth = await Employee.countDocuments({
      createdAt: { $gte: startOfThisMonth },
    });

    const departmentsList = await Employee.distinct("department");
    const totalDepartments = departmentsList.length;

    const byDepartment = await Employee.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const byMonth = await Employee.aggregate([
      { $match: { joiningDate: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$joiningDate" }, month: { $month: "$joiningDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const recentEmployees = await Employee.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name department designation joiningDate status");

    res.json({
      totalEmployees,
      activeCount,
      inactiveCount,
      addedThisMonth,
      newHiresThisMonth,
      totalDepartments,
      employeesByDepartment: byDepartment.map((d) => ({ department: d._id, count: d.count })),
      employeesByMonth: byMonth.map((m) => ({
        year: m._id.year,
        month: m._id.month,
        count: m.count,
      })),
      recentEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboardStats };