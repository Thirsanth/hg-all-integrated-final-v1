import React, { useState, useRef, useEffect } from 'react';
import PasswordChangeFlow from '../PasswordChangeFlow'; // Import your PasswordChangeFlow component
// Placeholder for your PasswordChangeFlow component
// In a real application, this would be a separate file like PasswordChangeFlow.jsx


export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMarkAsReadModal, setShowMarkAsReadModal] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false); // New state for PasswordChangeFlow

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Handlers for modals and notifications
  const handleClearAll = () => {
    setShowClearModal(false);
    setShowNotifications(false);
    console.log('All notifications cleared');
  };

  const handleMarkAllAsRead = () => {
    setShowMarkAsReadModal(false);
    setShowNotifications(false);
    console.log('All notifications marked as read');
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setShowProfileMenu(false);
    console.log('User logged out');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    setShowProfileModal(true);
  };

  const handleChangePasswordClick = () => {
    setShowProfileModal(false); // Close profile modal
    setShowPasswordChange(true); // Open password change flow
  };

  const handleClosePasswordChange = () => {
    setShowPasswordChange(false); // Close password change flow
  };

  // Close notification and profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      icon: 'src/assets/delivery-icon.png', // Corrected path assumption
      iconBg: 'bg-green-100',
      title: '#1234567 Order has been delivered',
      subtitle: '2 orders has been delivered to Marry',
      time: '1 min ago'
    },
    {
      id: 2,
      icon: 'src/assets/pending-icon.png', // Corrected path assumption
      iconBg: 'bg-yellow-100',
      title: 'Payment Status Pending for #1256789',
      subtitle: 'Payment Status Pending for #1256789',
      time: '9 min ago'
    },
    {
      id: 3,
      icon: 'src/assets/order-icon.png', // Corrected path assumption
      iconBg: 'bg-blue-100',
      title: 'You Received a New Order',
      subtitle: 'Hurray! New order receieved',
      time: '25 min ago'
    },
    {
      id: 4,
      icon: 'src/assets/transit-icon.png', // Corrected path assumption
      iconBg: 'bg-orange-100',
      title: '#1234567 Order is in Transit',
      subtitle: '#1234567 Order is in Transit',
      time: '33 min ago'
    },
    {
      id: 5,
      icon: 'src/assets/success-icon.png', // Corrected path assumption
      iconBg: 'bg-green-100',
      title: 'Payment Successful for #189789',
      subtitle: 'Your payment of $128.00 recieved',
      time: '1hr ago'
    }
  ];

  return (
    <div className="relative" style={{ boxShadow: '0px 0px 10px 0px #0000001A' }} >
      <div className="flex justify-end items-center w-full h-14 px-4 bg-white border-b shadow-sm" style={{ height: "80px", boxShadow: '0px 0px 10px 0px #0000001A' }}>
        {/* Notification Bell */}
        <div className="relative mr-4">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="focus:outline-none"
          >
            <img src="/bell.png" alt="Notifications" className="w-10 h-10" />
            {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>
        </div>

        {/* Profile Icon */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center focus:outline-none"
          >
            <img src="/user.png" alt="Profile" className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border w-48 py-2 z-50">
              <button
                onClick={handleProfileClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Profile</span>
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setShowLogoutModal(true);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <div 
          ref={notificationRef}
          className="absolute right-4 top-20 bg-white rounded-3xl shadow-lg border"
          style={{ 
            width: '540px', 
            height: '648px',
            zIndex: 1000,
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100 rounded-t-3xl">
            <h2 className="text-2xl font-bold text-gray-900">Notification</h2>
            <button 
              onClick={() => setShowMarkAsReadModal(true)} // Open 'Mark all as read' modal
              className="text-yellow-500 font-medium hover:text-yellow-600"
            >
              ✓ Mark all as read
            </button>
          </div>

          {/* Notification List */}
          <div className="px-6 py-4 space-y-4 overflow-y-auto" style={{ height: '450px' }}>
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4 ml-2 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className={`w-12 h-12 mr-2 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <img 
                    src={notification.icon} 
                    alt="notification icon" 
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {notification.subtitle}
                  </p>
                </div>
                <div className="text-gray-400 text-sm flex-shrink-0">
                  {notification.time}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-gray-100 rounded-b-3xl">
            <button 
              onClick={() => setShowClearModal(true)}
              className="text-gray-600 font-medium hover:text-gray-800"
            >
              Clear all notifications
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            {/* Red Circle with Logout Icon */}
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <img 
                src="src/assets/image.png" // IMPORTANT: Replace with the actual path to your white logout icon
                alt="Logout Icon" 
                className="w-10 h-10 object-contain" // Adjust size as needed
              />
            </div>

            {/* Modal Text */}
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Are you sure you want to log Out?
            </h3>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-6 py-3 border-2 ml-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
              <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-sm">Edit</span>
              </button>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="Jason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900" // Added text-gray-900
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <input
                  type="email"
                  defaultValue="jason@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900" // Added text-gray-900
                />
              </div>

              <div className="text-right">
                <button 
                  onClick={handleChangePasswordClick} // New handler
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Change Password
                </button>
              </div>

              <button className="w-full bg-yellow-400 text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors mt-6">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            {/* Red Circle with Logout Icon for Clear All */}
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <img 
                src="src/assets/image.png" // IMPORTANT: Replace with the actual path to your white logout icon
                alt="Clear All Icon" 
                className="w-10 h-10 object-contain" // Adjust size as needed
              />
            </div>

            {/* Modal Text */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Are you sure you want to clear all notifications?
            </h3>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              This action cannot be undone.
            </h3>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleClearAll}
                className="flex-1 px-6 py-3  border-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 px-6 py-3 bg-yellow-400 ml-2 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasswordChange && <PasswordChangeFlow onClose={handleClosePasswordChange} />}
    </div>
  );
}