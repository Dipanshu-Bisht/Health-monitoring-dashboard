import { useState } from "react";

const EditLogModal = ({ log, onClose, onSave }) => {
  const [form, setForm] = useState({ ...log });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
    } catch (err) {
      setError("Failed to update log");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Log</h2>
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
              onClick={onClose}
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

export default EditLogModal;