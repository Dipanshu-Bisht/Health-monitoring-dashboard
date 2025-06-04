import { useState, useEffect } from "react";
import { fetchHealthLogs, deleteHealthLog } from "../services/api";

export const useHealthLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHealthLogs();
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

  return { logs, loading, error, sortOrder, sortLogs, handleDelete };
};