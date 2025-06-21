import React, { useState } from "react";
import { Pencil } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import EditStockModal from "./EditStockModal";
import unitsSold from "../assets/units_sold.png";

const data = [
  { month: "Jan", current: 40, low: 5, out: 30 },
  { month: "Feb", current: 60, low: 5, out: 25 },
  { month: "Mar", current: 50, low: 10, out: 35 },
  { month: "Apr", current: 70, low: 10, out: 20 },
  { month: "May", current: 90, low: 15, out: 30 },
  { month: "Jun", current: 130, low: 25, out: 45 },
  { month: "Jul", current: 100, low: 20, out: 60 },
  { month: "Aug", current: 50, low: 10, out: 40 },
  { month: "Sep", current: 20, low: 5, out: 30 },
  { month: "Oct", current: 90, low: 15, out: 45 },
  { month: "Nov", current: 140, low: 20, out: 60 },
  { month: "Dec", current: 120, low: 15, out: 50 },
];

const formatXAxis = (tickItem, index) => {
  if (index === 0) {
    return ''; // Hide the label for the first data point (January)
  } else {
    return tickItem; // Show labels for other months
  }
};

export default function InventoryDashboard({ onEditProduct, onEditStock }) {
  const [autoAlert, setAutoAlert] = useState("Enabled");
  const [showEditStock, setShowEditStock] = useState(false);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const handleAutoAlertChange = (e) => {
    setAutoAlert(e.target.value);
  };

  const handleStockUpdate = (updatedStockData) => {
    onEditStock(updatedStockData);
    setShowEditStock(false);
  };

  const handleDownloadReport = () => {
    // Simulate a download action (in a real app, this would trigger a file download)
    setReportDownloaded(true);
    // Optionally revert the button text after a few seconds
    setTimeout(() => {
      setReportDownloaded(false);
    }, 3000); // Revert after 3 seconds
  };

  return (
    <div className="mt-8 px-6">
      {/* Card Container */}
      <div className="w-[1090px] p-[24px] gap-[24px] rounded-[16px] bg-white shadow-sm border border-gray-200 flex flex-col">
        
        {/* Heading and Controls */}
        <div className="flex justify-between items-end mb-0 mt-[-8px]">
          <h2 className="text-xl font-bold">Stock Status & Inventory Insights</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-600">Auto Alert:</span>
              <select
                className={`text-sm border border-gray-300 rounded px-3 py-2 ${
                  autoAlert === "Enabled" ? "text-green-600" : "text-red-600"
                }`}
                value={autoAlert}
                onChange={handleAutoAlertChange}
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded text-sm font-semibold hover:bg-gray-800 transition">
              Update Stock
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gray-200 text-black rounded text-sm font-medium hover:bg-gray-300 transition"
              onClick={() => setShowEditStock(true)}
            >
              <Pencil size={16} className="mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-gray-300" />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
         {/* Left: Stock Data */}
<div className="flex flex-col gap-2">
  <div className="border border-gray-200 rounded-2xl px-6 py-4 w-full h-[360px] flex flex-col">
    <table className="w-full text-sm h-full">
      <tbody className="flex flex-col justify-between h-full">
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Last Stock Updated</td>
          <td className="font-semibold">08 Apr 2025</td>
        </tr>
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Last Ordered On</td>
          <td className="font-semibold">2 min ago</td>
        </tr>
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Current Stock</td>
          <td className="font-semibold">250</td>
        </tr>
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Low Stock</td>
          <td className="font-semibold">20</td>
        </tr>
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Max Capacity</td>
          <td className="font-semibold">500</td>
        </tr>
        <tr className="flex justify-between border-b border-gray-200">
          <td className="py-1 text-gray-500">Minimum Order Qty</td>
          <td className="font-semibold">1</td>
        </tr>
        <tr className="flex justify-between">
          <td className="py-1 text-gray-500">Maximum Order Qty</td>
          <td className="font-semibold">10</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Download Button */}
  <button
    className={`bg-yellow-100 text-yellow-800 font-medium text-sm py-2 px-4 rounded w-fit transition ${reportDownloaded ? 'bg-green-100 text-green-1800' : 'hover:bg-yellow-200 hover:text-yellow-900'}`}
    onClick={handleDownloadReport}
  >
    {reportDownloaded ? '✔️ Report Downloaded' : '📄 Download Stock Report'}
  </button>
</div>


          {/* Right: Chart */}
          <div className="border border-gray-200 rounded-2xl px-6 py-4 h-[360px] w-full">
            <div className="mb-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base">Inventory Performance</span>
                <span className="text-sm text-gray-500">Last 365 days ▾</span>
              </div>
              <hr className="border-t border-gray-300" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" padding={{ left: 20, right: 20 }} />
                <Tooltip />
                <Legend verticalAlign="top" align="center" />
                <Line type="monotone" dataKey="current" stroke="green" name="Current Stock" dot={false} />
                <Line type="monotone" dataKey="low" stroke="gold" name="Low Stock" dot={false} />
                <Line type="monotone" dataKey="out" stroke="red" strokeDasharray="5 5" name="Out of Stock" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditStock && (
        <EditStockModal
          isOpen={showEditStock}
          onClose={() => setShowEditStock(false)}
          stockData={{
            currentStock: 250,
            lowStock: 20,
            maxCapacity: 500,
            minOrderQty: 1,
            maxOrderQty: 10,
          }}
          onUpdate={handleStockUpdate}
        />
      )}
      
      {/* Sales & Performance Insights component */}
      <SalesPerformanceInsights />
    </div>
  );
}

// New Sales & Performance Insights component
function SalesPerformanceInsights() {
  // Sample data based on the image
  const salesData = [
    { date: "01 Apr", unitsSold: 100, returns: 5 },
    { date: "03 Apr", unitsSold: 150, returns: 8 },
    { date: "06 Apr", unitsSold: 80, returns: 12 },
    { date: "09 Apr", unitsSold: 200, returns: 6 },
    { date: "12 Apr", unitsSold: 120, returns: 15 },
    { date: "15 Apr", unitsSold: 250, returns: 7 },
    { date: "18 Apr", unitsSold: 180, returns: 20 },
    { date: "21 Apr", unitsSold: 300, returns: 10 },
    { date: "24 Apr", unitsSold: 140, returns: 18 },
    { date: "27 Apr", unitsSold: 220, returns: 9 },
    { date: "30 Apr", unitsSold: 160, returns: 14 },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(' 7 days');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setShowDropdown(false);
    // In a real application, you would fetch data based on the selected period here
    console.log('Selected period:', period);
  };

  return (
    <div className="mt-8 px-6">
      {/* Card Container - Sales */}
      <div className="w-[1090px] h-[450px] p-[24px] gap-[16px] rounded-[16px] bg-white shadow-sm flex flex-col">
        {/* Heading and Controls - Sales */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Sales & Performance Insights</h2>
          {/* Dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer"
              onClick={toggleDropdown}
            >
              {selectedPeriod} ▾
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <ul>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === 'Today' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect('Today')}
                  >
                    Today
                  </li>
                   <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === ' 7 days' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect(' 7 days')}
                  >
                     7 days
                    </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === ' 30 days' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect(' 30 days')}
                  >
                     30 days
                    </li>
                   <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === ' 90 days' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect(' 90 days')}
                  >
                      90 days
                    </li>
                   <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === 'Last 180 days' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect('Last 180 days')}
                  >
                      180 days
                    </li>
                   <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === 'Last 365 days' || selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect('Last 365 days')}
                  >
                      365 days
                    </li>
                   <li
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${selectedPeriod === 'All time' ? 'text-green-600' : 'text-gray-700'}`}
                    onClick={() => handlePeriodSelect('All time')}
                  >
                    All time
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-gray-300" />

        {/* Sales and Returns Info */}
        <div className="flex items-center gap-6 mb-4 justify-center">
          <div className="flex items-center gap-1">
            {/* Units Sold Icon */}
            <img src={unitsSold} alt="Units sold icon" className="w-5 h-5" />
            <span className="text-base text-gray-800">Units sold: <span className="font-semibold">800</span></span>
          </div>
          <div className="flex items-center gap-1">
             {/* Placeholder Icon - replace with actual icon component if needed */}
            <span className="text-gray-500">↩</span> 
            <span className="text-base text-gray-800">Returns: <span className="font-semibold">10</span></span>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              {/* YAxis omitted as per image */}
              <Tooltip />
              {/* Legend omitted */}
              <Line
                type="monotone"
                dataKey="unitsSold"
                stroke="#FFC658"
                dot={false}
                strokeWidth={2}
                name="Units Sold"
              />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#4E79A7"
                dot={false}
                strokeWidth={2}
                name="Returns"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}