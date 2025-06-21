import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#fffce8] via-[#fff5eb] to-[#fff2f8] overflow-x-hidden px-4">
      <div className="bg-white rounded-2xl shadow-md px-6 py-8 w-full max-w-sm text-center">
        
        {/* Top Icon */}
        <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
          <img
            src="/material-symbols_logout.png"
            alt="Logout icon"
            className="w-6 h-6 object-contain"
          />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl font-bold mb-1">Log In to Access your Panel</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Facilisis cursus ultrices arcu
          sit pellentesque vitae leo felis.
        </p>

        {/* Login Form */}
        <form className="flex flex-col gap-4 text-left">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md transition"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}