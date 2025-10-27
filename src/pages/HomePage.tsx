import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router";

export default function HomePage() {
  const { userName, userId, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* User Info Card */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 border border-slate-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Welcome, {userName}! 👋
              </h1>
              <p className="text-slate-400 text-sm mt-1">Admin ID: {userId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded-lg transition self-start sm:self-auto cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Management Dashboard */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 sm:p-6 border border-slate-700">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Management Center
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Orders Management */}
            <button
              onClick={() => navigate("/orders")}
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:from-emerald-800 active:to-emerald-900 text-white p-6 rounded-lg transition text-center cursor-pointer border border-emerald-500"
            >
              <div className="text-4xl mb-2">📦</div>
              <div className="font-semibold text-lg">Orders Management</div>
              <div className="text-sm opacity-90 mt-1">
                View and manage orders
              </div>
            </button>

            {/* Orders Analytics - Coming Soon */}
            <div className="bg-slate-700 text-slate-400 p-6 rounded-lg text-center cursor-not-allowed border border-slate-600">
              <div className="text-4xl mb-2">📊</div>
              <div className="font-semibold text-lg">Orders Analytics</div>
              <div className="text-sm opacity-75 mt-1">Coming soon...</div>
            </div>

            {/* User Management - Coming Soon */}
            <div className="bg-slate-700 text-slate-400 p-6 rounded-lg text-center cursor-not-allowed border border-slate-600">
              <div className="text-4xl mb-2">👥</div>
              <div className="font-semibold text-lg">User Management</div>
              <div className="text-sm opacity-75 mt-1">Coming soon...</div>
            </div>

            {/* Settings - Coming Soon */}
            <div className="bg-slate-700 text-slate-400 p-6 rounded-lg text-center cursor-not-allowed border border-slate-600">
              <div className="text-4xl mb-2">⚙️</div>
              <div className="font-semibold text-lg">Settings</div>
              <div className="text-sm opacity-75 mt-1">Coming soon...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
