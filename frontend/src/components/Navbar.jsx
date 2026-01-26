import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <nav className="flex justify-between items-center py-5 px-8 bg-white shadow-sm sticky top-0 z-50">
      
      <div className="text-2xl font-extrabold cursor-pointer tracking-tight">
        <span className="text-gray-800">Urban</span>
        <span className="text-orange-600">Eats</span>
      </div>

      <ul className="hidden md:flex list-none gap-8 text-gray-600 font-medium text-lg">
        <li 
          onClick={() => setMenu("home")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "home" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Home
        </li>
        <li 
          onClick={() => setMenu("menu")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "menu" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Menu
        </li>
        <li 
          onClick={() => setMenu("contact")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "contact" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Contact
        </li>
      </ul>

      {/* Icons & Button */}
      <div className="flex items-center gap-6 md:gap-10">
        <div className="cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <FiSearch size={24} />
        </div>
        
        <div className="relative cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <SlBasket size={24} />
          {/* Basket Dot */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-600 rounded-full border-2 border-white"></div>
        </div>

        {/* Login Button */}
        <button className="bg-transparent border border-orange-600 text-orange-600 px-6 py-2 rounded-full hover:bg-orange-50 transition-all font-semibold cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;