import React, { useState, useContext, useEffect } from 'react';
import { FiSearch, FiUser } from "react-icons/fi"; 
import { SlBasket } from "react-icons/sl";
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTotalItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalItems += cartItems[item];
    }
    return totalItems;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center z-[100] transition-all duration-300 py-5 px-10 md:px-20
      ${!isHomePage 
        ? "bg-[#1f1d1d] shadow-xl" 
        : (isScrolled ? "bg-black/80 backdrop-blur-md shadow-xl" : "bg-transparent")
      }`}>
      
      {/* Brand Logo */}
      <Link to='/'>
        <div className="text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter text-white">
          Urban<span className="text-orange-500">Eats</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex list-none gap-10 text-white font-medium text-lg uppercase tracking-wide">
        <Link to='/' onClick={() => setMenu("home")} className="relative cursor-pointer hover:text-orange-500 transition-all">Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className="relative cursor-pointer hover:text-orange-500 transition-all">Menu</a>
        <a href='#footer' onClick={() => setMenu("contact")} className="relative cursor-pointer hover:text-orange-500 transition-all">Contact</a>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6 md:gap-8 text-white">
        <FiSearch className="text-2xl cursor-pointer hover:text-orange-500" />
        
        <div className="relative cursor-pointer hover:text-orange-500">
          <Link to='/cart'><SlBasket className="text-2xl" /></Link>
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-lg">
              {getTotalItems()}
            </div>
          )}
        </div>

        {!token ? (
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-transparent border border-orange-500 text-white px-7 py-1.5 rounded-full hover:bg-orange-500 transition-all font-bold text-sm uppercase"
          >
            Login
          </button>
        ) : (
          <div className='border-2 border-orange-500 rounded-full p-1'>
             <FiUser className='text-2xl cursor-pointer' />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;