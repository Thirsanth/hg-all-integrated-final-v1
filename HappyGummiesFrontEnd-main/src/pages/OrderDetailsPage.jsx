import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import MostOrderedProductChart from './MostOrderedProductChart';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import ConfirmModal from "./ConfirmModal"; // import modal
import { toast } from "react-toastify"; // if you’re using toast







export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
    const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedOrderId, setSelectedOrderId] = useState(null);
  const revenue = useMemo(() => {
  return orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
}, [orders]);

const paidOrders = useMemo(() => {
  return orders
    .filter(order => order.orderStatus.toLowerCase() === 'completed')
    .reduce((acc, order) => acc + order.amount, 0).toFixed(2);
}, [orders]);

const refunds = useMemo(() => {
  return orders
    .filter(order => order.orderStatus.toLowerCase() === 'refund')
    .reduce((acc, order) => acc + order.amount, 0).toFixed(2);
}, [orders]);

// When delete icon clicked
const handleDeleteClick = (orderId) => {
  setSelectedOrderId(orderId);
  setShowDeleteModal(true);
};

// On confirm delete
const confirmDelete = async () => {
  try {
    await axios.delete(`https://hg-admin-backend.onrender.com/api/orders/${selectedOrderId}`);
    setOrders(prev => prev.filter(o => o.orderId !== selectedOrderId));
    setFilteredOrders(prev => prev.filter(o => o.orderId !== selectedOrderId));
    toast.success("Order deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete order");
  } finally {
    setShowDeleteModal(false);
    setSelectedOrderId(null);
  }
};


const computeTrendData = (field) => {
  const map = {};

  orders.forEach(order => {
    const rawDate = new Date(order.createdAt);
    const dateKey = rawDate.toISOString().split('T')[0]; // yyyy-mm-dd
    const amount = order.amount || 0;

    if (!map[dateKey]) map[dateKey] = { revenue: 0, paid: 0, refund: 0 };

    if (field === 'revenue') {
      map[dateKey].revenue += amount;
    } else if (field === 'paid' && order.orderStatus === 'completed') {
      map[dateKey].paid += amount;
    } else if (field === 'refund' && order.orderStatus === 'refund') {
      map[dateKey].refund += amount;
    }
  });

  return Object.entries(map)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, values]) => ({
      date: new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      }),
      value: values[field]
    }));
};

const revenueTrend = computeTrendData('revenue');
const paidTrend = computeTrendData('paid');
const refundTrend = computeTrendData('refund');


const MiniChart = ({ data, color }) => (
  <ResponsiveContainer width="30%" height={40}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);


  // Sample order data
  const ordersData = [
    { id: '#5302001', qty: 2, date: 'Jan 10, 2021', mode: 'Cash', status: 'Completed' },
    { id: '#5302002', qty: 2, date: 'Jan 10, 2021', mode: 'Card', status: 'Completed' },
    { id: '#5302003', qty: 2, date: 'Jan 10, 2021', mode: 'UPI', status: 'Refund' },
    { id: '#5302004', qty: 2, date: 'Jan 10, 2021', mode: 'Cash', status: 'Cancelled' },
    { id: '#5302005', qty: 2, date: 'Jan 10, 2021', mode: 'Card', status: 'Pending' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      case 'refund':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusTextWithIcon = (status) => {
    switch (status) {
      case 'completed':
        return <>Completed <span className="text-green-600">▾</span></>;
      case 'cancelled':
        return <>Cancelled <span className="text-red-500">▾</span></>;
      case 'pending':
        return <>Pending <span className="text-yellow-500">▾</span></>;
      case 'refund':
        return <>Refund <span className="text-blue-500">▾</span></>;
      default:
        return status;
    }
  };
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://hg-admin-backend.onrender.com/api/orders");
        setOrders(res.data);
         setFilteredOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
  
    fetchOrders();
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



  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto bg-[#FBFFED] p-6 space-y-6 text-black" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
          {/* Page Title */}
          <div className='mb-8 mt-4'>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-Merriweather Sans text-gray-500">
              Detailed overview on orders
            </p>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Revenue Card */}
            <div className="bg-white p-4 rounded-lg space-y-3" style={{boxShadow: '0px 8px 32px 0px #3326AE14'}}>
              <div className="text-Merriweather Sans text-gray-500">Revenue</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${revenueTrend.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                </div>
                <div className="text-yellow-500 text-Merriweather Sans font-medium">+2%</div>
              </div>
              {/* Mini chart line */}
              <div className="h-8 flex items-end justify-center">
               <MiniChart data={revenueTrend} color="#FFD700" />
              </div>
              
            </div>

            {/* Orders Paid Card */}
            <div className="bg-white p-4 rounded-lg space-y-3" style={{boxShadow: '0px 8px 32px 0px #3326AE14'}}>
              <div className="text-Merriweather Sans text-gray-500">Orders Paid</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${paidTrend.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                </div>
                <div className="text-green-500 text-Merriweather Sans font-medium">+4.5</div>
              </div>
              {/* Mini chart line */}
              <div className="h-8 flex items-end justify-center">
                <MiniChart data={paidTrend} color="green" />
              </div>
            </div>

            {/* Refund Card */}
            <div className="bg-white p-4 rounded-lg space-y-3" style={{boxShadow: '0px 8px 32px 0px #3326AE14'}}>
              <div className="text-Merriweather Sans text-gray-500">Refund</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${refundTrend.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                </div>
                <div className="text-red-500 text-Merriweather Sans font-medium">-18%</div>
              </div>
              {/* Mini chart line */}
              <div className="h-8 flex items-end justify-center">
                <MiniChart data={refundTrend} color="red" />
              </div>
            </div>
          </div>

          {/* Most Ordered Product Chart */}
          <div className="bg-white mb-8 p-6 rounded-lg shadow">
            <MostOrderedProductChart orders={orders} />

          </div>

          {/* Order Table */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Order Details</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border rounded px-3 py-1 text-Merriweather Sans outline-none"
                  placeholder="Search by order ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="border rounded px-2 py-1 text-Merriweather Sans outline-none"
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
              <table className="w-full text-Merriweather Sans text-left">
                <thead className="text-gray-600 bg-gray-100">
                  <tr className="h-10">
                    <th className="px-4">Order ID</th>
                    <th className="px-4">Products</th>
                    <th className="px-2">Qty</th>
                    <th className="px-2">Date</th>
                    <th className="px-2">Mode</th>
                    <th className="px-2">Status</th>
                    <th className="px-2">Actions</th>
                  </tr>
                </thead>
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
            <img src="/bin.png" className="w-4 h-4 mt-2" 
            onClick={() => handleDeleteClick(order.orderId)}
            />
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
       <ConfirmModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={confirmDelete}
/>
    </div>
    
  );

 
}


