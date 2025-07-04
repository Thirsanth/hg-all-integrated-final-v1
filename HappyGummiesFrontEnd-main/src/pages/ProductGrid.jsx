// import React, { useState } from "react";
// import { List } from "lucide-react";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import grid from "../assets/iconoir_view-grid.png";
// import productImage from "../assets/product_image.png"; 

// const listProducts = [
//   {
//     title: "Kids Candies",
//     category: "Kids",
//     price: "$50.00",
//     sku: "#5302002",
//     description: "Short description of the product ABCD here..",
//     stockQty: 50,
//     status: "Full Stock",
//   },
//   {
//     title: "Kids Candies",
//     category: "Kids",
//     price: "$50.00",
//     sku: "#5302002",
//     description: "Short description of the product ABCD here..",
//     stockQty: 50,
//     status: "Low Stock",
//   },
// ];

// const gridProducts = [
//   {
//     title: "Adult Multivitamin Gummies",
//     category: "Adult",
//     price: "$50.00",
//     sku: "GHSJ1890",
//     description: "Short description of the product will be here...",
//     stockQty: 150,
//     status: "",
//     image: "/image.png",
//   },
//   {
//     title: "Kids Multivitamin Gummies",
//     category: "Kids",
//     price: "$50.00",
//     sku: "GHSJ1891",
//     description: "Short description of the product will be here...",
//     stockQty: 100,
//     status: "",
//     image: "/image.png",
//   },
// ];

// export default function ProductGrid() {
//   const [isGridView, setIsGridView] = useState(false);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "":
//         return "text-green-600";
//       case "Low Stock":
//         return "text-yellow-500";
//       case "Out of Stock":
//         return "text-red-500";
//       default:
//         return "text-gray-600";
//     }
//   };

//   return (


//    <div className="flex h-screen text-white"> 
//          <Sidebar/>
//          <div className="flex flex-col flex-1"  > 
//            <Header />
//     <div className="min-h-screen w-full bg-yellow-50 flex flex-col mt-8" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }} >
//       <div className="flex items-center justify-between px-6 py-4 mt-8">
//         <div className="text-left">
//           <h1 className="text-xl font-semibold text-black">Products</h1>
//           <p className="text-sm text-black/70">Detailed review on Products</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             className={`flex items-center gap-1 px-3 py-1 transition ${
//               !isGridView
//                 ? "text-black font-semibold"
//                 : "text-black/60 hover:text-black"
//             }`}
//             onClick={() => setIsGridView(false)}
//           >
//             <List size={18} />
//             <span>List View</span>
//           </button>
//           <button
//             className={`flex items-center gap-1 px-3 py-1 transition ${
//               isGridView
//                 ? "text-black font-semibold"
//                 : "text-black/60 hover:text-black hover:animate-shake"
//             }`}
//             onClick={() => setIsGridView(true)}
//           >
//             <img
//               src={grid}
//               alt="Grid View"
//               className="w-6 h-6"
//             />
//             <span>Grid View</span>
//           </button>
//         </div>
//       </div>

//       <main className="px-6 py-2 overflow-y-auto">
//         {isGridView ? (
//           // Grid View
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[99%] mx-auto">
//             {gridProducts.map((product, index) => (
//               <div
//                 key={index}
//                 className="rounded-2xl shadow-lg p-8 bg-white/70 backdrop-blur-md"
//               >
//                 <div className="rounded-xl flex justify-center items-center mb-6 bg-gray-100 p-6 h-[500px]">
//                   <img
//                     src={productImage}
//                     alt={product.title}
//                     className="max-h-[400px] max-w-[80%] object-contain rounded-lg"
//                   />
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-xl font-semibold text-black">
//                       {product.title}
//                     </h2>
//                     <span className="text-lg font-semibold text-black">
//                       {product.price}
//                     </span>
//                   </div>
//                   <p className="text-base text-black/70 leading-snug">
//                     {product.description}
//                   </p>
//                 </div>

//                 <div className="space-y-3 mt-6">
//                   <div className="text-lg text-black/70 leading-snug">
//                     SKU ID: {product.sku}
//                   </div>
//                   <div className="text-lg text-black/70 leading-snug">
//                     Stock Qty: {product.stockQty}
//                   </div>
//                   <div className="text-lg text-black/70 leading-snug">
//                     Status:{" "}
//                     <span className={getStatusColor(product.status)}>
//                       {product.status}
//                     </span>
//                   </div>
//                 </div>

//                 <Link
//                   to={`/productdetail/${index}`}
//                   className="text- text-gray-700 underline block mt-2"
//                 >
//                   View in detail
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           // List View
//           <div className="bg-white/80 shadow-lg rounded-xl overflow-x-auto p-4">
//             <h2 className="text-lg font-semibold mb-4">Product List</h2>
//             <table className="min-w-full table-auto">
//               <thead className="bg-gray-100 rounded-lg">
//                 <tr className="text-left text-sm text-gray-700">
//                   <th className="px-4 py-2">Product Name</th>
//                   <th className="px-4 py-2">SKU ID</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Description</th>
//                   <th className="px-4 py-2">Stock Qty</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-black">
//                 {listProducts.map((product, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="font-semibold">{product.title}</div>
//                       <div className="text-gray-500">{product.category}</div>
//                     </td>
//                     <td className="px-4 py-3">{product.sku}</td>
//                     <td className="px-4 py-3">{product.price}</td>
//                     <td className="px-4 py-3">{product.description}</td>
//                     <td className="px-4 py-3">{product.stockQty}</td>
//                     <td
//                       className={`px-4 py-3 font-semibold ${getStatusColor(
//                         product.status
//                       )}`}
//                     >
//                       {product.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//     </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from "react";
import { List } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import productImage from '../assets/product_image.png';

// --- Mock API Base URL (Replace with your actual backend URL) ---
const API_BASE_URL = 'http://localhost:5000/api'; // Example backend URL

// --- Utility function for API calls ---
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

// --- Placeholder Components (to resolve import errors) ---
// const Sidebar = () => (
//     <div className="w-64 bg-gray-800 text-white p-4 flex flex-col items-center">
//         <div className="text-2xl font-bold mb-8">Admin Panel</div>
//         <nav className="space-y-4">
//             <a href="#" className="flex items-center text-gray-300 hover:text-white">Dashboard</a>
//             <a href="#" className="flex items-center text-gray-300 hover:text-white">Products</a>
//             <a href="#" className="flex items-center text-gray-300 hover:text-white">Orders</a>
//             <a href="#" className="flex items-center text-gray-300 hover:text-white">Customers</a>
//         </nav>
//   </div>
//   );


// const Header = () => (
//     <header className="bg-white shadow p-4 flex justify-between items-center w-full text-black">
//         <h1 className="text-xl font-semibold">Inventory Management</h1>
//         <div className="flex items-center gap-4">
//             <span>Welcome, Admin</span>
//             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//         </div>
//     </header>
// );

// Placeholder for grid icon (assuming it's a local asset, replaced with SVG data URL)
const gridIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='7' height='7' rx='1'%3E%3C/rect%3E%3Crect x='14' y='3' width='7' height='7' rx='1'%3E%3C/rect%3E%3Crect x='3' y='14' width='7' height='7' rx='1'%3E%3C/rect%3E%3Crect x='14' y='14' width='7' height='7' rx='1'%3E%3C/rect%3E%3C/svg%3E";

// Placeholder for product image (assuming it's a local asset, replaced with placeholder service)
const productImage = "/product_image.png";


export default function ProductGrid() {
  const [isGridView, setIsGridView] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all products from your backend API
      const productsData = await fetchData(`${API_BASE_URL}/products`);
      setProducts(productsData);
    } catch (err) {
      setError("Failed to fetch products: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Full Stock":
        return "text-green-600";
      case "Low Stock":
        return "text-yellow-500";
      case "Out of Stock":
        return "text-red-500";
      default:
        return "text-gray-600"; // Default for any unhandled status or empty string
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-900">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="flex h-screen text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="min-h-screen w-full bg-yellow-50 flex flex-col mt-8" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }} >
          <div className="flex items-center justify-between px-6 py-4 mt-8">
            <div className="text-left">
              <h1 className="text-xl font-semibold text-black">Products</h1>
              <p className="text-sm text-black/70">Detailed review on Products</p>
            </div>
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-1 px-3 py-1 transition ${
                  !isGridView
                    ? "text-black font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
                onClick={() => setIsGridView(false)}
              >
                <List size={18} />
                <span>List View</span>
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1 transition ${
                  isGridView
                    ? "text-black font-semibold"
                    : "text-black/60 hover:text-black hover:animate-shake"
                }`}
                onClick={() => setIsGridView(true)}
              >
                <img
                  src={gridIcon}
                  alt="Grid View"
                  className="w-6 h-6"
                />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          <main className="px-6 py-2 overflow-y-auto">
            {isGridView ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[99%] mx-auto">
                {products.map((product) => (
                  <div
                    key={product._id} // Use MongoDB _id as the unique key
                    className="rounded-2xl shadow-lg p-8 bg-white/70 backdrop-blur-md"
                  >
                    <div className="rounded-xl flex justify-center items-center mb-6 bg-gray-100 p-6 h-[500px]">
                      <img
                        src= {product.image || productImage}// Use product's image if available, else placeholder
                        // alt={product.title}
                        alt="cdjcndcdnc"
                        className="max-h-[400px] max-w-[80%] object-contain rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-black">
                          {product.title}
                        </h2>
                        <span className="text-lg font-semibold text-black">
                          ${product.price ? product.price.toFixed(2) : '0.00'} {/* Format price */}
                        </span>
                      </div>
                      <p className="text-base text-black/70 leading-snug">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="text-lg text-black/70 leading-snug">
                        SKU ID: {product.sku}
                      </div>
                      <div className="text-lg text-black/70 leading-snug">
                        Stock Qty: {product.stockQty}
                      </div>
                      <div className="text-lg text-black/70 leading-snug">
                        Status:{" "}
                        <span className={getStatusColor(product.status)}>
                          {product.status}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/productdetail/${product._id}`} // Link using MongoDB _id
                      className="text- text-gray-700 underline block mt-2"
                    >
                      View in detail
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="bg-white/80 shadow-lg rounded-xl overflow-x-auto p-4">
                <h2 className="text-lg font-semibold mb-4">Product List</h2>
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 rounded-lg">
                    <tr className="text-left text-sm text-gray-700">
                      <th className="px-4 py-2">Product Name</th>
                      <th className="px-4 py-2">SKU ID</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Stock Qty</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-black">
                    {products.map((product) => (
                      <tr
                        key={product._id} // Use MongoDB _id as the unique key
                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                      >
                        <td className="px-4 py-3">
                          <div className="font-semibold">{product.title}</div>
                          <div className="text-gray-500">{product.category}</div>
                        </td>
                        <td className="px-4 py-3">{product.sku}</td>
                        <td className="px-4 py-3">${product.price ? product.price.toFixed(2) : '0.00'}</td> {/* Format price */}
                        <td className="px-4 py-3">{product.description}</td>
                        <td className="px-4 py-3">{product.stockQty}</td>
                        <td
                          className={`px-4 py-3 font-semibold ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
