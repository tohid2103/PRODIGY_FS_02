import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h1 className="text-xl font-semibold mb-1">My Profile</h1>
      <p className="text-gray-500 text-sm mb-6">Manage your profile information</p>

      <div className="bg-[#fffbea] border border-[#eddca0] rounded-2xl shadow-sm p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white"
            style={{ backgroundColor: "#92400e" }}
          >
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-500 text-sm">Administrator</p>
          </div>
        </div>

        <hr className="mb-5 border-[#eddca0]" />

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium">Administrator</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;