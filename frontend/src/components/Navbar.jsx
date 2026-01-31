import React, { useState, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);

  // Function to calculate the total number of items in the cart
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
    <nav className="flex justify-between items-center py-5 px-8 bg-white shadow-sm sticky top-0 z-50">
      
      {/* Brand Logo */}
      <Link to='/'>
        <div className="text-2xl font-extrabold cursor-pointer tracking-tight">
          <span className="text-gray-800">Urban</span>
          <span className="text-orange-600">Eats</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex list-none gap-8 text-gray-600 font-medium text-lg">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "home" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "menu" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Menu
        </a>
        <a 
          href='#footer' 
          onClick={() => setMenu("contact")} 
          className={`cursor-pointer hover:text-orange-600 transition-all ${menu === "contact" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : ""}`}
        >
          Contact
        </a>
      </ul>

      {/* Right Side Icons & Login */}
      <div className="flex items-center gap-6 md:gap-10">
        <div className="cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <FiSearch size={24} />
        </div>
        
        {/* Cart Icon with Dynamic Item Counter */}
        <div className="relative cursor-pointer text-gray-700 hover:text-orange-600 transition-colors">
          <Link to='/cart'>
            <SlBasket size={24} />
          </Link>
          
          {/* Item Count Badge - Only shows if items > 0 */}
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
              {getTotalItems()}
            </div>
          )}
        </div>

        <button className="bg-transparent border border-orange-600 text-orange-600 px-6 py-2 rounded-full hover:bg-orange-50 transition-all font-semibold cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;