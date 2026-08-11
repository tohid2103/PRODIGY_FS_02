const Department = require("../models/Department");
const Employee = require("../models/Employee");

const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const existing = await Department.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "This department already exists" });
    }

    const department = await Department.create({ name: name.trim(), description });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });

    const counts = await Employee.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id] = c.count;
    });

    const result = departments.map((dept) => ({
      _id: dept._id,
      name: dept.name,
      description: dept.description,
      employeeCount: countMap[dept.name] || 0,
      createdAt: dept.createdAt,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (name) {
      const existing = await Department.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ message: "Another department already uses this name" });
      }
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Delete all employees belonging to this department (cascade delete)
    const deleteResult = await Employee.deleteMany({ department: department.name });

    await department.deleteOne();

    res.json({
      message: `Department deleted successfully. ${deleteResult.deletedCount} employee(s) were also removed.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};