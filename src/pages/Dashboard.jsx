import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHealthLogs } from "../hooks/useHealthLogs";
import Loader from "../components/Loader";
import LogDetailsPopup from "../components/LogDetailsPopup";
import EditLogModal from "../components/EditLogModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    logs,
    loading,
    error,
    sortOrder,
    sortLogs,
    handleDelete,
    handleUpdate, // Make sure this is provided by your useHealthLogs hook
    filterType,
    setFilterType,
    filterDate,
    setFilterDate,
    logTypes,
  } = useHealthLogs();

  const [selectedLog, setSelectedLog] = useState(null);
  const [editLog, setEditLog] = useState(null);
  const [deleteLogId, setDeleteLogId] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)] animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to Your Health Dashboard, {user?.name || "User"}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> {user?.email || "N/A"}
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
        </div>

        {/* Filter Section */}
        <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
          <div>
            <label className="mr-2 font-semibold">Filter by Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              {logTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Filter by Date:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          {(filterType || filterDate) && (
            <button
              onClick={() => {
                setFilterType("");
                setFilterDate("");
              }}
              className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Clear Filters
            </button>
          )}
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
                className="bg-gray-100 p-4 rounded-lg shadow flex items-center justify-between cursor-pointer hover:bg-gray-200 transition"
                onClick={() => setSelectedLog(log)}
              >
                {/* Date on the left */}
                <div className="w-32 text-gray-500 font-mono">
                  {new Date(log.date).toLocaleDateString("en-GB")}
                </div>
                {/* Main log info */}
                <div className="flex-1 px-4">
                  <div className="font-medium">{log.type}</div>
                  <div className="text-gray-600 text-sm">{log.notes || log.value}</div>
                </div>
                {/* Options on the right */}
                <div
                  className="flex items-center space-x-3 z-10"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => setEditLog(log)}
                    title="Edit"
                    className="text-xl hover:scale-110 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setDeleteLogId(log.id)}
                    title="Delete"
                    className="text-xl hover:scale-110 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popup for log details */}
        {selectedLog && (
          <LogDetailsPopup
            log={selectedLog}
            onClose={() => setSelectedLog(null)}
          />
        )}

        {/* Edit Modal */}
        {editLog && (
          <EditLogModal
            log={editLog}
            onClose={() => setEditLog(null)}
            onSave={async (updatedData) => {
              const result = await handleUpdate(editLog.id, updatedData);
              if (result.success) setEditLog(null);
            }}
          />
        )}

        {/* Delete confirmation modal */}
        {deleteLogId && (
          <DeleteConfirmModal
            onCancel={() => setDeleteLogId(null)}
            onConfirm={async () => {
              await handleDelete(deleteLogId);
              setDeleteLogId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;