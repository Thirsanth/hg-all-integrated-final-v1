// import React, { useState, useEffect } from "react";
// import { Trash2, Pencil } from "lucide-react";
// import InventoryDashboard from "./InventoryDashboard";
// import EditStockModal from "./EditStockModal";
// import EditProductModal from "./EditProductModal";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useParams, useNavigate } from "react-router-dom";
// import StockInsights from "./StockInsights";
// import productImage from "../assets/product_image.png"; // Ensure the correct path to your product image

// // Import useParams and useNavigate

// // Define gridProducts here or import it from a common data file
// // For this example, let's include it directly in ProductDetail for simplicity
// const gridProducts = [
//   {
//     title: "Adult Multivitamin Gummies",
//     category: "Adult",
//     price: "$50.00",
//     sku: "GHSJ1890",
//     description: "Short description of the product will be here...",
//     stockQty: 150,
//     status: "Full Stock", // Added status for consistency
//     image: "/product_image.png", // Ensure actual image path is used
//     tags: "#Adult", // Added tags for consistency
//   },
//   {
//     title: "Kids Multivitamin Gummies",
//     category: "Kids",
//     price: "$50.00",
//     sku: "GHSJ1891",
//     description: "Short description of the product will be here...",
//     stockQty: 100,
//     status: "Low Stock", // Added status for consistency
//     image: "/product_image.png", // Ensure actual image path is used
//     tags: "#Kids", // Added tags for consistency
//   },
//   // ... more products if any
// ];

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const productIndex = parseInt(id, 10);
//   const product = gridProducts[productIndex];

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [status, setStatus] = useState(product?.status || "Active");
//   const [showEditProduct, setShowEditProduct] = useState(false);
//   const [showEditStock, setShowEditStock] = useState(false);

//   useEffect(() => {
//     if (!product) {
//       navigate("/"); // Redirect to product list
//     }
//   }, [product, navigate]);

//   if (!product) {
//     return (
//       <div className="flex h-screen text-white"> {/* Removed overflow-hidden here */}
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Header />
//           <div className="min-h-screen bg-yellow-50 p-8 text-black">
//             <h1 className="text-xl font-bold">Product Not Found</h1>
//             <p>The product you are looking for does not exist.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleStatusChange = (e) => {
//     const newStatus = e.target.value;
//     setStatus(newStatus);
//   };

//   const handleProductUpdate = (updatedProduct) => {
//     setShowEditProduct(false);
//   };

//   const handleStockUpdate = (updatedStockData) => {
//     setShowEditStock(false);
//   };

//   const handleDelete = () => {
//     setShowDeleteConfirm(false);
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen text-white"> {/* Removed overflow-hidden here */}
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <div className="flex-1 overflow-y-auto bg-yellow-50 p-8 text-black">
//           <div className="mb-6">
//             <h1 className="text-xl font-bold mb-1">Products</h1>
//             <p className="text-sm text-gray-500">Products &gt; {product.title}</p>
//           </div>

//           {/* Product Card - Removed fixed width w-[1090px] from here for better responsiveness */}
//           {/* Let the parent padding and flex-grow handle its width */}
//           <div className="w-full bg-white rounded-[16px] shadow-lg p-[24px] flex gap-[24px] items-start">
//             {/* Product Image */}
//             <div className="w-[376px] h-[390px] bg-gray-100 rounded-[16px] flex items-center justify-center">
//               <img
//                 src={productImage}
//                 alt={product.title}
//                 className="h-[320px] object-contain"
//               />
//             </div>

//             {/* Product Details */}
//             <div className="flex-1 h-[390px] flex flex-col justify-between"> {/* Changed w-[642px] to flex-1 */}
//               {/* Title and Actions */}
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <span className="text-sm text-gray-500">Product name:</span>
//                   <h2 className="text-2xl font-bold">{product.title}</h2>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setShowEditProduct(true)}
//                     className="flex items-center px-3 py-1 bg-gray-300 rounded text-sm font-semibold hover:bg-gray-400 text-black"
//                   >
//                     <Pencil size={16} className="mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => setShowDeleteConfirm(true)}
//                     className="flex items-center px-3 py-1 bg-red-100 text-red-600 border border-red-400 rounded text-sm font-semibold hover:bg-red-200"
//                   >
//                     <Trash2 size={16} className="mr-1" />
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               {/* Product Detail Box */}
//               <div className="w-full h-[300px] bg-white border border-gray-300 rounded-[16px] pt-2 pb-2 px-4 flex flex-col divide-y gap-[16px] text-black">
//                 {/* Header Row */}
//                 <div className="flex justify-between items-center py-2">
//                   <span className="font-semibold">Product Details</span>
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm text-gray-600"></label>
//                     <select
//                       className={`text-sm border border-gray-300 rounded-[8px] px-2 py-1 bg-white ${status === "Inactive" ? "text-red-600" : "text-green-600"}`}
//                       value={status}
//                       onChange={handleStatusChange}
//                     >
//                       <option value="Full Stock">Full Stock</option>
//                       <option value="Low Stock">Low Stock</option>
//                       <option value="Out of Stock">Out of Stock</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Info Rows */}
//                 <div className="flex justify-between text-sm py-2 ">
//                   <span className="text-gray-500">SKU</span>
//                   <span className="font-semibold">{product.sku}</span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Availability</span>
//                   <span
//                     className={`font-semibold ${
//                       status === "Full Stock"
//                         ? "text-green-600"
//                         : status === "Low Stock"
//                         ? "text-yellow-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {status}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Price</span>
//                   <span className="font-semibold">{product.price}</span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Tags</span>
//                   <span className="font-semibold">
//                     {product.tags || "#Default"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Inventory Dashboard */}
//           {/* Removed px-6 from here as parent already has p-8 */}
//           {/* Added w-full so it fills the available width */}
//           <InventoryDashboard
//             onEditProduct={() => setShowEditProduct(true)}
//             onEditStock={() => setShowEditStock(true)}
//             // Pass product to InventoryDashboard if it needs product-specific data
//             product={product}
//           />

//           {/* Sales & Performance Insights component */}
//           {/* Added w-full so it fills the available width */}
          

//           {/* Edit Product Modal */}
//           {showEditProduct && (
//             <EditProductModal
//               isOpen={showEditProduct}
//               onClose={() => setShowEditProduct(false)}
//               productData={product}
//               onUpdate={handleProductUpdate}
//             />
//           )}

//           {/* Edit Stock Modal (if ProductDetail still needs to manage it directly) */}
//           {showEditStock && ( // This one might be redundant if InventoryDashboard opens it
//             <EditStockModal
//               isOpen={showEditStock}
//               onClose={() => setShowEditStock(false)}
//               stockData={{ stockQty: product.stockQty }}
//               onUpdate={handleStockUpdate}
//             />
//           )}

//           {/* Delete Confirmation Modal */}
//           {showDeleteConfirm && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-2xl text-center shadow-lg max-w-sm w-full">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-red-500 p-3 rounded-full">
//                     <Trash2 className="text-white" />
//                   </div>
//                 </div>
//                 <p className="text-lg font-semibold mb-2 text-black">
//                   Are you sure you want to delete this product?
//                 </p>
//                 <div className="flex justify-center gap-4 mt-4">
//                   <button
//                     className="bg-yellow-300 px-4 py-2 rounded font-semibold hover:bg-yellow-400 text-black"
//                     onClick={() => setShowDeleteConfirm(false)}
//                   >
//                     No
//                   </button>
//                   <button
//                     className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded font-semibold hover:bg-yellow-100"
//                     onClick={handleDelete}
//                   >
//                     Yes, Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useCallback } from "react";
// import { Trash2, Pencil } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

// const API_BASE_URL = 'http://localhost:5000/api'; 

// const fetchData = async (url, options = {}) => {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("API call failed:", error);
//     throw error;
//   }
// };

// const InventoryDashboard = ({ onEditProduct, onEditStock, product }) => (
//   <div className="bg-white rounded-lg shadow-sm p-6 mt-6 w-full text-black">
//     <h3 className="text-lg font-semibold mb-4">Inventory Dashboard for {product?.title}</h3>
//     <p>Simulating inventory data for the selected product.</p>
//     <div className="flex gap-4 mt-4">
//       <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onEditProduct}>Edit Product</button>
//       <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onEditStock}>Edit Stock</button>
//     </div>
//     <div className="mt-4">
//         <p>Current Stock: {product?.stockQty}</p>
//         <p>Status: {product?.status}</p>
//     </div>
//   </div>
// );

// const EditStockModal = ({ isOpen, onClose, stockData, onUpdate }) => {
//   const [qty, setQty] = useState(stockData?.stockQty || 0);
//   const handleSave = () => {
//     onUpdate({ stockQty: parseInt(qty) });
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-black">
//         <h2 className="text-xl font-bold mb-4">Edit Stock Quantity</h2>
//         <label className="block mb-2">
//           Stock Quantity:
//           <input
//             type="number"
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//             className="border p-2 w-full mt-1 rounded"
//           />
//         </label>
//         <div className="flex justify-end gap-2 mt-4">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditProductModal = ({ isOpen, onClose, productData, onUpdate }) => {
//   const [title, setTitle] = useState(productData?.title || '');
//   const [price, setPrice] = useState(productData?.price || '');
//   const handleSave = () => {
//     onUpdate({ title, price: parseFloat(price) }); // Example update
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-black">
//         <h2 className="text-xl font-bold mb-4">Edit Product Details</h2>
//         <label className="block mb-2">
//           Product Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 w-full mt-1 rounded"
//           />
//         </label>
//         <label className="block mb-2">
//           Price:
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="border p-2 w-full mt-1 rounded"
//           />
//         </label>
//         <div className="flex justify-end gap-2 mt-4">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // const Sidebar = () => (
// //     <div className="w-64 bg-gray-800 text-white p-4 flex flex-col items-center">
// //         <div className="text-2xl font-bold mb-8">Admin Panel</div>
// //         <nav className="space-y-4">
// //             <a href="#" className="flex items-center text-gray-300 hover:text-white">Dashboard</a>
// //             <a href="#" className="flex items-center text-gray-300 hover:text-white">Products</a>
// //             <a href="#" className="flex items-center text-gray-300 hover:text-white">Orders</a>
// //             <a href="#" className="flex items-center text-gray-300 hover:text-white">Customers</a>
// //         </nav>
// //     </div>
// // );

// // const Header = () => (
// //     <header className="bg-white shadow p-4 flex justify-between items-center w-full text-black">
// //         <h1 className="text-xl font-semibold">Inventory Management</h1>
// //         <div className="flex items-center gap-4">
// //             <span>Welcome, Admin</span>
// //             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
// //         </div>
// //     </header>
// // );

// const StockInsights = ({ product }) => (
//     <div className="bg-white rounded-lg shadow-sm p-6 mt-6 w-full text-black">
//         <h3 className="text-lg font-semibold mb-4">Stock Insights for {product?.title}</h3>
//         <p>Detailed insights and performance metrics would be displayed here.</p>
//         <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500 rounded">
//             Chart Placeholder
//         </div>
//     </div>
// );

// // Placeholder for product image
// const productImage = "https://placehold.co/320x320/E5E7EB/6B7280?text=Product+Image";


// export default function ProductDetail() {
//   const { id } = useParams(); 
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showEditProduct, setShowEditProduct] = useState(false);
//   const [showEditStock, setShowEditStock] = useState(false);

//   // Function to fetch product details
//   const fetchProductDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const productData = await fetchData(`${API_BASE_URL}/products/${id}`);
//       setProduct(productData);
//     } catch (err) {
//       setError("Failed to fetch product details: " + err.message);
//       console.error(err);
//       navigate("/"); 
//     } finally {
//       setLoading(false);
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     if (id) {
//       fetchProductDetails();
//     }
//   }, [id, fetchProductDetails]);

//   // Handle status change (e.g., from dropdown)
//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     if (!product) return;
//     try {
//       await fetchData(`${API_BASE_URL}/products/${product._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus })
//       });
//       setProduct(prev => prev ? { ...prev, status: newStatus } : null); // Optimistic update
//       // Log the action
//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product._id,
//           productName: product.title,
//           sku: product.sku,
//           quantityChange: 0,
//           actionType: 'Updated',
//           by: 'Admin',
//           description: `Product status changed to ${newStatus}`
//         })
//       });
//     } catch (err) {
//       setError("Failed to update product status: " + err.message);
//     }
//   };

//   const handleProductUpdate = async (updatedFields) => {
//     if (!product) return;
//     try {
//       await fetchData(`${API_BASE_URL}/products/${product._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedFields)
//       });
//       setProduct(prev => prev ? { ...prev, ...updatedFields } : null); // Optimistic update
//       setShowEditProduct(false);
//       // Log the action
//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product._id,
//           productName: updatedFields.title || product.title,
//           sku: updatedFields.sku || product.sku,
//           quantityChange: 0,
//           actionType: 'Updated',
//           by: 'Admin',
//           description: `Product details updated`
//         })
//       });
//     } catch (err) {
//       setError("Failed to update product: " + err.message);
//     }
//   };

//   const handleStockUpdate = async (updatedStockData) => {
//     if (!product) return;
//     try {
//       const oldStock = product.stockQty;
//       const newStock = updatedStockData.stockQty;
//       const quantityChange = newStock - oldStock;

//       // Determine new status based on new stock quantity
//       const newStatus = newStock <= 0 ? 'Out of Stock' : (newStock < 50 ? 'Low Stock' : 'Full Stock');

//       await fetchData(`${API_BASE_URL}/products/${product._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ stockQty: newStock, status: newStatus })
//       });
//       setProduct(prev => prev ? { ...prev, stockQty: newStock, status: newStatus } : null); // Optimistic update
//       setShowEditStock(false);

//       // Log the stock change
//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product._id,
//           productName: product.title,
//           sku: product.sku,
//           quantityChange: quantityChange,
//           actionType: quantityChange > 0 ? 'Added' : (quantityChange < 0 ? 'Removed' : 'Updated'),
//           by: 'Admin',
//           description: `Stock updated from ${oldStock} to ${newStock}`
//         })
//       });
//     } catch (err) {
//       setError("Failed to update stock: " + err.message);
//     }
//   };

//   const handleDelete = async () => {
//     if (!product) return;
//     try {
//       await fetchData(`${API_BASE_URL}/products/${product._id}`, { method: 'DELETE' });
//       setShowDeleteConfirm(false);

//       // Log the deletion
//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: product._id,
//           productName: product.title,
//           sku: product.sku,
//           quantityChange: 0,
//           actionType: 'Removed',
//           by: 'Admin',
//           description: `Product deleted from inventory`
//         })
//       });
//       navigate("/"); // Redirect to product list after deletion
//     } catch (err) {
//       setError("Failed to delete product: " + err.message);
//     }
//   };

//   if (loading) return <div className="text-center p-8 text-gray-900">Loading product details...</div>;
//   if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;
//   if (!product) {
//     return (
//       <div className="flex h-screen text-white">
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Header />
//           <div className="min-h-screen bg-yellow-50 p-8 text-black">
//             <h1 className="text-xl font-bold">Product Not Found</h1>
//             <p>The product you are looking for does not exist.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen text-white">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <div className="flex-1 overflow-y-auto bg-yellow-50 p-8 text-black">
//           <div className="mb-6">
//             <h1 className="text-xl font-bold mb-1">Products</h1>
//             <p className="text-sm text-gray-500">Products &gt; {product.title}</p>
//           </div>

//           <div className="w-full bg-white rounded-[16px] shadow-lg p-[24px] flex gap-[24px] items-start">
//             <div className="w-[376px] h-[390px] bg-gray-100 rounded-[16px] flex items-center justify-center">
//               <img
//                 src={productImage}
//                 alt={product.title}
//                 className="h-[320px] object-contain"
//               />
//             </div>

//             <div className="flex-1 h-[390px] flex flex-col justify-between">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <span className="text-sm text-gray-500">Product name:</span>
//                   <h2 className="text-2xl font-bold">{product.title}</h2>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setShowEditProduct(true)}
//                     className="flex items-center px-3 py-1 bg-gray-300 rounded text-sm font-semibold hover:bg-gray-400 text-black"
//                   >
//                     <Pencil size={16} className="mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => setShowDeleteConfirm(true)}
//                     className="flex items-center px-3 py-1 bg-red-100 text-red-600 border border-red-400 rounded text-sm font-semibold hover:bg-red-200"
//                   >
//                     <Trash2 size={16} className="mr-1" />
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               <div className="w-full h-[300px] bg-white border border-gray-300 rounded-[16px] pt-2 pb-2 px-4 flex flex-col divide-y gap-[16px] text-black">
//                 <div className="flex justify-between items-center py-2">
//                   <span className="font-semibold">Product Details</span>
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm text-gray-600"></label>
//                     <select
//                       className={`text-sm border border-gray-300 rounded-[8px] px-2 py-1 bg-white ${product.status === "Inactive" ? "text-red-600" : "text-green-600"}`}
//                       value={product.status}
//                       onChange={handleStatusChange}
//                     >
//                       <option value="Full Stock">Full Stock</option>
//                       <option value="Low Stock">Low Stock</option>
//                       <option value="Out of Stock">Out of Stock</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex justify-between text-sm py-2 ">
//                   <span className="text-gray-500">SKU</span>
//                   <span className="font-semibold">{product.sku}</span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Availability</span>
//                   <span
//                     className={`font-semibold ${
//                       product.status === "Full Stock"
//                         ? "text-green-600"
//                         : product.status === "Low Stock"
//                         ? "text-yellow-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {product.status}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Price</span>
//                   <span className="font-semibold">${product.price.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between text-sm py-2">
//                   <span className="text-gray-500">Tags</span>
//                   <span className="font-semibold">
//                     {product.tags && product.tags.length > 0 ? product.tags.join(', ') : "#Default"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <InventoryDashboard
//             onEditProduct={() => setShowEditProduct(true)}
//             onEditStock={() => setShowEditStock(true)}
//             product={product} // Pass product data to dashboard
//           />

//           <StockInsights product={product} />

//           {showEditProduct && (
//             <EditProductModal
//               isOpen={showEditProduct}
//               onClose={() => setShowEditProduct(false)}
//               productData={product}
//               onUpdate={handleProductUpdate}
//             />
//           )}

//           {showEditStock && (
//             <EditStockModal
//               isOpen={showEditStock}
//               onClose={() => setShowEditStock(false)}
//               stockData={{ stockQty: product.stockQty }}
//               onUpdate={handleStockUpdate}
//             />
//           )}

//           {showDeleteConfirm && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-2xl text-center shadow-lg max-w-sm w-full">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-red-500 p-3 rounded-full">
//                     <Trash2 className="text-white" />
//                   </div>
//                 </div>
//                 <p className="text-lg font-semibold mb-2 text-black">
//                   Are you sure you want to delete this product?
//                 </p>
//                 <div className="flex justify-center gap-4 mt-4">
//                   <button
//                     className="bg-yellow-300 px-4 py-2 rounded font-semibold hover:bg-yellow-400 text-black"
//                     onClick={() => setShowDeleteConfirm(false)}
//                   >
//                     No
//                   </button>
//                   <button
//                     className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded font-semibold hover:bg-yellow-100"
//                     onClick={handleDelete}
//                   >
//                     Yes, Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Pencil, Edit } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const API_BASE_URL = 'http://localhost:5000/api'; 

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const InventoryDashboard = ({ onEditProduct, onEditStock, product }) => (
  <div className="bg-white rounded-[16px] shadow-lg p-6 mt-6 w-full text-black">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900">Stock Status & Inventory Insights</h3>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Auto Alert: Enabled</span>
        <span className="text-sm text-gray-500">Update Stock</span>
        <button
          onClick={onEditStock}
          className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
        >
          <Edit size={14} className="mr-1" />
          Edit
        </button>
      </div>
    </div>

    {/*  */}
     <div className="grid grid-cols-2 gap-8">
        {/* Left Panel - Stock Information */}
        <div className="space-y-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Last Stock Updated</span>
            <span className="font-bold text-gray-900">08 Apr 2025</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Last Ordered On</span>
            <span className="font-bold text-gray-900">2 min ago</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Current Stock</span>
            <span className="font-bold text-gray-900">250</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Low Stock</span>
            <span className="font-bold text-gray-900">20</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Max Capacity</span>
            <span className="font-bold text-gray-900">500</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Minimum Order Qty</span>
            <span className="font-bold text-gray-900">1</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-medium">Maximum Order Qty</span>
            <span className="font-bold text-gray-900">10</span>
          </div>
        </div>

      {/* Right Column - Inventory Performance Chart */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-medium text-gray-900">Inventory Performance</h4>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        
        <div className="mb-4">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>✓ Current Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Low Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>✓ Out of Stock</span>
            </div>
          </div>
        </div>

        {/* Placeholder for chart */}
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <span className="text-gray-500">Chart visualization would appear here</span>
        </div>
      </div>
    </div>
  </div>
);

const StockInsights = ({ product }) => (
  <div className="bg-white rounded-[16px] shadow-lg p-6 mt-6 w-full text-black">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900">Sales & Performance Insights</h3>
      <span className="text-sm text-gray-500">Last 7 days</span>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">📊 Sales last 30D</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">📈 Returns: 10</span>
      </div>
    </div>

    {/* Placeholder for sales chart */}
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
      <span className="text-gray-500">Sales performance chart would appear here</span>
    </div>
  </div>
);

const EditStockModal = ({ isOpen, onClose, stockData, onUpdate }) => {
  const [qty, setQty] = useState(stockData?.stockQty || 0);
  const handleSave = () => {
    onUpdate({ stockQty: parseInt(qty) });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Edit Stock Quantity</h2>
        <label className="block mb-2">
          Stock Quantity:
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

const EditProductModal = ({ isOpen, onClose, productData, onUpdate }) => {
  const [title, setTitle] = useState(productData?.title || '');
  const [price, setPrice] = useState(productData?.price || '');
  const handleSave = () => {
    onUpdate({ title, price: parseFloat(price) });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Edit Product Details</h2>
        <label className="block mb-2">
          Product Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

// Placeholder for product image
const productImage = "/product_image.png";

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showEditStock, setShowEditStock] = useState(false);

  // Function to fetch product details
  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productData = await fetchData(`${API_BASE_URL}/products/${id}`);
      setProduct(productData);
    } catch (err) {
      setError("Failed to fetch product details: " + err.message);
      console.error(err);
      navigate("/"); 
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id, fetchProductDetails]);

  // Handle status change (e.g., from dropdown)
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!product) return;
    try {
      await fetchData(`${API_BASE_URL}/products/${product._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setProduct(prev => prev ? { ...prev, status: newStatus } : null); // Optimistic update
      // Log the action
      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          productName: product.title,
          sku: product.sku,
          quantityChange: 0,
          actionType: 'Updated',
          by: 'Admin',
          description: `Product status changed to ${newStatus}`
        })
      });
    } catch (err) {
      setError("Failed to update product status: " + err.message);
    }
  };

  const handleProductUpdate = async (updatedFields) => {
    if (!product) return;
    try {
      await fetchData(`${API_BASE_URL}/products/${product._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      setProduct(prev => prev ? { ...prev, ...updatedFields } : null); // Optimistic update
      setShowEditProduct(false);
      // Log the action
      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          productName: updatedFields.title || product.title,
          sku: updatedFields.sku || product.sku,
          quantityChange: 0,
          actionType: 'Updated',
          by: 'Admin',
          description: `Product details updated`
        })
      });
    } catch (err) {
      setError("Failed to update product: " + err.message);
    }
  };

  const handleStockUpdate = async (updatedStockData) => {
    if (!product) return;
    try {
      const oldStock = product.stockQty;
      const newStock = updatedStockData.stockQty;
      const quantityChange = newStock - oldStock;

      // Determine new status based on new stock quantity
      const newStatus = newStock <= 0 ? 'Out of Stock' : (newStock < 50 ? 'Low Stock' : 'Full Stock');

      await fetchData(`${API_BASE_URL}/products/${product._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQty: newStock, status: newStatus })
      });
      setProduct(prev => prev ? { ...prev, stockQty: newStock, status: newStatus } : null); // Optimistic update
      setShowEditStock(false);

      // Log the stock change
      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          productName: product.title,
          sku: product.sku,
          quantityChange: quantityChange,
          actionType: quantityChange > 0 ? 'Added' : (quantityChange < 0 ? 'Removed' : 'Updated'),
          by: 'Admin',
          description: `Stock updated from ${oldStock} to ${newStock}`
        })
      });
    } catch (err) {
      setError("Failed to update stock: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    try {
      await fetchData(`${API_BASE_URL}/products/${product._id}`, { method: 'DELETE' });
      setShowDeleteConfirm(false);

      // Log the deletion
      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          productName: product.title,
          sku: product.sku,
          quantityChange: 0,
          actionType: 'Removed',
          by: 'Admin',
          description: `Product deleted from inventory`
        })
      });
      navigate("/"); // Redirect to product list after deletion
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-900">Loading product details...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  if (!product) {
    return (
      <div className="flex h-screen text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="min-h-screen bg-yellow-50 p-8 text-black">
            <h1 className="text-xl font-bold">Product Not Found</h1>
            <p>The product you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto bg-yellow-50 p-8 text-black">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-1">Products</h1>
            <p className="text-sm text-gray-500">Products &gt; {product.title}</p>
          </div>

          <div className="w-full bg-white rounded-[16px] shadow-lg p-[24px] flex gap-[24px] items-start">
            <div className="w-[376px] h-[390px] bg-gray-100 rounded-[16px] flex items-center justify-center">
              <img
                src={product.image||productImage}
                alt={product.title}
                className="h-[320px] object-contain"
              />
            </div>

            <div className="flex-1 h-[390px] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm text-gray-500">Product name:</span>
                  <h2 className="text-2xl font-bold">{product.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditProduct(true)}
                    className="flex items-center px-3 py-1 bg-gray-300 rounded text-sm font-semibold hover:bg-gray-400 text-black"
                  >
                    <Pencil size={16} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center px-3 py-1 bg-red-100 text-red-600 border border-red-400 rounded text-sm font-semibold hover:bg-red-200"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="w-full h-[300px] bg-white border border-gray-300 rounded-[16px] pt-2 pb-2 px-4 flex flex-col divide-y gap-[16px] text-black">
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold">Product Details</span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600"></label>
                    <select
                      className={`text-sm border border-gray-300 rounded-[8px] px-2 py-1 bg-white ${product.status === "Inactive" ? "text-red-600" : "text-green-600"}`}
                      value={product.status}
                      onChange={handleStatusChange}
                    >
                      <option value="Full Stock">Full Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between text-sm py-2 ">
                  <span className="text-gray-500">SKU</span>
                  <span className="font-semibold">{product.sku}</span>
                </div>

                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-500">Availability</span>
                  <span
                    className={`font-semibold ${
                      product.status === "Full Stock"
                        ? "text-green-600"
                        : product.status === "Low Stock"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-500">Tags</span>
                  <span className="font-semibold">
                    {product.tags && product.tags.length > 0 ? product.tags.join(', ') : "#Default"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <InventoryDashboard
            onEditProduct={() => setShowEditProduct(true)}
            onEditStock={() => setShowEditStock(true)}
            product={product}
          />

          <StockInsights product={product} />

          {showEditProduct && (
            <EditProductModal
              isOpen={showEditProduct}
              onClose={() => setShowEditProduct(false)}
              productData={product}
              onUpdate={handleProductUpdate}
            />
          )}

          {showEditStock && (
            <EditStockModal
              isOpen={showEditStock}
              onClose={() => setShowEditStock(false)}
              stockData={{ stockQty: product.stockQty }}
              onUpdate={handleStockUpdate}
            />
          )}

          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-2xl text-center shadow-lg max-w-sm w-full">
                <div className="flex justify-center mb-4">
                  <div className="bg-red-500 p-3 rounded-full">
                    <Trash2 className="text-white" />
                  </div>
                </div>
                <p className="text-lg font-semibold mb-2 text-black">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="bg-yellow-300 px-4 py-2 rounded font-semibold hover:bg-yellow-400 text-black"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded font-semibold hover:bg-yellow-100"
                    onClick={handleDelete}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
