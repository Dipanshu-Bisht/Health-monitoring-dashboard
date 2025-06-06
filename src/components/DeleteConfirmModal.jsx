const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete this log? This action cannot be undone.</p>
      <div className="flex justify-end space-x-2 mt-6">
        <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;