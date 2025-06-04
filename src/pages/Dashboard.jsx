import { useAuth } from "../hooks/useAuth";
import { useHealthLogs } from "../hooks/useHealthLogs";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { logs, loading, error, sortOrder, sortLogs, handleDelete } = useHealthLogs();

  const getLogIcon = (type) => {
    switch (type) {
      case "Sleep":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        );
      case "Water Intake":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 21h18M12 3v18m-6-6h12"
            />
          </svg>
        );
      case "Steps":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)] animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to Your Health Dashboard, {user?.name || user?.email || "User"}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> {user?.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Name:</span> {user?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {user?.age || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {user?.gender || "N/A"}
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>Total Logs: {logs.length}</p>
          <p>
            Most Recent Log Type: {logs.length > 0 ? logs[0].type : "N/A"}
          </p>
        </div>

        {/* Health Logs Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Health Logs</h2>
          <div className="space-x-2">
            <button
              onClick={() => sortLogs("desc")}
              className={`px-3 py-1 rounded-lg ${
                sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => sortLogs("asc")}
              className={`px-3 py-1 rounded-lg ${
                sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Oldest First
            </button>
            <Link
              to="/add-log"
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-pink-600 transition"
            >
              Add New Log
            </Link>
          </div>
        </div>

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
                <div className="flex items-center space-x-4">
                  {getLogIcon(log.type)}
                  <div>
                    <p className="font-medium">{log.type}</p>
                    <p className="text-gray-600">{log.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-500">{log.date}</p>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;