import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-900 border-gray-200 fixed top-0 z-10 w-full ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">
            MovieApp
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
