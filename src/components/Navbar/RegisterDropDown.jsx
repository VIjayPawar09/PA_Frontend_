
import React, { useState, useEffect } from "react";

// RegisterDropDown Component
export const RegisterDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center"
      >
        Register
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              toggleDropdown();
              window.openRegistrationModal("assistant");
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors"
          >
            Register as Assistant
          </button>
          <button
            onClick={() => {
              toggleDropdown();
              window.openRegistrationModal("customer");
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors"
          >
            Register as Customer
          </button>
        </div>
      )}
    </div>
  );
};