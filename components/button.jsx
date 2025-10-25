// src/components/Button.jsx
import React from 'react';

const Button = ({ children, primary = false, onClick, className = '' }) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out shadow-sm';
  const primaryClasses = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  const secondaryClasses = 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;