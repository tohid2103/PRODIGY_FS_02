const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByYear,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/auth");
const { employeeValidationRules, handleValidationErrors } = require("../middleware/validate");

router.use(protect);

router.get("/by-year", getEmployeesByYear);

router.route("/")
  .get(getEmployees)
  .post(employeeValidationRules, handleValidationErrors, createEmployee);

router.route("/:id")
  .get(getEmployeeById)
  .put(employeeValidationRules, handleValidationErrors, updateEmployee)
  .delete(deleteEmployee);

module.exports = router;