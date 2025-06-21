
export default function EditStockModal({ isOpen, onClose, stockData, onUpdate }) {
    if (!isOpen) return null;
  
    const handleUpdate = () => {
      onUpdate({ ...stockData });
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Edit Stock Status</h2>
            <button onClick={onClose} className="text-gray-500">&times;</button>
          </div>
  
          {["Current Stock", "Low Stock", "Out of Stock", "Max Capacity", "Minimum Order Qty", "Maximum Order Qty"].map((label, idx) => (
            <div key={idx} className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input type="number" className="w-full px-3 py-2 border rounded" />
            </div>
          ))}
  
          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400" onClick={handleUpdate}>
              Update
            </button>
            <button className="border px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  