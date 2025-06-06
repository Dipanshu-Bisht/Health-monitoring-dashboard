import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHealthLogs, updateHealthLog } from "../services/api";
import Loader from "../components/Loader";

const EditLogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      setLoading(true);
      try {
        const logs = await getHealthLogs();
        const found = logs.find((l) => String(l.id) === String(id));
        setLog(found);
        setForm(found ? { ...found } : null);
        setLoading(false);
      } catch (err) {
        setError("Failed to load log");
        setLoading(false);
      }
    };
    fetchLog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateHealthLog(id, form);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update log");
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!log) return <div className="p-8">Log not found.</div>;

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Log</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-semibold">Type</label>
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Date</label>
            <input
              name="date"
              type="date"
              value={form.date ? form.date.slice(0, 10) : ""}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Value</label>
            <input
              name="value"
              value={form.value}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-3 py-1 bg-gray-200 rounded"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLogPage;