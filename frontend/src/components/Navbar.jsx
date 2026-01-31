import React, { useState, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems } = useContext(StoreContext);

  const getTotalItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  }

  return (
    // px-4 for mobile, px-8 for desktop
    <nav className="flex justify-between items-center py-4 px-4 md:px-8 bg-white shadow-sm sticky top-0 z-50">
      
      {/* Brand Logo - text-xl for mobile, text-2xl for desktop */}
      <Link to='/'>
        <div className="text-xl md:text-2xl font-extrabold cursor-pointer tracking-tight">
          <span className="text-gray-800">Urban</span>
          <span className="text-orange-600">Eats</span>
        </div>
      </Link>

      {/* Navigation Links - Hidden on mobile (hidden), shown on medium+ screens (md:flex) */}
      <ul className="hidden md:flex list-none gap-8 text-gray-600 font-medium text-lg">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Contact</a>
      </ul>

      {/* Right Side Icons & Login */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Smaller icons on mobile */}
        <div className="cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <FiSearch className="text-[20px] md:text-[24px]" />
        </div>
        
        <div className="relative cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <Link to='/cart'>
            <SlBasket className="text-[20px] md:text-[24px]" />
          </Link>
          
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-orange-600 text-white text-[8px] md:text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
              {getTotalItems()}
            </div>
          )}
        </div>

        {/* Login Button - Adjusted padding for mobile */}
        <button 
          onClick={() => setShowLogin(true)}
          className="bg-transparent border border-orange-600 text-orange-600 px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-orange-50 transition-all font-semibold cursor-pointer text-sm md:text-base"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;