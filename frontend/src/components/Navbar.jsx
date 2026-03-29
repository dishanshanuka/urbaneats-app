import React, { useState, useContext } from 'react';
import { FiSearch, FiUser, FiLogOut, FiPackage } from "react-icons/fi"; 
import { SlBasket } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const getTotalItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  }

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <nav className="flex justify-between items-center py-4 px-4 md:px-8 bg-white shadow-sm sticky top-0 z-50">
      
      {/* Brand Logo */}
      <Link to='/'>
        <div className="text-xl md:text-2xl font-extrabold cursor-pointer tracking-tight">
          <span className="text-gray-800">Urban</span>
          <span className="text-orange-600">Eats</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex list-none gap-8 text-gray-600 font-medium text-lg">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "pb-1 border-b-2 border-orange-600 text-gray-900" : "cursor-pointer hover:text-orange-600 transition-all"}>Contact</a>
      </ul>

      {/* Right Side Icons & Login */}
      <div className="flex items-center gap-4 md:gap-8">
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

        {!token ? (
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-transparent border border-orange-600 text-orange-600 px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-orange-50 transition-all font-semibold cursor-pointer text-sm md:text-base"
          >
            Login
          </button>
        ) : (

          <div className='relative group'>
            <div className='p-1 border-2 border-transparent hover:border-orange-600 rounded-full transition-all'>
               <FiUser className='text-2xl md:text-3xl cursor-pointer text-gray-700 hover:text-orange-600' />
            </div>
            
            <ul className='absolute right-0 hidden group-hover:flex flex-col gap-3 bg-white border border-gray-100 py-4 px-5 rounded-xl shadow-xl z-50 min-w-[160px] animate-fade-in'>
              <li onClick={() => navigate('/myorders')} className='flex items-center gap-3 cursor-pointer hover:text-orange-600 transition group/item'>
                <FiPackage className='text-xl group-hover/item:scale-110 transition' /> 
                <p className='font-medium'>Orders</p>
              </li>
              <hr className='border-gray-50' />
              <li onClick={logout} className='flex items-center gap-3 cursor-pointer hover:text-red-600 transition group/item'>
                <FiLogOut className='text-xl group-hover/item:scale-110 transition' /> 
                <p className='font-medium'>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;