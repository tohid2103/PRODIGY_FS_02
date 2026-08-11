import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#fdf3d9" }}>
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;