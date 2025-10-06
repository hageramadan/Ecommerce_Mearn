function UpdateStatusModal({ isOpen, order, newStatus, onStatusChange, onUpdate, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Update Order Status</h2>
        <select
          value={newStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="flex space-x-3">
          <button
            onClick={onUpdate}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatusModal;