import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          
          <span className="self-center text-2xl font-semibold whitespace-nowrap">MovieApp</span>
        </a>                
      </div>
    </nav>
  );
};

export default Navbar;
