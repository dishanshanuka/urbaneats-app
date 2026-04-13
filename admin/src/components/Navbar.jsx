import React from 'react'
import { FiUser, FiBell } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-8 md:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm'>
      
      {/* Brand Logo Section */}
      <Link to='/' className='flex items-center gap-3 group'>
        <div className='bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform duration-300'>
            <div className='text-white font-black text-xl'>U</div>
        </div>
        <div className='flex flex-col'>
            <span className='font-black text-2xl text-gray-900 tracking-tighter leading-none'>
                URBAN<span className='text-orange-600'>EATS</span>
            </span>
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1'>
                Admin <span className='text-orange-500'>Dashboard</span>
            </span>
        </div>
      </Link>
      
      {/* Right Side: Notifications & Profile */}
      <div className='flex items-center gap-6'>
        
        {/* Notification Icon */}
        <div className='relative cursor-pointer text-gray-400 hover:text-orange-600 transition-colors hidden sm:block'>
            <FiBell size={22} />
            <span className='absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full border-2 border-white'></span>
        </div>

        {/* Profile Section */}
        <div className='flex items-center gap-3 border-l pl-6 border-gray-100'>
            <div className='hidden md:block text-right'>
                <p className='text-xs font-black text-gray-800 uppercase tracking-tighter'>Dishan Shanuka</p>
                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Super Admin</p>
            </div>
            <div className='w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center text-white cursor-pointer hover:bg-orange-600 transition-all shadow-md active:scale-90'>
                <FiUser size={20} />
            </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar