import React, { useState } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import OrderStatusChart from './OrderStatusChart';
import OrderStatisticsChart from './OrderStatisticsChart';
import { useEffect } from "react";
import axios from "axios";


export default function DashboardPage() {
  const navigate = useNavigate();
const [orders, setOrders] = useState([]);
  const [orderStatusPeriod, setOrderStatusPeriod] = useState("Last 7 days");
  const [statisticsPeriod, setStatisticsPeriod] = useState("Last 7 days");
  const [paymentMethodsPeriod, setPaymentMethodsPeriod] = useState("Last 7 days");
  const [newOrdersPeriod, setNewOrdersPeriod] = useState("Today");
  const [inProgressPeriod, setInProgressPeriod] = useState("Today");

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
const [statusFilter, setStatusFilter] = useState('Status');
const [error, setError] = useState('');

  ///////// 
  const totalSales = orders.reduce((acc, order) => {
  return acc + order.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
}, 0);
const today = new Date().toISOString().slice(0, 10);
const newOrders = orders.filter(order => order.createdAt?.slice(0, 10) === today);
const totalEarnings = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
const avgOrderValue = orders.length ? (totalEarnings / orders.length).toFixed(2) : 0;
const statusCounts = {
  completed: 0,
  pending: 0,
  refund: 0,
  cancelled: 0,
};

orders.forEach(order => {
  statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
});

  const inProgressOrders = orders.filter(order => order.status === "pending");

  
const recentTransactions = [...orders]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

const [monthlyStats, setMonthlyStats] = useState({});

useEffect(() => {
  fetch('/api/order/monthly-stats')
    .then(res => res.json())
    .then(data => setMonthlyStats(data));
}, []);

useEffect(() => {
  let filtered = orders;

  if (searchTerm.trim() !== '') {
    filtered = filtered.filter(order =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter && statusFilter !== 'Status') {
    filtered = filtered.filter(order =>
      order.orderStatus.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  // setFilteredOrders(filtered.length ? filtered : orders); // fallback if no result
  if (filtered.length === 0) {
    setError('No matching orders found.');
  } else {
    setError('');
  }

  setFilteredOrders(filtered.length ? filtered : []);

}, [searchTerm, statusFilter, orders]);


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'Cancelled':
        return 'text-red-500';
      case 'Pending':
        return 'text-yellow-500';
      case 'Refund':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusTextWithIcon = (status) => {
    switch (status) {
      case 'completed':
        return <>Completed <span className="text-green-600">▾</span></>;
      case 'Cancelled':
        return <>Cancelled <span className="text-red-500">▾</span></>;
      case 'Pending':
        return <>Pending <span className="text-yellow-500">▾</span></>;
      case 'Refund':
        return <>Refund <span className="text-blue-500">▾</span></>;
      default:
        return status;
    }
  };

  

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
       setFilteredOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  fetchOrders();
}, []);




  return (
   <div className="flex h-screen text-white"> {/* Removed overflow-hidden here */}
         <Sidebar />
         <div className="flex flex-col flex-1">
           <Header />

        {/* Dashboard Body - Consistent padding for all sections */}
        <div className="flex-1 overflow-y-auto text-black" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
          <div className="px-8 py-8 space-y-10">
            {/* Welcome & Export Report */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold">Welcome Jason!</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Track your sales activity, stocks and more
                </p>
              </div>
              <button className="bg-[#FFD700] text-white px-6 py-3 rounded-md font-medium shadow-sm hover:shadow-md">
                Export Report
              </button>
            </div>

            {/* New Orders + In Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-8">
              {/* New Orders */}
              <StatCard
                title="New Orders"
                count={newOrders.length}
                growth="↑ 0.29%"
                description="Last Order Received: 2 min ago"
                barColor="bg-blue-500"
                barWidth="w-[90%]"
                selectedPeriod={newOrdersPeriod}
                onPeriodChange={setNewOrdersPeriod}
              />

              {/* Orders In Progress */}
              <StatCard
                title="Orders In Progress"
                count={inProgressOrders.length}
                growth="↑ 0.18%"
                description="Last Order Delivered: 15 min ago"
                barColor="bg-yellow-400"
                barWidth="w-[75%]"
                selectedPeriod={inProgressPeriod}
                onPeriodChange={setInProgressPeriod}
              />
            </div>

            {/* Sales Summary Cards */}
            <div 
              className="flex justify-between mt-8 mb-8"
              style={{ width: '1090px', height: '171px' }}
            >
              {[
                // { label: 'Total Sales', value: '1090', icon: '/dollar1.png', change: '+0.29%' },
                // { label: 'Total Earnings', value: '$6200.50', icon: '/dollar2.png', change: '+0.29%' },
                // { label: 'Avg Order Value', value: '$500', icon: '/dollar3.png', change: '-0.29%', down: true },
                // { label: 'Total Orders', value: '1,25,500', icon: '/dollar4.png', change: '+0.29%' },
                { label: 'Total Sales', value: totalSales, icon: '/dollar1.png', change: '+0.29%' },
            { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: '/dollar2.png', change: '+0.29%' },
            { label: 'Avg Order Value', value: `$${avgOrderValue}`, icon: '/dollar3.png', change: '-0.29%', down: true },
            { label: 'Total Orders', value: orders.length, icon: '/dollar4.png', change: '+0.29%' },
              ].map((card, i) => (
                <div 
                  key={i} 
                  className="bg-white shadow-sm flex flex-col"
                  style={{ 
                    width: '258px', 
                    height: '171px', 
                    gap: '20px', 
                    borderRadius: '16px', 
                    padding: '16px' 
                  }}
                >
                  <div>
                    <img src={card.icon} alt={card.label} className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-gray-500">{card.label}</div>
                  <div className="text-xl font-bold">{card.value}</div>
                  <div className={`text-sm ${card.down ? 'text-red-500' : 'text-green-600'}`}>
                    {card.down ? '↓' : '↑'} {card.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Status + Order Statistics */}
            <div className="flex flex-col md:flex-row gap-8 mt-8 mb-8">
              {/* Order Status (narrow width) */}
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between w-full md:w-[30%]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-sm">Order Status</h2>
                  <TimePeriodDropdown 
                    selectedPeriod={orderStatusPeriod}
                    onPeriodChange={setOrderStatusPeriod}
                  />
                </div>
                <div className='mt-5 text-gray-100'>
                  <hr></hr>
                </div>
                {/* <div className="flex items-center flex-col "> */}
                  {/* <img src="/orderstatus.png" alt="Order Graph" className="w-[350px] h-[350px] mt-[-60px] mr-5 object-contain" />
                  <div className="mt-[-60px] space-y-3">
                    <div className="flex justify-between "><span className='mr-33 mb-5'>🟢 Successful Orders</span><span className="font-medium">{statusCounts.completed}</span></div>
                    <div className="flex justify-between"><span className='mb-5'>🟡 Pending Orders</span><span className="font-medium">{statusCounts.pending}</span></div>
                    <div className="flex justify-between"><span className='mb-5'>🔵 Returned Orders</span><span className="font-medium">{statusCounts.refund}</span></div>
                    <div className="flex justify-between"><span className='mb-5'>🔴 Cancelled Orders</span><span className="font-medium">{statusCounts.cancelled}</span></div>
                  </div> */}
                  <OrderStatusChart statusCounts={statusCounts} />
                {/* </div> */}
              </div>

              {/* Order Statistics (wide width) */}
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between w-full md:w-[70%] ">
                 <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-sm">Order Statistics</h2>
                  <TimePeriodDropdown 
                    selectedPeriod={statisticsPeriod}
                    onPeriodChange={setStatisticsPeriod}
                  />
                </div>
                <div className=' text-gray-100 mt-[-12px]'>
                  <hr></hr>
                </div>
                {/* <img src="/orderstatistics.png" alt="Statistics Graph" className="w-full h-[320px] object-contain" />
                <div className="text-[11px] text-gray-400 mt-1"></div>  */}
                <OrderStatisticsChart monthlyStats={monthlyStats} />
              </div>
              
            </div>

            {/* Payment Methods + Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-8">
              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <div className="flex justify-between mb-5">
                  <h2 className="font-semibold">Payment Methods</h2>
                  <TimePeriodDropdown 
                    selectedPeriod={paymentMethodsPeriod}
                    onPeriodChange={setPaymentMethodsPeriod}
                  />
                </div>
                <div className=' text-gray-100 mt-[-10px]'>
                  <hr></hr>
                </div>
                {[{method:'Credit Card', icon:'/pm1.png'},{ method:'Cash', icon:'/pm2.png'},{method: 'UPI', icon:'/pm3.png'}, {method:'Debit Card', icon:'/pm4.png'}].map((pm, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <div className='ml-[100px] flex items-center gap-2'>
                      <img src={pm.icon} alt='img' className="w-4 h-4" />
                      <span>{pm.method}</span>
                    </div>
                    <div className='mr-[100px]'>
                      <span className="bg-yellow-400 text-sm font-medium px-2 py-1 rounded">25%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 ">
                <h2 className="font-semibold mb-5">Recent Transactions</h2>
                <div className=' text-gray-100 mt-[-10px]'>
                  <hr></hr>
                </div>
                {[
                  { product: 'Kids Candies', id: '#1234567', price: '$100.05', status: 'Paid' },
                  { product: 'Adults Candies', id: '#1234567', price: '$100.05', status: 'Pending' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center text-sm py-3">
                    <div className="flex items-center gap-3">
                      <img src="/hg.png" className="w-8 h-8" alt="icon" />
                      <div>
                        <div className="font-medium">{tx.product}</div>
                        <div className="text-gray-500">{tx.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>{tx.price}</div>
                      <div className={tx.status === 'Paid' ? 'text-green-600' : 'text-red-500'}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order table */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-semibold text-lg">Order Details</h2>
                <div className="flex gap-4">
                  {/* <input
                    type="text"
                    className="border rounded px-4 py-2 text-sm outline-none"
                    placeholder="Search by order ID"
                  />
                  <select className="border rounded px-3 py-2 text-sm outline-none"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  >
                    <option>Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                    <option>Refund</option>
                  </select> */}
                   <input
    type="text"
    className="border rounded px-4 py-2 text-sm outline-none"
    placeholder="Search by order ID"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    className="border rounded px-3 py-2 text-sm outline-none"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option>Status</option>
    <option>Completed</option>
    <option>Pending</option>
    <option>Cancelled</option>
    <option>Refund</option>
  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-t-lg mb-7">
                
  {error && (
    <div className="text-center text-red-500 font-medium mb-4">
      {error}
    </div>
  )}
                <table className="w-full text-sm text-left ">
                  <thead className="text-gray-600 bg-gray-100">
                    <tr className="h-12">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Products</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Mode</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>

                  {/* <tbody className="text-gray-700 rounded-t-lg">

                    {error && (
  <tr>
    <td colSpan="7" className="px-6 py-4 text-center text-red-500 font-medium">
      {error}
    </td>
  </tr>
)}

{filteredOrders.map((order, i) => {
  const totalQty = order.products.reduce((sum, p) => sum + p.quantity, 0);
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric"
  });
  return (
    <tr key={i} className="border-t hover:bg-gray-50">
      <td className="px-6 py-4">{order.orderId}</td>
      <td className="px-6 py-4">
        <div>{order.products[0]?.name || 'N/A'}</div>
        <div className="text-xs text-gray-500">{order.products[0]?.type || 'Product'}</div>
      </td>
      <td className="px-4 py-4">{totalQty}</td>
      <td className="px-4 py-4">{date}</td>
      <td className="px-4 py-4">Online</td>
      <td className={`px-4 py-4 font-medium ${getStatusColor(order.orderStatus)}`}>
        {getStatusTextWithIcon(order.orderStatus)}
      </td>
      <td className="px-4 py-4 text-gray-400 flex gap-3 mt-1 text-lg">
        <img onClick={() => navigate(`/individual-order/${order.orderId}`)} src="/pencil.png" className="w-4 h-4 mt-2 cursor-pointer" />
        <img src="/bin.png" className="w-4 h-4 mt-2" />
      </td>
    </tr>
  );
})}


                  </tbody> */}

   
                  <tbody className="text-gray-700 rounded-t-lg">
  {filteredOrders.length ? (
    filteredOrders.map((order, i) => {
      const totalQty = order.products.reduce((sum, p) => sum + p.quantity, 0);
      const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "short", day: "numeric"
      });

      return (
        <tr key={i} className="border-t hover:bg-gray-50">
          <td className="px-6 py-4">{order.orderId}</td>
          <td className="px-6 py-4">
            <div>{order.products[0]?.name || 'N/A'}</div>
            <div className="text-xs text-gray-500">{order.products[0]?.type || 'Product'}</div>
          </td>
          <td className="px-4 py-4">{totalQty}</td>
          <td className="px-4 py-4">{date}</td>
          <td className="px-4 py-4">Online</td>
          <td className={`px-4 py-4 font-medium ${getStatusColor(order.orderStatus)}`}>
            {getStatusTextWithIcon(order.orderStatus)}
          </td>
          <td className="px-4 py-4 text-gray-400 flex gap-3 mt-1 text-lg">
            <img
              onClick={() => navigate(`/individual-order/${order.orderId}`)}
              src="/pencil.png"
              className="w-4 h-4 mt-2 cursor-pointer"
            />
            <img src="/bin.png" className="w-4 h-4 mt-2" />
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" className="text-center text-gray-500 py-4">
        No matching orders found.
      </td>
    </tr>
  )}
</tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, growth, description, barColor, barWidth, selectedPeriod, onPeriodChange }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      {/* Title + Dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        <TimePeriodDropdown 
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
        />
      </div>

      {/* Count + Growth + Description in one row */}
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {count} <span className="text-green-600 text-sm font-medium">{growth}</span>
        </div>
        <div className="text-sm text-gray-500 text-right">
          {description}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`h-2 ${barColor} ${barWidth} rounded-sm mt-4`}></div>
    </div>
  );
}

const TimePeriodDropdown = ({ selectedPeriod = "Last 7 days", onPeriodChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const periods = [
    "Today",
    "Last 7 days", 
    "Last 30 days",
    "Last 90 days", 
    "Last 180 days",
    "Last 365 days",
    "All time"
  ];

  const handleSelect = (period) => {
    if (onPeriodChange) {
      onPeriodChange(period);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 focus:outline-none"
      >
        {selectedPeriod}
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => handleSelect(period)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                  period === selectedPeriod ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};