const { validationResult, body } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg })),
    });
  }
  next();
};

const employeeValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("designation").trim().notEmpty().withMessage("Designation is required"),
  body("salary").isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
  body("status").optional().isIn(["Active", "Inactive"]).withMessage("Status must be Active or Inactive"),
  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required")
    .isISO8601()
    .withMessage("Joining date must be a valid date"),
];

const loginValidationRules = [
  body("email").trim().isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  handleValidationErrors,
  employeeValidationRules,
  loginValidationRules,
};