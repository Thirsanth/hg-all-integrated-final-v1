
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//   } from "recharts";
  
  
//   const data = [
//     { month: "Jan", current: 50, low: 20, out: 30 },
//     { month: "Feb", current: 60, low: 20, out: 40 },
//     { month: "Mar", current: 40, low: 20, out: 60 },
//     { month: "Apr", current: 70, low: 25, out: 50 },
//     { month: "May", current: 90, low: 30, out: 40 },
//     { month: "Jun", current: 110, low: 35, out: 60 },
//     { month: "Jul", current: 80, low: 25, out: 90 },
//     { month: "Aug", current: 30, low: 20, out: 120 },
//     { month: "Sep", current: 20, low: 20, out: 100 },
//     { month: "Oct", current: 70, low: 25, out: 60 },
//     { month: "Nov", current: 100, low: 30, out: 80 },
//     { month: "Dec", current: 90, low: 25, out: 60 },
//   ];
  
//   export default function StockInsights() {
//     return (
//       <div className="bg-black text-white shadow rounded-2xl p-6 mt-8 max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Stock Status & Inventory Insights</h2>
//           <button className="bg-yellow text-black px-4 py-2 rounded ">
//             Update Stoc
//           </button>
//         </div>
  
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
          
  
//           <div>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={data}>
//                 <CartesianGrid stroke="#444" strokeDasharray="3 3" />
//                 <XAxis dataKey="month" stroke="#ccc" />
//                 <YAxis stroke="#ccc" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: "#111", borderColor: "#444" }}
//                   labelStyle={{ color: "#fff" }}
//                   itemStyle={{ color: "#ccc" }}
//                 />
//                 <Legend wrapperStyle={{ color: "#fff" }} />
//                 <Line
//                   type="monotone"
//                   dataKey="current"
//                   stroke="#4ade80" 
//                   strokeWidth={2}
//                   name="Current Stock"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="low"
//                   stroke="#fde047"
//                   strokeWidth={2}
//                   name="Low Stock"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="out"
//                   stroke="#f87171" 
//                   strokeDasharray="5 5"
//                   strokeWidth={2}
//                   name="Out of Stock"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     );
//   }
  


import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Mock API Base URL (Replace with your actual backend URL) ---
const API_BASE_URL = 'https://hg-admin-backend.onrender.com/api'; // Example backend URL

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

export default function StockInsights({ product }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate dynamic chart data based on current product list and logs
  const generateChartData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await fetchData(`${API_BASE_URL}/products`);
      const logsData = await fetchData(`${API_BASE_URL}/inventory-logs`);

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonthIndex = new Date().getMonth(); // 0-11

      const aggregatedData = months.map((month, index) => {
        let currentStock = 0;
        let lowStockCount = 0;
        let outOfStockCount = 0;

        // Simplified aggregation:
        // For the *current* month, use actual product data.
        // For past months, simulate a trend based on current data and logs.
        if (index <= currentMonthIndex) {
            if (index === currentMonthIndex) {
                // For the current month, calculate based on current actual product data
                currentStock = productsData.reduce((sum, p) => sum + p.stockQty, 0);
                lowStockCount = productsData.filter(p => p.status === 'Low Stock').length;
                outOfStockCount = productsData.filter(p => p.status === 'Out of Stock').length;
            } else {
                // For past months, simulate values (this is not historically accurate from logs alone)
                // This is a placeholder for a more complex historical aggregation
                // In a real scenario, your backend would pre-aggregate this historical data.
                currentStock = Math.max(0, productsData.reduce((sum, p) => sum + p.stockQty, 0) + (currentMonthIndex - index) * 10);
                lowStockCount = Math.max(0, productsData.filter(p => p.status === 'Low Stock').length - (currentMonthIndex - index));
                outOfStockCount = Math.max(0, productsData.filter(p => p.status === 'Out of Stock').length - (currentMonthIndex - index));

                // Add simulated "out of stock" events if relevant logs exist
                logsData.filter(log => new Date(log.date).getMonth() === index && log.actionType === 'Removed' && log.quantityChange < 0)
                        .forEach(log => {
                            // This is a very rough heuristic: if a product was removed, assume it contributed to 'out of stock' for simulation purposes
                            if (log.quantityChange === -(productsData.find(p => p._id === log.productId)?.stockQty || 1)) { // if it removes all current stock
                                outOfStockCount = Math.max(outOfStockCount, outOfStockCount + 1); // increment count
                            }
                        });
            }
        }

        return {
          month: month,
          current: currentStock,
          low: lowStockCount,
          out: outOfStockCount,
        };
      });

      setChartData(aggregatedData);
    } catch (err) {
      setError("Failed to generate insights data: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateChartData();
  }, [generateChartData]);

  if (loading) return <div className="text-center p-8 text-gray-900">Loading insights...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-black text-white shadow rounded-2xl p-6 mt-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Stock Status & Inventory Insights</h2>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500" onClick={generateChartData}>
          Refresh Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", borderColor: "#444" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#ccc" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#4ade80"
                strokeWidth={2}
                name="Total Stock"
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#fde047"
                strokeWidth={2}
                name="Low Stock Products"
              />
              <Line
                type="monotone"
                dataKey="out"
                stroke="#f87171"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Out of Stock Products"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

