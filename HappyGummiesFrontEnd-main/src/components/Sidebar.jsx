// import React from 'react';

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-4">
//       <h2 className="text-xl font-bold mb-6">Company</h2>
//       <ul className="space-y-4">
//         <li className="hover:text-indigo-400">Dashboard</li>
//         <li className="hover:text-indigo-400">Analytics</li>
//         <li className="hover:text-indigo-400">Users</li>
//         <li className="hover:text-indigo-400">Settings</li>
//       </ul>
//     </div>
//   );
// }

// import React from 'react';
// import { Home, BarChart2, Users, Settings } from 'lucide-react';

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen white text-black p-6">
//       <h2 className="text-2xl font-bold mb-8">InsightPro</h2>
//       <ul className="space-y-6">
//         <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer"><Home size={18} /> Dashboard</li>
        
//         <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer"><BarChart2 size={18} /> Analytics</li>
//         <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer"><Users size={18} /> Users</li>
//         <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer"><Settings size={18} /> Settings</li>
//       </ul>
//     </div>
//   );
// }

// import React from 'react';
// import SidebarButton from './SidebarButton';
// import { LayoutDashboard, ShoppingCart, Package, Settings } from 'lucide-react';

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-[#181A1E] text-white px-4 py-6">
//       <h2 className="text-2xl font-bold mb-8">Company</h2>
//       <nav className="space-y-2">
//         <SidebarButton label="Dashboard" icon={LayoutDashboard} active />
//         <SidebarButton label="Orders" icon={ShoppingCart} />
//         <SidebarButton label="Products" icon={Package} />
//         <SidebarButton label="Settings" icon={Settings} />
//       </nav>
//     </div>
//   );
// }

// import React from 'react';
// import { HiViewGrid } from 'react-icons/hi';

// export default function Sidebar() {
//   const menuItems = [
//     { name: 'Dashboard', active: true },
//     { name: 'Order Details', active: false },
//     { name: 'Inventory', active: false },
//     { name: 'Products', active: false },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white border-r">
//       {/* Logo */}
//       <div className="py-6 px-6 border-b">
//         <img src="/logo.png" alt="Happy Gummies" className="h-12" />
//       </div>

//       {/* Menu */}
//       <div className="mt-6 px-6 flex flex-col gap-4">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-2 px-3 py-2 rounded-md ${
//               item.active
//                 ? 'bg-[#F9E98B] text-black font-semibold'
//                 : 'text-gray-500 hover:text-black'
//             }`}
//           >
//             <HiViewGrid className="text-lg" />
//             <span className="text-sm">{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React from 'react';

// export default function Sidebar() {
//   const menuItems = [
//     { name: 'Dashboard', active: true },
//     { name: 'Order Details', active: false },
//     { name: 'Inventory', active: false },
//     { name: 'Products', active: false },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white border-r">
//       {/* Logo */}
//       <div className="py-6 px-6 ">
//         <img src="/logo.png" alt="Happy Gummies" className="h-14" />
//       </div>

//       {/* Menu */}
//       <div className="mt-6 px-6 flex flex-col gap-4">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-2 px-3 py-2 rounded-md ${
//               item.active
//                 ? 'bg-[#F9E98B] text-black font-semibold'
//                 : 'text-gray-500 hover:text-black'
//             }`}
//           >
//             <img src="/grid.png" alt="icon" className="w-5 h-5" />
//             <span className="text-sm">{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard',
      icon: '/grid.png' 
    },
    { 
      name: 'Order Details', 
      path: '/order-details',
      icon: '/grid.png' 
    },
    { 
      name: 'Inventory', 
      path: '/inventory',
      icon: '/grid.png' 
    },
    { 
      name: 'Products', 
      path: '/products',
      icon: '/grid.png' 
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div 
      className="w-64 h-screen bg-[#FFFFFF] border-r"
      style={{ boxShadow: '0px 0px 10px 0px #0000001A' }}
    >
      {/* Logo */}
      <div className="mb-8" style={{ height: "80px" }}>
<img 
  src="/logo.png" 
  alt="Happy Gummies" 
  style={{
    position: 'relative'
  }}
/>      </div>

      {/* Menu */}
      <div className="mt-6 px-6 flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
              isActive(item.path)
                ? 'bg-[#F9E98B] text-black font-semibold'
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <img src={item.icon} alt="icon" className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}