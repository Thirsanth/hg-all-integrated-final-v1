
export default function EditProductModal({ isOpen, onClose, productData, onUpdate }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Edit Product Details</h2>
            <button onClick={onClose} className="text-gray-500">&times;</button>
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">SKU</label>
            <input type="text" value={productData.sku} className="w-full px-3 py-2 border rounded" readOnly />
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1"></label>
            <select className="w-full px-3 py-2 border rounded text-green-600 font-semibold">
              <option>Availability</option>
              <option>Inactive</option>
            </select>
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Price</label>
            <input type="text" value={`$${productData.price}`} className="w-full px-3 py-2 border rounded" />
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Tags</label>
            <input type="text" value="#Kids" className="w-full px-3 py-2 border rounded" />
          </div>
  
          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400" onClick={onUpdate}>
              Update
            </button>
            <button className="border px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  