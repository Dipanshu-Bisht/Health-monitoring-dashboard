import { useAuth } from "../hooks/useAuth";
import { useHealthLogs } from "../hooks/useHealthLogs";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { logs, loading, error } = useHealthLogs();

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)] animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Your Health Dashboard, {user?.email || "User"}!
        </h1>
        <div className="mb-6">
          <Link
            to="/add-log"
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-pink-600 transition"
          >
            Add New Log
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-4">Your Health Logs</h2>
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-500">No health logs found. Add a log to get started!</p>
        ) : (
          <div className="grid gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{log.type}</p>
                  <p className="text-gray-600">{log.value}</p>
                </div>
                <p className="text-gray-500">{log.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;