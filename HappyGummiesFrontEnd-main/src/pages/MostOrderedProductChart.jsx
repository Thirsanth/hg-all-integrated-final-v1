// import React, { useState, useMemo } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from 'recharts';

// export default function MostOrderedProductChart({ orders }) {
//   const [timeframe, setTimeframe] = useState('7');

//   const filteredOrders = useMemo(() => {
//     const days = parseInt(timeframe);
//     const now = new Date();
//     return orders.filter(order => {
//       const orderDate = new Date(order.createdAt);
//       const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
//       return diffDays <= days;
//     });
//   }, [orders, timeframe]);

//   const productStats = useMemo(() => {
//     const map = {};
//     filteredOrders.forEach(order => {
//       order.products.forEach(p => {
//         if (!map[p.name]) map[p.name] = 0;
//         map[p.name] += p.quantity;
//       });
//     });

//     return Object.entries(map)
//       .map(([name, qty]) => ({ name, qty }))
//       .sort((a, b) => b.qty - a.qty)
//       .slice(0, 10);
//   }, [filteredOrders]);

//   return (
//     <div className="bg-white mb-8 p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-semibold">Most Ordered Product</h2>
//         <select
//           className="border rounded px-3 py-1 outline-none text-gray-600"
//           value={timeframe}
//           onChange={(e) => setTimeframe(e.target.value)}
//         >
//           <option value="7">Last 7 days</option>
//           <option value="30">Last 30 days</option>
//           <option value="90">Last 90 days</option>
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={productStats}>
//           <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Bar dataKey="qty" fill="#FFD700" radius={[6, 6, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }



import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Dot
} from 'recharts';

export default function MostOrderedProductChart({ orders }) {
  const [timeframe, setTimeframe] = useState('7');

  const filteredOrders = useMemo(() => {
    const days = parseInt(timeframe);
    const now = new Date();
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
  }, [orders, timeframe]);

  const dayWiseData = useMemo(() => {
    const map = {};

    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: '2-digit',
        month: 'short'
      });
      const qty = order.products.reduce((sum, p) => sum + p.quantity, 0);
      map[date] = (map[date] || 0) + qty;
    });

    return Object.entries(map)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, total]) => ({ date, total }));
  }, [filteredOrders]);

  return (
    <div className="bg-white mb-8 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Most Ordered Product</h2>
        <select
          className="border rounded px-3 py-1 outline-none text-gray-600"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dayWiseData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#999', fontSize: 12 }} />
          <YAxis tick={{ fill: '#999', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFD700', border: 'none', borderRadius: 6 }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value) => [`${value}`, 'Orders']}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#FFD700"
            strokeWidth={3}
            dot={{ r: 5, fill: '#FFD700', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, stroke: '#FFD700', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
