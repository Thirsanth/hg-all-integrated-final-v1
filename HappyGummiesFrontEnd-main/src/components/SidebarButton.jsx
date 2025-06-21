import React from 'react';

export default function SidebarButton({ label, icon: Icon, active }) {
  return (
    <div
      className={`flex items-center px-2 py-2 gap-2 w-[190px] h-[40px] rounded-[4px] text-sm font-medium cursor-pointer
        ${active ? 'bg-[#F9E98B] text-black' : 'text-white hover:bg-gray-700'}`}
    >
      {Icon && <Icon size={18} className={active ? 'text-black' : 'text-white'} />}
      {label}
    </div>
  );
}