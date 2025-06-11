// src/components/VipPopup.jsx
import React from 'react';

export default function VipPopup({ onClose, onVipLogin, onNotVip }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[200] p-4 font-body">
      <div 
        className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-2xl border border-cream/20 text-cream text-center max-w-md w-full animate-popupEnter"
      >
        <h2 className="text-3xl font-fancy-title mb-6">A Moment of Revelation...</h2>
        <p className="text-xl mb-8">Are you a Ghorpha 27 VIP member?</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={onVipLogin}
            className="bg-blood-red text-white py-3 px-6 hover:bg-opacity-80 transition-all duration-300 rounded-sm text-lg font-semibold"
          >
            Yes, I am VIP
          </button>
          <button
            onClick={onNotVip}
            className="bg-gray-600 text-cream py-3 px-6 hover:bg-gray-500 transition-all duration-300 rounded-sm text-lg"
          >
            Not Yet
          </button>
        </div>
        <button
            onClick={onClose}
            className="absolute top-3 right-4 text-cream/70 hover:text-cream text-3xl transition-colors"
            aria-label="Close pop-up"
        >
            &times;
        </button>
      </div>
    </div>
  );
}