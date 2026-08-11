import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Employees", path: "/employees" },
  { name: "Add Employee", path: "/employees/add" },
  { name: "Departments", path: "/departments" },
  { name: "Reports", path: "/reports" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="w-56 min-h-screen flex flex-col justify-between border-r"
      style={{ backgroundColor: "#faecc0", borderColor: "#eddca0" }}
    >
      <div>
        <div className="px-6 py-5 font-semibold text-lg flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: "#92400e" }}
          >
            ✦
          </span>
          <span style={{ color: "#92400e" }}>WorkSphere</span>
        </div>
        <nav className="mt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-6 py-2.5 text-sm ${
                  isActive ? "font-medium border-r-2" : "text-gray-600 hover:bg-amber-100/50"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "#fdf3d9", color: "#92400e", borderColor: "#92400e" }
                  : {}
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
     <button
      onClick={handleLogout}
      className="mx-4 mb-4 text-white text-sm font-semibold py-2 rounded-full text-center"
      style={{ backgroundColor: "#92400e" }}
    >
     Logout
    </button>
    </div>
  );
};

export default Sidebar;