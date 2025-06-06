import { useState, useEffect } from "react";
import { getHealthLogs, deleteHealthLog, updateHealthLog } from "../services/api";

export const useHealthLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHealthLogs();
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  const sortLogs = (order) => {
    setSortOrder(order);
    setLogs((prevLogs) =>
      [...prevLogs].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      })
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteHealthLog(id);
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
    } catch (err) {
      setError("Failed to delete log");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const updated = await updateHealthLog(id, updatedData);
      setLogs((prevLogs) =>
        prevLogs.map((log) => (log.id === id ? updated : log))
      );
      return { success: true };
    } catch (err) {
      setError("Failed to update log");
      return { success: false, error: err.message };
    }
  };

  // Filtering logic
  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType ? log.type === filterType : true;
    const matchesDate = filterDate ? log.date.startsWith(filterDate) : true;
    return matchesType && matchesDate;
  });

  // Get unique types for filter dropdown
  const logTypes = Array.from(new Set(logs.map((log) => log.type)));

  return {
    logs: filteredLogs,
    loading,
    error,
    sortOrder,
    sortLogs,
    handleDelete,
    handleUpdate,
    filterType,
    setFilterType,
    filterDate,
    setFilterDate,
    logTypes,
  };
};