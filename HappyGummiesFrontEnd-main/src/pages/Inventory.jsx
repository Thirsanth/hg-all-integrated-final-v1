// import React, { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import {
//   BarChart3,
//   Package,
//   ShoppingCart,
//   Users,
//   Edit,
//   ChevronDown,
//   Bell,
//   User,
//   MoreHorizontal,
//   Edit3,
//   Trash2,
//   X // Added X icon for modal close button
// } from 'lucide-react';

// // Assume Header and Sidebar components are available in the specified path
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

// // Placeholder for Header and Sidebar components for standalone execution
// // In a real project, ensure these paths are correct or provided as separate files.

// // Chart.js data configuration
// const chartData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       label: 'Kids Candies',
//       data: [45, 35, 40, 55, 50, 65, 55, 40, 35, 60, 70, 65],
//       borderColor: '#10b981',
//       backgroundColor: 'rgba(16, 185, 129, 0.1)',
//       borderWidth: 2,
//       fill: false,
//       tension: 0,
//       pointBackgroundColor: '#10b981',
//       pointBorderColor: '#10b981',
//       pointRadius: 0,
//       pointHoverRadius: 6
//     },
//     {
//       label: 'Adult Candies',
//       data: [35, 30, 35, 45, 40, 75, 80, 45, 40, 50, 75, 70],
//       borderColor: '#ef4444',
//       backgroundColor: 'rgba(239, 68, 68, 0.1)',
//       borderWidth: 2,
//       borderDash: [5, 5],
//       fill: false,
//       tension: 0,
//       pointBackgroundColor: '#ef4444',
//       pointBorderColor: '#ef4444',
//       pointRadius: 0,
//       pointHoverRadius: 6
//     }
//   ]
// };

// // Chart.js options configuration
// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   animation: false, // Disable animations for performance/static display
//   animations: {
//     colors: false,
//     x: false,
//     y: false
//   },
//   transitions: {
//     active: {
//       animation: {
//         duration: 0
//       }
//     }
//   },
//   layout: {
//     padding: {
//       top: 10,
//       right: 10,
//       bottom: 10,
//       left: 10
//     }
//   },
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top',
//       align: 'center',
//       labels: {
//         usePointStyle: true,
//         boxWidth: 8,
//         boxHeight: 8,
//         color: '#4b5563',
//         font: {
//           size: 12
//         }
//       }
//     },
//     tooltip: {
//       enabled: true,
//       mode: 'index',
//       intersect: false,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       titleColor: '#ffffff',
//       bodyColor: '#ffffff',
//       borderColor: '#333333',
//       borderWidth: 1,
//       cornerRadius: 4,
//       padding: 10,
//       displayColors: true
//     }
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false
//       },
//       border: {
//         display: true
//       },
//       ticks: {
//         color: '#6b7280',
//         font: {
//           size: 12
//         },
//         padding: 5
//       }
//     },
//     y: {
//       grid: {
//         display: false,
//         color: '#e5e7eb',
//         drawBorder: true
//       },
//       ticks: {
//         color: '#6b7280',
//         font: {
//           size: 12
//         },
//         padding: 5
//       }
//     }
//   },
//   interaction: {
//     intersect: false,
//     mode: 'index'
//   },
//   hover: {
//     mode: 'nearest',
//     intersect: false
//   },
//   elements: {
//     point: {
//       hoverRadius: 6
//     }
//   }
// };

// const Inventory = () => {
//   const [graphDropdown, setGraphDropdown] = useState(false);
//   const [sortDropdown, setSortDropdown] = useState(false);
//   const [showEditStockAlertModal, setShowEditStockAlertModal] = useState(false); // State for modal visibility
//   const [selectedProduct, setSelectedProduct] = useState('Kids Candies'); // State for selected product in modal
//   const [stockQuantity, setStockQuantity] = useState(50); // State for stock quantity in modal
//   const [alertLevel, setAlertLevel] = useState('High'); // State for alert level in modal

//   const pieChartRef = useRef(null);
//   const lineChartRef = useRef(null);

//   // Effect for drawing the custom pie chart
//   useEffect(() => {
//     const canvas = pieChartRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const { width, height } = canvas;
//     const cx = width / 2, cy = height / 2, r = Math.min(cx, cy) - 5;
//     ctx.clearRect(0, 0, width, height);

//     const total = 1000;
//     const kids = 500,
//       adults = 300;
//     const kidsAngle = (kids / total) * 2 * Math.PI;
//     const adultsAngle = (adults / total) * 2 * Math.PI;

//     // Draw Kids Candies slice
//     ctx.beginPath();
//     ctx.moveTo(cx, cy);
//     ctx.arc(cx, cy, r, 0, kidsAngle);
//     ctx.closePath();
//     ctx.fillStyle = '#ffc107'; // Yellow
//     ctx.fill();

//     // Draw Adult Candies slice
//     ctx.beginPath();
//     ctx.moveTo(cx, cy);
//     ctx.arc(cx, cy, r, kidsAngle, kidsAngle + adultsAngle);
//     ctx.closePath();
//     ctx.fillStyle = '#007bff'; // Blue
//     ctx.fill();

//     // Draw Remaining Stock slice
//     ctx.beginPath();
//     ctx.moveTo(cx, cy);
//     ctx.arc(cx, cy, r, kidsAngle + adultsAngle, 2 * Math.PI);
//     ctx.closePath();
//     ctx.fillStyle = '#6c757d'; // Gray
//     ctx.fill();
//   }, []);

//   // Effect for initializing and destroying the Chart.js line chart
//   useEffect(() => {
//     if (!lineChartRef.current) return;

//     const ctx = lineChartRef.current.getContext('2d');
    
//     // Destroy existing chart instance before creating a new one
//     if (lineChartRef.current.chart) {
//       lineChartRef.current.chart.destroy();
//     }

//     const chart = new Chart(ctx, {
//       type: 'line',
//       data: chartData,
//       options: chartOptions
//     });

//     // Store chart instance on ref for later destruction
//     lineChartRef.current.chart = chart;

//     // Cleanup function: destroy chart on component unmount
//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, []);

//   // Dropdown component (moved inside Inventory for scope if it's not a global utility)
//   const Dropdown = ({ label, open, toggle, options }) => (
//     <div className="relative">
//       <button onClick={toggle} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 border rounded bg-white hover:bg-gray-50">
//         {label} <ChevronDown size={12} />
//       </button>
//       {open && (
//         <div className="absolute right-0 mt-1 bg-white border rounded shadow min-w-max z-10">
//           {options.map((o, index) => (
//             <div
//               key={o.label || index} 
//               className={`px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer`}
//               style={{ color: o.textColor || '#4b5563' }} 
//             >
//               {o.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   // Modal Component for editing stock alert
//   const EditStockAlertModal = ({ onClose, onUpdate, initialProduct, initialQuantity, initialAlert }) => {
//     const [product, setProduct] = useState(initialProduct);
//     const [quantity, setQuantity] = useState(initialQuantity);
//     const [alert, setAlert] = useState(initialAlert);

//     const products = ['Kids Candies', 'Adult Candies', 'Sour Worms', 'Gummy Bears'];
//     const alertLevels = ['High', 'Medium', 'Low'];

//     const handleUpdate = () => {
//       onUpdate({ product, quantity, alert });
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div 
//           className="bg-white rounded-3xl shadow-lg flex flex-col"
//           style={{ width: '485px', height: '525px' }}
//         >
//           {/* Modal Header */}
//           <div 
//             className="flex justify-between items-center border-b border-gray-200 p-4"
//             style={{ width: '485px', height: '72px', paddingTop: '16px', paddingRight: '40px', paddingBottom: '16px', paddingLeft: '40px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
//           >
//             <h2 className="text-xl font-bold text-gray-900">Edit Stock Alert</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div 
//             className="flex flex-col p-10 justify-between flex-grow"
//             style={{ width: '421px', minHeight: '309px', gap: '32px' }}
//           >
//             {/* Select Product */}
//             <div className="flex flex-col">
//               <label htmlFor="product-select" className="text-gray-700 text-sm font-medium mb-2">Select Product</label>
//               <div className="relative">
//                 <select
//                   id="product-select"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                 >
//                   {products.map((p) => (
//                     <option key={p} value={p}>{p}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <ChevronDown size={16} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Stock Quantity */}
//             <div className="flex flex-col">
//               <label htmlFor="stock-quantity" className="text-gray-700 text-sm font-medium mb-2">Stock Quantity</label>
//               <input
//                 type="number"
//                 id="stock-quantity"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </div>

//             {/* Alert Level */}
//             <div className="flex flex-col">
//               <label htmlFor="alert-level" className="text-gray-700 text-sm font-medium mb-2">Alert</label>
//               <div className="relative">
//                 <select
//                   id="alert-level"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={alert}
//                   onChange={(e) => setAlert(e.target.value)}
//                 >
//                   {alertLevels.map((level) => (
//                     <option key={level} value={level}>{level}</option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <ChevronDown size={16} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center gap-4 pt-4">
//               <button 
//                 onClick={handleUpdate} 
//                 className="bg-[#F2D002] text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
//                 style={{ width: '194.5px', height: '48px' }}
//               >
//                 Update
//               </button>
//               <button 
//                 onClick={onClose} 
//                 className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//                 style={{ width: '194.5px', height: '48px' }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };


//   return (
//     // Main container: flex column to stack Header and then the sidebar+content row
//     <div className="flex h-screen text-white"> 
//       <Sidebar/>
//       <div className="flex flex-col flex-1"  > 
//         <Header />
//         <div className="flex-1 overflow-auto" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}> 
//           <div className="p-6 ">
//             <div className="flex justify-between items-center mb-8 ">
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900 w-[310px] h-[25px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Order Details</h1>
//                 <p className="text-base font-normal text-gray-600 w-[310px] h-[20px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Detailed review on orders</p>
//               </div>
//               <button className="bg-[#F2D002] text-white px-4 py-2 rounded font-semibold hover:bg-yellow-500">
//                 Add Products
//               </button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-3 gap-6 mb-8">
//               {[
//                 { label: 'New orders', value: 1020 },
//                 { label: 'Orders In progress', value: 100 },
//                 { label: 'Low Stock', value: 120 }
//               ].map(({ label, value }) => (
//                 <div key={label} className="bg-white p-6 rounded-lg shadow-sm">
//                   <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
//                   <div className="text-3xl font-bold text-gray-900">{value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Charts Section */}
//             <div className="flex gap-6 mb-8">
//               {/* Pie Chart (Stock Level) */}
//               <div className="flex-[1.5] mb-1">
//                 <div className="bg-white rounded-lg shadow-sm h-96"> 
//                   <div className="p-5 border-b border-gray-200"> 
//                     <h3 className="text-base font-semibold text-gray-900">Stock Level</h3> 
//                   </div>
//                   <div className="p-5"> 
//                     <div className="flex justify-center mb-4"> 
//                       <canvas ref={pieChartRef} width={120} height={120} /> {/* Pie chart canvas */}
//                     </div>
//                     <div className="w-[91px] h-auto flex flex-col items-start gap-[5px]"> 
//                       <div className="text-xs text-gray-500">Total Stock</div>
//                       <div className="font-semibold text-gray-900 text-xl">500/1070</div>
//                     </div>
//                     <div className="mt-6 space-y-4">
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="flex items-center">
//                           <span className="font-medium text-[#000000]" >Kids Candies</span>
//                         </span>
//                         <span className="text-gray-600">500/600</span>
//                       </div>
//                       <div className="h-1.5 rounded bg-gray-200">
//                         <div
//                           className="h-1.5 rounded bg-yellow-400"
//                           style={{ width: `${(500 / 600) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="flex items-center">
//                           <span className="font-medium text-[#000000]" >Adult Candies</span>
//                         </span>
//                         <span className="text-gray-600">300/500</span>
//                       </div>
//                       <div className="h-1.5 rounded bg-gray-200">
//                         <div
//                           className="h-1.5 rounded bg-blue-600"
//                           style={{ width: `${(300 / 500) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Line Chart (Most Ordered Product) */}
//               <div className="flex-[3.5] bg-white p-5 rounded-lg shadow-sm h-96">
//                 <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
//                   <h3 className="text-base font-semibold text-gray-900">Most Ordered Product</h3>
//                   <Dropdown
//                     label="View all"
//                     open={graphDropdown}
//                     toggle={() => setGraphDropdown(!graphDropdown)}
//                     options={[
//                       { label: 'View all' },
//                       { label: 'Last 30 days' },
//                       { label: 'Last 90 days' },
//                       { label: 'Last year' }
//                     ]}
//                   />
//                 </div>
//                 <div className="relative pt-4" style={{ height: '240px' }}> 
//                   <canvas 
//                     ref={lineChartRef} 
//                     className="w-full h-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Tables Section */}
//             <div className="flex gap-6 mb-8"> 
//               {/* Stock Alert Table */}
//               <div className="flex-[2.5] bg-white rounded-lg shadow-sm overflow-hidden"> 
//                 <div className="flex justify-between items-center p-5 border-b">
//                   <h3 className="text-base font-semibold text-gray-900">Stock Alert</h3>
//                   <button 
//                     className="flex items-center bg-[#F2F2F2] text-[#929292] text-sm px-3 py-1.5 rounded-md hover:bg-gray-200"
//                     onClick={() => setShowEditStockAlertModal(true)} // Open modal on click
//                   >
//                     <Edit size={14} className="mr-1" /> Edit
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr className="bg-[#F2F2F2]">
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Product Name</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Stock Qty</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Alert</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white">
//                       {[
//                         { name: 'Kids Candies', group: 'Kids', qty: 50, level: 'High', color: 'text-[#DA0F0F]' },
//                         { name: 'Adult Candies', group: 'Adults', qty: 32, level: 'Low', color: 'text-[#35C11F]' }
//                       ].map((r) => (
//                         <tr key={r.name} className="border-t bg-white">
//                           <td className="p-3 bg-white text-[#929292]">
//                             <div>
//                               <div className="font-medium text-[#121212]">{r.name}</div>
//                               <div className="text-xs">{r.group}</div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-gray-900">{r.qty}</td>
//                           <td className="p-3">
//                             <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${r.color}`}>
//                               {r.level}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Product List Table */}
//               <div className="flex-[4.5] bg-white rounded-lg shadow-sm overflow-hidden"> 
//                 <div className="flex justify-between items-center p-5 border-b">
//                   <h3 className="text-base font-semibold text-gray-900">Product List</h3>
//                   <Dropdown
//                     label="Sort by"
//                     open={sortDropdown}
//                     toggle={() => setSortDropdown(!sortDropdown)}
//                     options={[
//                       { label: 'Full Stock', textColor: '#35C11F' },
//                       { label: 'Low Stock', textColor: '#DCBD02' },
//                       { label: 'Out of Stock', textColor: '#DA0F0F' }
//                     ]}
//                   />
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr className="bg-[#F2F2F2]">
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Name</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">SKU ID</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Stock Qty</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Status</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white">
//                       {[
//                         { name: 'Kids Candies', sku: '#5302002', qty: 50, status: 'Full Stock', color: 'text-[#35C11F]' },
//                         { name: 'Adult Candies', sku: '#5302003', qty: 32, status: 'Low Stock', color: 'text-[#DCBD02]' },
//                         { name: 'Sour Worms', sku: '#5302004', qty: 0, status: 'Out Of Stock', color: 'text-[#DA0F0F]' }
//                       ].map((r) => (
//                         <tr key={r.name} className="border-t bg-white">
//                           <td className="p-3 bg-white text-[#929292]">
//                             <div>
//                               <div className="font-medium text-[#121212]">{r.name}</div>
//                               <div className="text-xs">{r.name.split(' ')[0]}</div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-gray-900">{r.sku}</td>
//                           <td className="p-3 text-gray-900">{r.qty}</td>
//                           <td className="p-3">
//                             <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${r.color}`}>
//                               {r.status}
//                             </span>
//                           </td>
//                           <td className="p-3 flex gap-2">
//                             <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                             <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                             <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Inventory Log Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="p-5 border-b">
//                 <h3 className="text-base font-semibold text-gray-900">Inventory Log</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead> 
//                     <tr className="bg-[#F2F2F2]">
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Product Name</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">SKU ID</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Date</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Qty</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Action</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">By</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Control</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {[
//                       { name: 'Kids Candies', sku: 'GH392QI', date: '8 Apr 2025', qty: '+5', type: 'Added', by: 'Admin', color: 'text-green-600' },
//                       { name: 'Adult Candies', sku: 'KOS90IFGH', date: '28 Apr 2025', qty: '-10', type: 'Removed', by: 'Customer', color: 'text-red-600' },
//                       { name: 'Kids Candies', sku: 'GH392QI', date: '8 Apr 2025', qty: '+20', type: 'Added', by: 'Admin', color: 'text-green-600' },
//                       { name: 'Adult Candies', sku: 'KOS90IFGH', date: '28 Apr 2025', qty: '-6', type: 'Removed', by: 'Customer', color: 'text-red-600' },
//                       { name: 'Adult Candies', sku: 'KOS90IFGH', date: '28 Apr 2025', qty: '-8', type: 'Removed', by: 'Customer', color: 'text-red-600' },
//                     ].map((r, idx) => (
//                       <tr key={idx} className="border-t bg-white">
//                         <td className="p-3 bg-white text-[#929292]">
//                           <div>
//                             <div className="font-medium text-[#121212]">{r.name}</div>
//                             <div className="text-xs">{r.name.split(' ')[0]}</div>
//                           </div>
//                         </td>
//                         <td className="p-3 bg-white text-gray-900">{r.sku}</td>
//                         <td className="p-3 bg-white text-gray-900">{r.date}</td>
//                         <td className={`p-3 bg-white  ${r.color}`}>{r.qty}</td>
//                         <td className="p-3 bg-white text-gray-900">{r.type}</td>
//                         <td className="p-3 bg-white text-gray-900">{r.by}</td>
//                         <td className="p-3 bg-white flex gap-2">
//                           <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Render the modal if showEditStockAlertModal is true */}
//       {showEditStockAlertModal && (
//         <EditStockAlertModal 
//           onClose={() => setShowEditStockAlertModal(false)} 
//           onUpdate={(data) => {
//             console.log('Updated Stock Alert:', data);
//             // Here you would typically send data to a backend or update global state
//           }}
//           initialProduct={selectedProduct} // Pass initial values from state or props if dynamic
//           initialQuantity={stockQuantity}
//           initialAlert={alertLevel}
//         />
//       )}
//     </div>
//   );
// };

// export default Inventory;


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Chart from 'chart.js/auto';
// import {
//   BarChart3,
//   Package,
//   ShoppingCart,
//   Users,
//   Edit,
//   ChevronDown,
//   Bell,
//   User,
//   MoreHorizontal,
//   Edit3,
//   Trash2,
//   X
// } from 'lucide-react';

// // --- Placeholder Components for Header and Sidebar (to ensure self-contained compilation) ---
// // In a real application, you would import these from their actual paths:
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

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

// // Re-initialize chartDataTemplate each time to ensure it's clean for dynamic dataset additions
// const getChartDataTemplate = () => ({
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [] // Start with an empty array, will be populated dynamically
// });

// // Chart.js options configuration
// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   animation: false,
//   animations: { colors: false, x: false, y: false },
//   transitions: { active: { animation: { duration: 0 } } },
//   layout: { padding: { top: 10, right: 10, bottom: 10, left: 10 } },
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top',
//       align: 'center',
//       labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, color: '#4b5563', font: { size: 12 } }
//     },
//     tooltip: {
//       enabled: true, mode: 'index', intersect: false, backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       titleColor: '#ffffff', bodyColor: '#ffffff', borderColor: '#333333',
//       borderWidth: 1, cornerRadius: 4, padding: 10, displayColors: true
//     }
//   },
//   scales: {
//     x: {
//       grid: { display: false }, border: { display: true },
//       ticks: { color: '#6b7280', font: { size: 12 }, padding: 5 }
//     },
//     y: {
//       grid: { display: false, color: '#e5e7eb', drawBorder: true },
//       ticks: { color: '#6b7280', font: { size: 12 }, padding: 5 }
//     }
//   },
//   interaction: { intersect: false, mode: 'index' },
//   hover: { mode: 'nearest', intersect: false },
//   elements: { point: { hoverRadius: 6 } }
// };

// const Dropdown = ({ label, open, toggle, options, onSelect }) => (
//   <div className="relative">
//     <button onClick={toggle} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 border rounded bg-white hover:bg-gray-50">
//       {label} <ChevronDown size={12} />
//     </button>
//     {open && (
//       <div className="absolute right-0 mt-1 bg-white border rounded shadow min-w-max z-10">
//         {options.map((o, index) => (
//           <div
//             key={o.label || index}
//             className={`px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer`}
//             style={{ color: o.textColor || '#4b5563' }}
//             onClick={() => { onSelect(o); toggle(); }}
//           >
//             {o.label}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// const EditStockAlertModal = ({ onClose, onUpdate, initialProduct, initialQuantity, initialAlert }) => {
//   const [product, setProduct] = useState(initialProduct);
//   const [quantity, setQuantity] = useState(initialQuantity);
//   const [alert, setAlert] = useState(initialAlert);

//   const products = ['Kids Candies', 'Adult Candies', 'Sour Worms', 'Gummy Bears'];
//   const alertLevels = ['High', 'Medium', 'Low'];

//   const handleUpdate = () => {
//     onUpdate({ product, quantity, alert });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div
//         className="bg-white rounded-3xl shadow-lg flex flex-col"
//         style={{ width: '485px', height: '525px' }}
//       >
//         <div
//           className="flex justify-between items-center border-b border-gray-200 p-4"
//           style={{ width: '485px', height: '72px', paddingTop: '16px', paddingRight: '40px', paddingBottom: '16px', paddingLeft: '40px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
//         >
//           <h2 className="text-xl font-bold text-gray-900">Edit Stock Alert</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X size={24} />
//           </button>
//         </div>

//         <div
//           className="flex flex-col p-10 justify-between flex-grow"
//           style={{ width: '421px', minHeight: '309px', gap: '32px' }}
//         >
//           <div className="flex flex-col">
//             <label htmlFor="product-select" className="text-gray-700 text-sm font-medium mb-2">Select Product</label>
//             <div className="relative">
//               <select
//                 id="product-select"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//               >
//                 {products.map((p) => (
//                   <option key={p} value={p}>{p}</option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDown size={16} className="text-gray-400" />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="stock-quantity" className="text-gray-700 text-sm font-medium mb-2">Stock Quantity</label>
//             <input
//               type="number"
//               id="stock-quantity"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="alert-level" className="text-gray-700 text-sm font-medium mb-2">Alert</label>
//             <div className="relative">
//               <select
//                 id="alert-level"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={alert}
//                 onChange={(e) => setAlert(e.target.value)}
//               >
//                 {alertLevels.map((level) => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDown size={16} className="text-gray-400" />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center gap-4 pt-4">
//             <button
//               onClick={handleUpdate}
//               className="bg-[#F2D002] text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
//               style={{ width: '194.5px', height: '48px' }}
//             >
//               Update
//             </button>
//             <button
//               onClick={onClose}
//               className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//               style={{ width: '194.5px', height: '48px' }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Inventory = () => {
//   const [graphDropdown, setGraphDropdown] = useState(false);
//   const [sortDropdown, setSortDropdown] = useState(false);
//   const [showEditStockAlertModal, setShowEditStockAlertModal] = useState(false);
//   const [selectedProductForAlert, setSelectedProductForAlert] = useState('Kids Candies');
//   const [stockQuantityForAlert, setStockQuantityForAlert] = useState(50);
//   const [alertLevelForAlert, setAlertLevelForAlert] = useState('High');

//   // State for fetched data
//   const [products, setProducts] = useState([]);
//   const [inventoryLogs, setInventoryLogs] = useState([]);
//   const [orders, setOrders] = useState([]); // New state for orders
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const pieChartRef = useRef(null);
//   const lineChartRef = useRef(null);
//   const lineChartInstance = useRef(null); // To hold the Chart.js instance

//   // Fetch data from backend
//   const fetchInventoryData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     let ordersData = []; // Declare ordersData here to make it accessible outside the try block
//     try {
//       // Fetch products
//       const productsData = await fetchData(`${API_BASE_URL}/products`);
//       setProducts(productsData);

//       // Fetch inventory logs
//       const logsData = await fetchData(`${API_BASE_URL}/inventory-logs`);
//       setInventoryLogs(logsData);

//       // Fetch orders
//       try {
//         const res = await fetch(`${API_BASE_URL}/orders`);
//         if (!res.ok) throw new Error("Orders fetch failed");
//         ordersData = await res.json(); // Assign to the declared variable
//         setOrders(ordersData);
//       } catch (err) {
//         setError("Failed to fetch orders: " + err.message);
//         console.error(err);
//       }


//       // --- Aggregation for Most Ordered Product Chart ---
//       const newChartData = getChartDataTemplate(); // Get a fresh template
//       const monthlyProductSales = {}; // Stores sales count for each product per month

//       // Aggregate sales data from orders
//       // Now ordersData is defined and accessible here
//       ordersData.forEach(order => {
//         const orderDate = new Date(order.create_time);
//         const orderMonth = orderDate.getMonth(); // 0-11
        
//         order.products.forEach(item => {
//           if (!monthlyProductSales[item.name]) {
//             monthlyProductSales[item.name] = new Array(12).fill(0);
//           }
//           monthlyProductSales[item.name][orderMonth] += item.quantity;
//         });
//       });

//       // Populate datasets based on aggregated sales
//       Object.keys(monthlyProductSales).forEach(productName => {
//         // Generate a consistent color for each product if possible, or random
//         const existingDatasetIndex = newChartData.datasets.findIndex(ds => ds.label === productName);
//         const color = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color for new datasets

//         if (existingDatasetIndex === -1) {
//           newChartData.datasets.push({
//             label: productName,
//             data: monthlyProductSales[productName],
//             borderColor: color,
//             backgroundColor: `rgba(${parseInt(color.substring(1,3), 16)},${parseInt(color.substring(3,5), 16)},${parseInt(color.substring(5,7), 16)}, 0.1)`,
//             borderWidth: 2,
//             fill: false,
//             tension: 0,
//             pointBackgroundColor: color,
//             pointBorderColor: color,
//             pointRadius: 0,
//             pointHoverRadius: 6
//           });
//         } else {
//             newChartData.datasets[existingDatasetIndex].data = monthlyProductSales[productName];
//         }
//       });


//       if (lineChartInstance.current) {
//         lineChartInstance.current.data = newChartData;
//         lineChartInstance.current.update();
//       } else {
//         lineChartRef.current.chartData = newChartData;
//       }

//     } catch (err) {
//       setError("Failed to fetch inventory data: " + err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchInventoryData();
//   }, [fetchInventoryData]);

//   // Effect for drawing the custom pie chart
//   useEffect(() => {
//     const canvas = pieChartRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const { width, height } = canvas;
//     const cx = width / 2, cy = height / 2, r = Math.min(cx, cy) - 5;
//     ctx.clearRect(0, 0, width, height);

//     // Calculate total stock and individual product stock from fetched data
//     const totalStock = products.reduce((sum, p) => sum + p.stockQty, 0);
//     const kidsCandiesStock = products.find(p => p.title === 'Kids Candies')?.stockQty || 0;
//     const adultCandiesStock = products.find(p => p.title === 'Adult Candies')?.stockQty || 0;
//     const otherStock = totalStock - kidsCandiesStock - adultCandiesStock;

//     // Ensure total is not zero to avoid division by zero
//     const effectiveTotal = totalStock > 0 ? totalStock : 1;

//     const kidsAngle = (kidsCandiesStock / effectiveTotal) * 2 * Math.PI;
//     const adultsAngle = (adultCandiesStock / effectiveTotal) * 2 * Math.PI;
//     const remainingAngle = (otherStock / effectiveTotal) * 2 * Math.PI;

//     let startAngle = 0;

//     // Draw Kids Candies slice
//     if (kidsCandiesStock > 0) {
//       ctx.beginPath();
//       ctx.moveTo(cx, cy);
//       ctx.arc(cx, cy, r, startAngle, startAngle + kidsAngle);
//       ctx.closePath();
//       ctx.fillStyle = '#ffc107'; // Yellow
//       ctx.fill();
//       startAngle += kidsAngle;
//     }

//     // Draw Adult Candies slice
//     if (adultCandiesStock > 0) {
//       ctx.beginPath();
//       ctx.moveTo(cx, cy);
//       ctx.arc(cx, cy, r, startAngle, startAngle + adultsAngle);
//       ctx.closePath();
//       ctx.fillStyle = '#007bff'; // Blue
//       ctx.fill();
//       startAngle += adultsAngle;
//     }

//     // Draw Remaining Stock slice
//     if (otherStock > 0) {
//       ctx.beginPath();
//       ctx.moveTo(cx, cy);
//       ctx.arc(cx, cy, r, startAngle, startAngle + remainingAngle);
//       ctx.closePath();
//       ctx.fillStyle = '#6c757d'; // Gray
//       ctx.fill();
//     }
//   }, [products]);

//   // Effect for initializing and destroying the Chart.js line chart
//   useEffect(() => {
//     if (!lineChartRef.current) return;

//     const ctx = lineChartRef.current.getContext('2d');

//     if (lineChartInstance.current) {
//       lineChartInstance.current.destroy();
//     }

//     const dataToUse = lineChartRef.current.chartData || getChartDataTemplate();

//     const chart = new Chart(ctx, {
//       type: 'line',
//       data: dataToUse,
//       options: chartOptions
//     });

//     lineChartInstance.current = chart;

//     return () => {
//       if (lineChartInstance.current) {
//         lineChartInstance.current.destroy();
//         lineChartInstance.current = null;
//       }
//     };
//   }, []);

//   const handleStockAlertUpdate = async ({ product, quantity, alert }) => {
//     try {
//       const productToUpdate = products.find(p => p.title === product);
//       if (!productToUpdate) {
//         console.error("Product not found for alert update:", product);
//         return;
//       }

//       const newStatus = quantity <= 0 ? 'Out of Stock' : (quantity < 50 ? 'Low Stock' : 'Full Stock');
//       await fetchData(`${API_BASE_URL}/products/${productToUpdate._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ stockQty: quantity, status: newStatus })
//       });

//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: productToUpdate._id,
//           productName: productToUpdate.title,
//           sku: productToUpdate.sku,
//           quantityChange: quantity - productToUpdate.stockQty,
//           actionType: 'Updated',
//           by: 'Admin',
//           description: `Stock alert updated to ${quantity}, level: ${alert}`
//         })
//       });

//       fetchInventoryData();
//     } catch (err) {
//       setError("Failed to update stock alert: " + err.message);
//     }
//   };

//   const handleAddProduct = async () => {
//     const newProduct = {
//       title: "New Gummy Bears",
//       category: "Kids",
//       price: 25.00,
//       sku: "NGB" + Math.floor(Math.random() * 10000),
//       description: "Delicious new gummy bears.",
//       stockQty: 200,
//       status: "Full Stock",
//       image: "/product_image.png",
//       tags: ["#Kids", "#Gummies"]
//     };
//     try {
//       await fetchData(`${API_BASE_URL}/products`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct)
//       });
//       fetchInventoryData();
//     } catch (err) {
//       setError("Failed to add product: " + err.message);
//     }
//   };

//   const handleProductDelete = async (productId, productName, sku) => {
//     try {
//       await fetchData(`${API_BASE_URL}/products/${productId}`, { method: 'DELETE' });

//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: productId,
//           productName: productName,
//           sku: sku,
//           quantityChange: 0,
//           actionType: 'Removed',
//           by: 'Admin',
//           description: `Product deleted from inventory`
//         })
//       });
//       fetchInventoryData();
//     } catch (err) {
//       setError("Failed to delete product: " + err.message);
//     }
//   };

//   const handleProductEdit = async (productId, updatedFields) => {
//     try {
//       await fetchData(`${API_BASE_URL}/products/${productId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedFields)
//       });
//       await fetchData(`${API_BASE_URL}/inventory-logs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: productId,
//           productName: updatedFields.title || products.find(p => p._id === productId)?.title,
//           sku: updatedFields.sku || products.find(p => p._id === productId)?.sku,
//           quantityChange: 0,
//           actionType: 'Updated',
//           by: 'Admin',
//           description: `Product details updated`
//         })
//       });
//       fetchInventoryData();
//     } catch (err) {
//       setError("Failed to edit product: " + err.message);
//     }
//   };


//   if (loading) return <div className="text-center p-8 text-gray-900">Loading inventory data...</div>;
//   if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

//   const totalCurrentStock = products.reduce((sum, p) => sum + p.stockQty, 0);

//   const stockAlertProducts = products.filter(p => p.stockQty < 50);

//   return (
//     <div className="flex h-screen text-white">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <div className="flex-1 overflow-auto" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-8">
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900 w-[310px] h-[25px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Order Details</h1>
//                 <p className="text-base font-normal text-gray-600 w-[310px] h-[20px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Detailed review on orders</p>
//               </div>
//               <button
//                 className="bg-[#F2D002] text-white px-4 py-2 rounded font-semibold hover:bg-yellow-500"
//                 onClick={handleAddProduct}
//               >
//                 Add Products
//               </button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-3 gap-6 mb-8">
//               {[
//                 { label: 'New orders', value: orders.filter(o => o.orderStatus === 'pending').length },
//                 { label: 'Orders In progress', value: orders.filter(o => o.orderStatus === 'processing').length },
//                 { label: 'Low Stock', value: products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').length }
//               ].map(({ label, value }) => (
//                 <div key={label} className="bg-white p-6 rounded-lg shadow-sm">
//                   <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
//                   <div className="text-3xl font-bold text-gray-900">{value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Charts Section */}
//             <div className="flex gap-6 mb-8">
//               {/* Pie Chart (Stock Level) */}
//               <div className="flex-[1.5] mb-1">
//                 <div className="bg-white rounded-lg shadow-sm h-96">
//                   <div className="p-5 border-b border-gray-200">
//                     <h3 className="text-base font-semibold text-gray-900">Stock Level</h3>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex justify-center mb-4">
//                       <canvas ref={pieChartRef} width={120} height={120} />
//                     </div>
//                     <div className="w-[91px] h-auto flex flex-col items-start gap-[5px]">
//                       <div className="text-xs text-gray-500">Total Stock</div>
//                       <div className="font-semibold text-gray-900 text-xl">{totalCurrentStock}/{products.length > 0 ? products.reduce((sum, p) => sum + p.stockQty, 0) + 500 : 1070}</div>
//                     </div>
//                     <div className="mt-6 space-y-4">
//                       {products.map(p => (
//                         <div key={p._id}>
//                           <div className="flex justify-between text-sm mb-1">
//                             <span className="flex items-center">
//                               <span className="font-medium text-[#000000]">{p.title}</span>
//                             </span>
//                             <span className="text-gray-600">{p.stockQty}/{p.stockQty + 100}</span>
//                           </div>
//                           <div className="h-1.5 rounded bg-gray-200">
//                             <div
//                               className={`h-1.5 rounded ${p.category === 'Kids' ? 'bg-yellow-400' : 'bg-blue-600'}`}
//                               style={{ width: `${(p.stockQty / (p.stockQty + 100)) * 100}%` }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Line Chart (Most Ordered Product) */}
//               <div className="flex-[3.5] bg-white p-5 rounded-lg shadow-sm h-96">
//                 <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
//                   <h3 className="text-base font-semibold text-gray-900">Most Ordered Product</h3>
//                   <Dropdown
//                     label="View all"
//                     open={graphDropdown}
//                     toggle={() => setGraphDropdown(!graphDropdown)}
//                     options={[
//                       { label: 'View all' },
//                       { label: 'Last 30 days' },
//                       { label: 'Last 90 days' },
//                       { label: 'Last year' }
//                     ]}
//                     onSelect={() => {}}
//                   />
//                 </div>
//                 <div className="relative pt-4" style={{ height: '240px' }}>
//                   <canvas
//                     ref={lineChartRef}
//                     className="w-full h-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Tables Section */}
//             <div className="flex gap-6 mb-8">
//               {/* Stock Alert Table */}
//               <div className="flex-[2.5] bg-white rounded-lg shadow-sm overflow-hidden">
//                 <div className="flex justify-between items-center p-5 border-b">
//                   <h3 className="text-base font-semibold text-gray-900">Stock Alert</h3>
//                   <button
//                     className="flex items-center bg-[#F2F2F2] text-[#929292] text-sm px-3 py-1.5 rounded-md hover:bg-gray-200"
//                     onClick={() => setShowEditStockAlertModal(true)}
//                   >
//                     <Edit size={14} className="mr-1" /> Edit
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr className="bg-[#F2F2F2]">
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Product Name</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Stock Qty</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Alert</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white">
//                       {stockAlertProducts.map((p) => (
//                         <tr key={p._id} className="border-t bg-white">
//                           <td className="p-3 bg-white text-[#929292]">
//                             <div>
//                               <div className="font-medium text-[#121212]">{p.title}</div>
//                               <div className="text-xs">{p.category}</div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-gray-900">{p.stockQty}</td>
//                           <td className="p-3">
//                             <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${p.status === 'Out of Stock' ? 'text-[#DA0F0F]' : 'text-[#DCBD02]'}`}>
//                               {p.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Product List Table */}
//               <div className="flex-[4.5] bg-white rounded-lg shadow-sm overflow-hidden">
//                 <div className="flex justify-between items-center p-5 border-b">
//                   <h3 className="text-base font-semibold text-gray-900">Product List</h3>
//                   <Dropdown
//                     label="Sort by"
//                     open={sortDropdown}
//                     toggle={() => setSortDropdown(!sortDropdown)}
//                     options={[
//                       { label: 'Full Stock', textColor: '#35C11F' },
//                       { label: 'Low Stock', textColor: '#DCBD02' },
//                       { label: 'Out of Stock', textColor: '#DA0F0F' }
//                     ]}
//                     onSelect={(option) => {
//                       const sortedProducts = [...products].sort((a, b) => {
//                         if (option.label === 'Full Stock') return b.stockQty - a.stockQty;
//                         if (option.label === 'Low Stock') return a.stockQty - b.stockQty;
//                         return 0;
//                       });
//                       setProducts(sortedProducts);
//                     }}
//                   />
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr className="bg-[#F2F2F2]">
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Name</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">SKU ID</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Stock Qty</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Status</th>
//                         <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white">
//                       {products.map((p) => (
//                         <tr key={p._id} className="border-t bg-white">
//                           <td className="p-3 bg-white text-[#929292]">
//                             <div>
//                               <div className="font-medium text-[#121212]">{p.title}</div>
//                               <div className="text-xs">{p.category}</div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-gray-900">{p.sku}</td>
//                           <td className="p-3 text-gray-900">{p.stockQty}</td>
//                           <td className="p-3">
//                             <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
//                               p.status === 'Full Stock' ? 'text-[#35C11F]' :
//                               p.status === 'Low Stock' ? 'text-[#DCBD02]' :
//                               'text-[#DA0F0F]'
//                             }`}>
//                               {p.status}
//                             </span>
//                           </td>
//                           <td className="p-3 flex gap-2">
//                             <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => handleProductEdit(p._id, { title: 'Updated ' + p.title })} />
//                             <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => handleProductDelete(p._id, p.title, p.sku)} />
//                             <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Inventory Log Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="p-5 border-b">
//                 <h3 className="text-base font-semibold text-gray-900">Inventory Log</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-[#F2F2F2]">
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Product Name</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">SKU ID</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Date</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Qty</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Action</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">By</th>
//                       <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292]  tracking-wider">Control</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {inventoryLogs.map((log) => (
//                       <tr key={log._id} className="border-t bg-white">
//                         <td className="p-3 bg-white text-[#929292]">
//                           <div>
//                             <div className="font-medium text-[#121212]">{log.productName}</div>
//                             <div className="text-xs">{log.category}</div>
//                           </div>
//                         </td>
//                         <td className="p-3 bg-white text-gray-900">{log.sku}</td>
//                         <td className="p-3 bg-white text-gray-900">{new Date(log.date).toLocaleDateString()}</td>
//                         <td className={`p-3 bg-white  ${log.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>{log.quantityChange > 0 ? '+' : ''}{log.quantityChange}</td>
//                         <td className="p-3 bg-white text-gray-900">{log.actionType}</td>
//                         <td className="p-3 bg-white text-gray-900">{log.by}</td>
//                         <td className="p-3 bg-white flex gap-2">
//                           <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                           <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showEditStockAlertModal && (
//         <EditStockAlertModal
//           onClose={() => setShowEditStockAlertModal(false)}
//           onUpdate={handleStockAlertUpdate}
//           initialProduct={selectedProductForAlert}
//           initialQuantity={stockQuantityForAlert}
//           initialAlert={alertLevelForAlert}
//         />
//       )}
//     </div>
//   );
// };

// export default Inventory;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Edit,
  ChevronDown,
  Bell,
  User,
  MoreHorizontal,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

// --- Placeholder Components for Header and Sidebar (to ensure self-contained compilation) ---
// In a real application, you would import these from their actual paths:
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = 'https://hg-admin-backend.onrender.com/api';

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

// Re-initialize chartDataTemplate each time to ensure it's clean for dynamic dataset additions
const getChartDataTemplate = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [] // Start with an empty array, will be populated dynamically
});

// Chart.js options configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  animations: { colors: false, x: false, y: false },
  transitions: { active: { animation: { duration: 0 } } },
  layout: { padding: { top: 10, right: 10, bottom: 10, left: 10 } },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'center',
      labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, color: '#4b5563', font: { size: 12 } }
    },
    tooltip: {
      enabled: true, mode: 'index', intersect: false, backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#ffffff', bodyColor: '#ffffff', borderColor: '#333333',
      borderWidth: 1, cornerRadius: 4, padding: 10, displayColors: true
    }
  },
  scales: {
    x: {
      grid: { display: false }, border: { display: true },
      ticks: { color: '#6b7280', font: { size: 12 }, padding: 5 }
    },
    y: {
      grid: { display: false, color: '#e5e7eb', drawBorder: true },
      ticks: { color: '#6b7280', font: { size: 12 }, padding: 5 }
    }
  },
  interaction: { intersect: false, mode: 'index' },
  hover: { mode: 'nearest', intersect: false },
  elements: { point: { hoverRadius: 6 } }
};

const Dropdown = ({ label, open, toggle, options, onSelect }) => (
  <div className="relative">
    <button onClick={toggle} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 border rounded bg-white hover:bg-gray-50">
      {label} <ChevronDown size={12} />
    </button>
    {open && (
      <div className="absolute right-0 mt-1 bg-white border rounded shadow min-w-max z-10">
        {options.map((o, index) => (
          <div
            key={o.label || index}
            className={`px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer`}
            style={{ color: o.textColor || '#4b5563' }}
            onClick={() => { onSelect(o); toggle(); }}
          >
            {o.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

const EditStockAlertModal = ({ onClose, onUpdate, initialProduct, initialQuantity, initialAlert }) => {
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [alert, setAlert] = useState(initialAlert);

  const products = ['Kids Candies', 'Adult Candies', 'Sour Worms', 'Gummy Bears'];
  const alertLevels = ['High', 'Medium', 'Low'];

  const handleUpdate = () => {
    onUpdate({ product, quantity, alert });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl shadow-lg flex flex-col"
        style={{ width: '485px', height: '525px' }}
      >
        <div
          className="flex justify-between items-center border-b border-gray-200 p-4"
          style={{ width: '485px', height: '72px', paddingTop: '16px', paddingRight: '40px', paddingBottom: '16px', paddingLeft: '40px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
        >
          <h2 className="text-xl font-bold text-gray-900">Edit Stock Alert</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div
          className="flex flex-col p-10 justify-between flex-grow"
          style={{ width: '421px', minHeight: '309px', gap: '32px' }}
        >
          <div className="flex flex-col">
            <label htmlFor="product-select" className="text-gray-700 text-sm font-medium mb-2">Select Product</label>
            <div className="relative">
              <select
                id="product-select"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="stock-quantity" className="text-gray-700 text-sm font-medium mb-2">Stock Quantity</label>
            <input
              type="number"
              id="stock-quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="alert-level" className="text-gray-700 text-sm font-medium mb-2">Alert</label>
            <div className="relative">
              <select
                id="alert-level"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 appearance-none bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={alert}
                onChange={(e) => setAlert(e.target.value)}
              >
                {alertLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleUpdate}
              className="bg-[#F2D002] text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              style={{ width: '194.5px', height: '48px' }}
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              style={{ width: '194.5px', height: '48px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Inventory = () => {
  const [graphDropdown, setGraphDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [showEditStockAlertModal, setShowEditStockAlertModal] = useState(false);
  const [selectedProductForAlert, setSelectedProductForAlert] = useState('Kids Candies');
  const [stockQuantityForAlert, setStockQuantityForAlert] = useState(50);
  const [alertLevelForAlert, setAlertLevelForAlert] = useState('High');

  // State for fetched data
  const [products, setProducts] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [orders, setOrders] = useState([]); // New state for orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const lineChartInstance = useRef(null); // To hold the Chart.js instance

  // State to hold the data for the line chart, updated by fetchInventoryData
  const [lineChartData, setLineChartData] = useState(getChartDataTemplate());


  // Fetch data from backend
  const fetchInventoryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let ordersData = []; // Declare ordersData here to make it accessible outside the try block
    try {
      // Fetch products
      const productsData = await fetchData(`${API_BASE_URL}/products`);
      setProducts(productsData);

      // Fetch inventory logs
      const logsData = await fetchData(`${API_BASE_URL}/inventory-logs`);
      setInventoryLogs(logsData);

      // Fetch orders
      try {
        const res = await fetch(`${API_BASE_URL}/orders`);
        if (!res.ok) throw new Error("Orders fetch failed");
        ordersData = await res.json(); // Assign to the declared variable
        setOrders(ordersData);
      } catch (err) {
        setError("Failed to fetch orders: " + err.message);
        console.error(err);
      }


      // --- Aggregation for Most Ordered Product Chart ---
      const newChartData = getChartDataTemplate(); // Get a fresh template
      const monthlyProductSales = {}; // Stores sales count for each product per month

      // Aggregate sales data from orders
      // Now ordersData is defined and accessible here
      ordersData.forEach(order => {
        const orderDate = new Date(order.create_time);
        const orderMonth = orderDate.getMonth(); // 0-11
        
        order.products.forEach(item => {
          if (!monthlyProductSales[item.name]) {
            monthlyProductSales[item.name] = new Array(12).fill(0);
          }
          monthlyProductSales[item.name][orderMonth] += item.quantity;
        });
      });

      // Populate datasets based on aggregated sales
      Object.keys(monthlyProductSales).forEach(productName => {
        // Generate a consistent color for each product if possible, or random
        const existingDatasetIndex = newChartData.datasets.findIndex(ds => ds.label === productName);
        const color = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color for new datasets

        if (existingDatasetIndex === -1) {
          newChartData.datasets.push({
            label: productName,
            data: monthlyProductSales[productName],
            borderColor: color,
            backgroundColor: `rgba(${parseInt(color.substring(1,3), 16)},${parseInt(color.substring(3,5), 16)},${parseInt(color.substring(5,7), 16)}, 0.1)`,
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointBackgroundColor: color,
            pointBorderColor: color,
            pointRadius: 0,
            pointHoverRadius: 6
          });
        } else {
            newChartData.datasets[existingDatasetIndex].data = monthlyProductSales[productName];
        }
      });

      // Update the state for lineChartData
      setLineChartData(newChartData);

    } catch (err) {
      setError("Failed to fetch inventory data: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  // Effect for drawing the custom pie chart
  useEffect(() => {
    const canvas = pieChartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const cx = width / 2, cy = height / 2, r = Math.min(cx, cy) - 5;
    ctx.clearRect(0, 0, width, height);

    // Calculate total stock and individual product stock from fetched data
    const totalStock = products.reduce((sum, p) => sum + p.stockQty, 0);
    const kidsCandiesStock = products.find(p => p.title === 'Kids Candies')?.stockQty || 0;
    const adultCandiesStock = products.find(p => p.title === 'Adult Candies')?.stockQty || 0;
    const otherStock = totalStock - kidsCandiesStock - adultCandiesStock;

    // Ensure total is not zero to avoid division by zero
    const effectiveTotal = totalStock > 0 ? totalStock : 1;

    const kidsAngle = (kidsCandiesStock / effectiveTotal) * 2 * Math.PI;
    const adultsAngle = (adultCandiesStock / effectiveTotal) * 2 * Math.PI;
    const remainingAngle = (otherStock / effectiveTotal) * 2 * Math.PI;

    let startAngle = 0;

    // Draw Kids Candies slice
    if (kidsCandiesStock > 0) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + kidsAngle);
      ctx.closePath();
      ctx.fillStyle = '#ffc107'; // Yellow
      ctx.fill();
      startAngle += kidsAngle;
    }

    // Draw Adult Candies slice
    if (adultCandiesStock > 0) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + adultsAngle);
      ctx.closePath();
      ctx.fillStyle = '#007bff'; // Blue
      ctx.fill();
      startAngle += adultsAngle;
    }

    // Draw Remaining Stock slice
    if (otherStock > 0) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + remainingAngle);
      ctx.closePath();
      ctx.fillStyle = '#6c757d'; // Gray
      ctx.fill();
    }
  }, [products]);

  // Effect for initializing and destroying the Chart.js line chart
  // This useEffect now depends on lineChartData to re-render the chart when data changes
  useEffect(() => {
    if (!lineChartRef.current) return;

    const ctx = lineChartRef.current.getContext('2d');

    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    // Use the lineChartData from state
    const chart = new Chart(ctx, {
      type: 'line',
      data: lineChartData, // Use the state variable here
      options: chartOptions
    });

    lineChartInstance.current = chart;

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
        lineChartInstance.current = null;
      }
    };
  }, [lineChartData]); // Add lineChartData as a dependency

  const handleStockAlertUpdate = async ({ product, quantity, alert }) => {
    try {
      const productToUpdate = products.find(p => p.title === product);
      if (!productToUpdate) {
        console.error("Product not found for alert update:", product);
        return;
      }

      const newStatus = quantity <= 0 ? 'Out of Stock' : (quantity < 50 ? 'Low Stock' : 'Full Stock');
      await fetchData(`${API_BASE_URL}/products/${productToUpdate._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQty: quantity, status: newStatus })
      });

      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productToUpdate._id,
          productName: productToUpdate.title,
          sku: productToUpdate.sku,
          quantityChange: quantity - productToUpdate.stockQty,
          actionType: 'Updated',
          by: 'Admin',
          description: `Stock alert updated to ${quantity}, level: ${alert}`
        })
      });

      fetchInventoryData();
    } catch (err) {
      setError("Failed to update stock alert: " + err.message);
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      title: "New Gummy Bears",
      category: "Kids",
      price: 25.00,
      sku: "NGB" + Math.floor(Math.random() * 10000),
      description: "Delicious new gummy bears.",
      stockQty: 200,
      status: "Full Stock",
      image: "/product_image.png",
      tags: ["#Kids", "#Gummies"]
    };
    try {
      await fetchData(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      fetchInventoryData();
    } catch (err) {
      setError("Failed to add product: " + err.message);
    }
  };

  const handleProductDelete = async (productId, productName, sku) => {
    try {
      await fetchData(`${API_BASE_URL}/products/${productId}`, { method: 'DELETE' });

      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          productName: productName,
          sku: sku,
          quantityChange: 0,
          actionType: 'Removed',
          by: 'Admin',
          description: `Product deleted from inventory`
        })
      });
      fetchInventoryData();
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    }
  };

  const handleProductEdit = async (productId, updatedFields) => {
    try {
      await fetchData(`${API_BASE_URL}/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      await fetchData(`${API_BASE_URL}/inventory-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId,
          productName: updatedFields.title || products.find(p => p._id === productId)?.title,
          sku: updatedFields.sku || products.find(p => p._id === productId)?.sku,
          quantityChange: 0,
          actionType: 'Updated',
          by: 'Admin',
          description: `Product details updated`
        })
      });
      fetchInventoryData();
    } catch (err) {
      setError("Failed to edit product: " + err.message);
    }
  };


  if (loading) return <div className="text-center p-8 text-gray-900">Loading inventory data...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  const totalCurrentStock = products.reduce((sum, p) => sum + p.stockQty, 0);

  const stockAlertProducts = products.filter(p => p.stockQty < 50);

  return (
    <div className="flex h-screen text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-auto" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900 w-[310px] h-[25px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Order Details</h1>
                <p className="text-base font-normal text-gray-600 w-[310px] h-[20px]" style={{ lineHeight: '100%', letterSpacing: '0%' }}>Detailed review on orders</p>
              </div>
              <button
                className="bg-[#F2D002] text-white px-4 py-2 rounded font-semibold hover:bg-yellow-500"
                onClick={handleAddProduct}
              >
                Add Products
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'New orders', value: orders.filter(o => o.orderStatus === 'completed').length },
                { label: 'Orders In progress', value: orders.filter(o => o.orderStatus === 'processing').length },
                { label: 'Low Stock', value: products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').length }
              ].map(({ label, value }) => (
                <div key={label} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
                  <div className="text-3xl font-bold text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="flex gap-6 mb-8">
              {/* Pie Chart (Stock Level) */}
              <div className="flex-[1.5] mb-1">
                <div className="bg-white rounded-lg shadow-sm h-96">
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="text-base font-semibold text-gray-900">Stock Level</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-center mb-4">
                      <canvas ref={pieChartRef} width={120} height={120} />
                    </div>
                    <div className="w-[91px] h-auto flex flex-col items-start gap-[5px]">
                      <div className="text-xs text-gray-500">Total Stock</div>
                      <div className="font-semibold text-gray-900 text-xl">{totalCurrentStock}/{products.length > 0 ? products.reduce((sum, p) => sum + p.stockQty, 0) + 500 : 1070}</div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {products.map(p => (
                        <div key={p._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <span className="font-medium text-[#000000]">{p.title}</span>
                            </span>
                            <span className="text-gray-600">{p.stockQty}/{p.stockQty + 100}</span>
                          </div>
                          <div className="h-1.5 rounded bg-gray-200">
                            <div
                              className={`h-1.5 rounded ${p.category === 'Kids' ? 'bg-yellow-400' : 'bg-blue-600'}`}
                              style={{ width: `${(p.stockQty / (p.stockQty + 100)) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Chart (Most Ordered Product) */}
              <div className="flex-[3.5] bg-white p-5 rounded-lg shadow-sm h-96">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                  <h3 className="text-base font-semibold text-gray-900">Most Ordered Product</h3>
                  <Dropdown
                    label="View all"
                    open={graphDropdown}
                    toggle={() => setGraphDropdown(!graphDropdown)}
                    options={[
                      { label: 'View all' },
                      { label: 'Last 30 days' },
                      { label: 'Last 90 days' },
                      { label: 'Last year' }
                    ]}
                    onSelect={() => {}}
                  />
                </div>
                <div className="relative pt-4" style={{ height: '240px' }}>
                  <canvas
                    ref={lineChartRef}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Tables Section */}
            <div className="flex gap-6 mb-8">
              {/* Stock Alert Table */}
              <div className="flex-[2.5] bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b">
                  <h3 className="text-base font-semibold text-gray-900">Stock Alert</h3>
                  <button
                    className="flex items-center bg-[#F2F2F2] text-[#929292] text-sm px-3 py-1.5 rounded-md hover:bg-gray-200"
                    onClick={() => setShowEditStockAlertModal(true)}
                  >
                    <Edit size={14} className="mr-1" /> Edit
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="bg-[#F2F2F2]">
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Product Name</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Stock Qty</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Alert</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {stockAlertProducts.map((p) => (
                        <tr key={p._id} className="border-t bg-white">
                          <td className="p-3 bg-white text-[#929292]">
                            <div>
                              <div className="font-medium text-[#121212]">{p.title}</div>
                              <div className="text-xs">{p.category}</div>
                            </div>
                          </td>
                          <td className="p-3 text-gray-900">{p.stockQty}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${p.status === 'Out of Stock' ? 'text-[#DA0F0F]' : 'text-[#DCBD02]'}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product List Table */}
              <div className="flex-[4.5] bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b">
                  <h3 className="text-base font-semibold text-gray-900">Product List</h3>
                  <Dropdown
                    label="Sort by"
                    open={sortDropdown}
                    toggle={() => setSortDropdown(!sortDropdown)}
                    options={[
                      { label: 'Full Stock', textColor: '#35C11F' },
                      { label: 'Low Stock', textColor: '#DCBD02' },
                      { label: 'Out of Stock', textColor: '#DA0F0F' }
                    ]}
                    onSelect={(option) => {
                      const sortedProducts = [...products].sort((a, b) => {
                        if (option.label === 'Full Stock') return b.stockQty - a.stockQty;
                        if (option.label === 'Low Stock') return a.stockQty - b.stockQty;
                        return 0;
                      });
                      setProducts(sortedProducts);
                    }}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="bg-[#F2F2F2]">
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Name</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">SKU ID</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Stock Qty</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Status</th>
                        <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {products.map((p) => (
                        <tr key={p._id} className="border-t bg-white">
                          <td className="p-3 bg-white text-[#929292]">
                            <div>
                              <div className="font-medium text-[#121212]">{p.title}</div>
                              <div className="text-xs">{p.category}</div>
                            </div>
                          </td>
                          <td className="p-3 text-gray-900">{p.sku}</td>
                          <td className="p-3 text-gray-900">{p.stockQty}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                              p.status === 'Full Stock' ? 'text-[#35C11F]' :
                              p.status === 'Low Stock' ? 'text-[#DCBD02]' :
                              'text-[#DA0F0F]'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3 flex gap-2">
                            <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => handleProductEdit(p._id, { title: 'Updated ' + p.title })} />
                            <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => handleProductDelete(p._id, p.title, p.sku)} />
                            <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Inventory Log Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="text-base font-semibold text-gray-900">Inventory Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F2F2F2]">
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Product Name</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">SKU ID</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Date</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Qty</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Action</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">By</th>
                      <th className="p-3 text-left text-xs font-[Merriweather Sans] text-[#929292] tracking-wider">Control</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {inventoryLogs.map((log) => (
                      <tr key={log._id} className="border-t bg-white">
                        <td className="p-3 bg-white text-[#929292]">
                          <div>
                            <div className="font-medium text-[#121212]">{log.productName}</div>
                            <div className="text-xs">{log.category}</div>
                          </div>
                        </td>
                        <td className="p-3 bg-white text-gray-900">{log.sku}</td>
                        <td className="p-3 bg-white text-gray-900">{new Date(log.date).toLocaleDateString()}</td>
                        <td className={`p-3 bg-white ${log.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>{log.quantityChange > 0 ? '+' : ''}{log.quantityChange}</td>
                        <td className="p-3 bg-white text-gray-900">{log.actionType}</td>
                        <td className="p-3 bg-white text-gray-900">{log.by}</td>
                        <td className="p-3 bg-white flex gap-2">
                          <Edit3 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                          <Trash2 size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                          <MoreHorizontal size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditStockAlertModal && (
        <EditStockAlertModal
          onClose={() => setShowEditStockAlertModal(false)}
          onUpdate={handleStockAlertUpdate}
          initialProduct={selectedProductForAlert}
          initialQuantity={stockQuantityForAlert}
          initialAlert={alertLevelForAlert}
        />
      )}
    </div>
  );
};

export default Inventory;



