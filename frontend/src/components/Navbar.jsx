import React, { useState, useContext, useEffect } from 'react';
import { FiSearch, FiUser, FiX, FiLogOut, FiShoppingBag } from "react-icons/fi"; 
import { SlBasket } from "react-icons/sl";
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  const { cartItems, token, setToken, search, setSearch } = useContext(StoreContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Navigation logic for sections
  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleHomeClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

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
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center z-[100] transition-all duration-500 py-5 px-10 md:px-20
      ${!isHomePage 
        ? "bg-black shadow-xl" 
        : (isScrolled ? "bg-black/90 backdrop-blur-lg shadow-2xl" : "bg-transparent")
      }`}>
      
      {/* Brand Logo */}
      <div onClick={handleHomeClick} className="cursor-pointer">
        <div className="text-2xl md:text-3xl font-black tracking-tighter text-white">
          Urban<span className="text-orange-500">Eats</span>
        </div>
      </div>

      {/* Navigation Links - Updated only the Home link part */}
      {!showSearchInput && (
        <ul className="hidden lg:flex list-none gap-10 text-white font-bold text-[13px] uppercase tracking-[0.2em]">
          <span 
            onClick={handleHomeClick} 
            className="hover:text-orange-500 transition-all cursor-pointer"
          >
            Home
          </span>
          <span 
            onClick={() => scrollToSection('explore-menu')} 
            className="hover:text-orange-500 transition-all cursor-pointer"
          >
            Menu
          </span>
          <span 
            onClick={() => scrollToSection('footer')} 
            className="hover:text-orange-500 transition-all cursor-pointer"
          >
            Contact
          </span>
        </ul>
      )}

      {/* Right Side Icons */}
      <div className="flex items-center gap-5 md:gap-8 text-white">
        
        {/* Search Bar */}
        <div className="flex items-center relative">
          <div className={`flex items-center transition-all duration-300 ${showSearchInput ? "w-40 md:w-64 opacity-100 bg-white/10 px-4 py-2 rounded-full border border-white/20" : "w-0 opacity-0 overflow-hidden"}`}>
            <input 
              autoFocus
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes..."
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-gray-400 font-medium"
            />
            <FiX 
              className="cursor-pointer text-gray-400 hover:text-white ml-2" 
              onClick={() => { setShowSearchInput(false); setSearch(""); }} 
            />
          </div>
          {!showSearchInput && (
            <FiSearch 
              className="text-2xl cursor-pointer hover:text-orange-500 transition-transform hover:scale-110" 
              onClick={() => setShowSearchInput(true)} 
            />
          )}
        </div>
        
        {/* Basket Icon */}
        <div className="relative cursor-pointer hover:text-orange-500 transition-transform hover:scale-110">
          <Link to='/cart'><SlBasket className="text-2xl" /></Link>
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-black shadow-lg">
              {getTotalItems()}
            </div>
          )}
        </div>

        {/* User Dropdown */}
        {!token ? (
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-orange-500 text-white px-8 py-2.5 rounded-full hover:bg-white hover:text-orange-600 transition-all font-black text-[11px] uppercase tracking-wider"
          >
            Login
          </button>
        ) : (
          <div className='group relative'>
              <div className='border-2 border-orange-500 rounded-full p-1.5 cursor-pointer hover:bg-orange-500 transition-all'>
                <FiUser className='text-xl' />
              </div>
              <ul className='absolute right-0 top-full mt-4 bg-white text-black p-5 rounded-2xl shadow-2xl flex flex-col gap-4 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-gray-100'>
                <li onClick={()=>navigate('/myorders')} className='flex items-center gap-3 cursor-pointer hover:text-orange-600 font-bold text-xs uppercase tracking-wider'>
                  <FiShoppingBag className='text-lg' /> My Orders
                </li>
                <hr className='border-gray-50' />
                <li onClick={logout} className='flex items-center gap-3 cursor-pointer hover:text-red-600 font-bold text-xs uppercase tracking-wider'>
                  <FiLogOut className='text-lg' /> Logout
                </li>
              </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;