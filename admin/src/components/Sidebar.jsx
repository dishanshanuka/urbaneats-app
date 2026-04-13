import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiGrid, FiPlusCircle, FiShoppingBag, FiSettings, FiActivity } from "react-icons/fi";

const Sidebar = () => {
  
  const activeLink = "bg-orange-50 text-orange-600 border-r-4 border-orange-600 shadow-[inset_0_0_10px_rgba(234,88,12,0.1)]";
  const normalLink = "text-gray-400 hover:bg-gray-50 hover:text-gray-600";
  
  const commonLinkStyle = "flex items-center gap-4 px-8 py-4 cursor-pointer transition-all duration-300 group relative";

  return (
    <div className='w-[20%] lg:w-[18%] min-h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0 overflow-hidden shadow-sm'>
      
      {/* Upper Section */}
      <div className='flex flex-col gap-2 pt-10'>
        <p className='text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-4 ml-8'>Menu</p>

        {/* --- ADD ITEMS --- */}
        <NavLink 
          to='/add' 
          className={({isActive}) => `${commonLinkStyle} ${isActive ? activeLink : normalLink}`}
        >
            <FiPlusCircle className={`text-xl transition-transform duration-300 group-hover:scale-110`} />
            <p className='hidden lg:block font-bold text-[13px] uppercase tracking-wider'>Add Items</p>
        </NavLink>

        {/* --- LIST ITEMS --- */}
        <NavLink 
          to='/list' 
          className={({isActive}) => `${commonLinkStyle} ${isActive ? activeLink : normalLink}`}
        >
            <FiGrid className={`text-xl transition-transform duration-300 group-hover:scale-110`} />
            <p className='hidden lg:block font-bold text-[13px] uppercase tracking-wider'>Inventory</p>
        </NavLink>

        {/* --- ORDERS --- */}
        <NavLink 
          to='/orders' 
          className={({isActive}) => `${commonLinkStyle} ${isActive ? activeLink : normalLink}`}
        >
            <FiShoppingBag className={`text-xl transition-transform duration-300 group-hover:scale-110`} />
            <p className='hidden lg:block font-bold text-[13px] uppercase tracking-wider'>Orders</p>
        </NavLink>
      </div>

      {/* Lower Section (Stats/Setting - Dummy links for UI look) */}
      <div className='mt-auto mb-10'>
        <p className='text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-4 ml-8'>System</p>
        
        <div className='flex items-center gap-4 px-8 py-4 text-gray-400 cursor-not-allowed group'>
            <FiActivity className='text-xl' />
            <p className='hidden lg:block font-bold text-[13px] uppercase tracking-wider'>Analytics</p>
        </div>

        {/* Admin Pro Card */}
        <div className='mx-6 mt-6 p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] shadow-xl relative overflow-hidden'>
            <div className='absolute -right-4 -top-4 w-16 h-16 bg-orange-600/20 rounded-full blur-2xl'></div>
            <div className='relative z-10'>
                <p className='text-[10px] font-black text-orange-500 uppercase mb-1 tracking-widest'>Admin Pro</p>
                <div className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-ping'></div>
                    <p className='text-[9px] text-gray-400 font-medium tracking-tight'>System Online</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar