import React, { useState } from 'react';
import { X, Eye, EyeOff, Check } from 'lucide-react';

export default function PasswordChangeFlow() {
  const [currentModal, setCurrentModal] = useState('verification'); // 'verification', 'change', 'success'
  const [verificationCode, setVerificationCode] = useState(['8', '7', '0', '7', '5', '3']);
  const [currentPassword, setCurrentPassword] = useState('**********');
  const [newPassword, setNewPassword] = useState('**********');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleVerificationConfirm = () => {
    setCurrentModal('change');
  };

  const handlePasswordUpdate = () => {
    setCurrentModal('success');
  };

  const closeModal = () => {
    setCurrentModal('verification');
  };

  // Verification Code Modal
  const VerificationModal = () => (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-md mx-auto" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
      {/* Header */}
      <div className="flex justify-end p-4 border-b border-gray-100">
        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 pb-8">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-black mb-3">Verification Code</h1>
            <p className="text-gray-500 text-base">
              We have sent a verification code to your registered email ID
            </p>
          </div>

          {/* Code Input */}
          <div className="flex justify-center gap-3">
            {verificationCode.map((digit, index) => (
              <div
                key={index}
                className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-2xl font-semibold text-black border border-gray-200"
              >
                {digit}
              </div>
            ))}
          </div>

          {/* Resend */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Resend code in: 00:{countdown.toString().padStart(2, '0')}
            </p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleVerificationConfirm}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 rounded-2xl text-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  // Change Password Modal
  const ChangePasswordModal = () => (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-md mx-auto" style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }}>
      {/* Header */}
      <div className="flex justify-end p-4 border-b border-gray-100">
        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 pb-8">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-black">Change Password</h1>
          </div>

          {/* Password Fields */}
          <div className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handlePasswordUpdate}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 rounded-2xl text-lg transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );

  // Success Modal
  const SuccessModal = () => (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-md mx-auto" >
      {/* Content */}
      <div className="p-8 py-12">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={40} className="text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div>
            <h1 className="text-2xl font-bold text-black leading-tight">
              Your Password has been<br />
              Successfully Changed!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4"style={{ background: 'linear-gradient(to right, #FBFFED, #FFF7F6)' }} >
      <div className="w-full max-w-md">
        {currentModal === 'verification' && <VerificationModal />}
        {currentModal === 'change' && <ChangePasswordModal />}
        {currentModal === 'success' && <SuccessModal />}
      </div>
    </div>
  );
}

// This component handles the password change flow with three modals: