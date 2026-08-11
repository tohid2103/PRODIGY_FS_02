WorkSphere — Employee Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows administrators to manage employee records with complete CRUD functionality, secure authentication, search/filter/sort capabilities, and an analytics dashboard.



Features
🔐 Authentication
Admin registration and login
Passwords hashed using bcrypt
JWT-based session authentication
Protected routes — no data accessible without login
👥 Employee Management (CRUD)
Add, view, update, and delete employee records
Fields: Name, Email, Phone, Department, Designation, Salary, Joining Date, Status (Active/Inactive)
Server-side validation (email format, 10-digit phone, unique email, non-negative salary, etc.)
Employee details page with automatic tenure calculation (years/months/days with the company)
🔍 Search, Filter & Sort
Real-time search by name, department, or designation
Filter by department (dynamically populated from the Departments module)
Sortable columns (Name, Salary, Joining Date) with ascending/descending toggle
🏢 Department Management
Add, view, and delete departments
Displays live employee count per department
Cascade delete — removing a department also removes its employees (with confirmation prompt)
📊 Dashboard
Total employees, active employees, department count, new hires this month
Employees-by-department donut chart
Employee status (Active/Inactive) donut chart
New-employees-by-month line chart (last 6 months)
Recent employees table with quick view/edit/delete actions
📈 Reports
Department-wise employee distribution with percentage breakdown
👤 Profile & Settings
View admin profile details
Update admin name
Tech Stack

Frontend

React (Vite)
React Router DOM
Tailwind CSS
Axios
Recharts (charts)
Lucide React (icons)

Backend

Node.js + Express
MongoDB with Mongoose
JWT for authentication
bcrypt.js for password hashing
express-validator for input validation

Database

MongoDB Atlas (cloud-hosted)

Project Structure

employee-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Employee.js
│   │   │   └── Department.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validate.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── employeeController.js
│   │   │   ├── departmentController.js
│   │   │   └── dashboardController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── departmentRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── EmployeeForm.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Employees.jsx
    │   │   ├── AddEmployee.jsx
    │   │   ├── EditEmployee.jsx
    │   │   ├── EmployeeDetails.jsx
    │   │   ├── Departments.jsx
    │   │   ├── Reports.jsx
    │   │   ├── Profile.jsx
    │   │   └── Settings.jsx
    │   ├── utils/
    │   │   └── formatDate.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

Getting Started

Prerequisites

Node.js (v18 or later)

A MongoDB Atlas account (or local MongoDB installation)

1. Clone the repository
bash
git clone https://github.com/yourusername/PRODIGY_FS_02.git
cd PRODIGY_FS_02

2. Backend Setup
bash
cd backend
npm install

Create a .env file in the backend folder (use .env.example as reference):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

Start the backend server:

bash
npm run dev

The API will run on http://localhost:5000.

3. Frontend Setup

Open a new terminal:

bash
cd frontend
npm install
npm run dev

The app will run on http://localhost:5173.

4. Create the first admin account

Since there's no seed data, register the first admin via the app's Register page, or send a POST request to:

POST http://localhost:5000/api/auth/register
Body: { "name": "Admin", "email": "admin@example.com", "password": "yourpassword" }
API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new admin
POST	/api/auth/login	Login and receive JWT token
PUT	/api/auth/profile	Update logged-in admin's profile (protected)
Employees
Method	Endpoint	Description
GET	/api/employees	Get all employees (supports search, department, sortBy, order, page, limit)
POST	/api/employees	Create a new employee
GET	/api/employees/:id	Get a single employee
PUT	/api/employees/:id	Update an employee
DELETE	/api/employees/:id	Delete an employee
Departments
Method	Endpoint	Description
GET	/api/departments	Get all departments with employee counts
POST	/api/departments	Create a new department
GET	/api/departments/:id	Get a single department
PUT	/api/departments/:id	Update a department
DELETE	/api/departments/:id	Delete a department (cascades to its employees)
Dashboard
Method	Endpoint	Description
GET	/api/dashboard/stats	Get aggregated stats for the dashboard

All /api/employees, /api/departments, and /api/dashboard routes require a valid JWT in the Authorization: Bearer <token> header.


Future Improvements
Profile photo upload
Role-based access control (Admin / HR)
Employee self-service portal
Attendance and leave management
Export employee data to CSV/Excel