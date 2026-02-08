import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md'; 

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-3 px-[4%] border-b border-gray-300 bg-white'>
      {/* Logo Icon & Name */}
      <div className='flex items-center gap-2'>
        <MdFastfood className='text-orange-500 text-4xl' />
        <span className='font-bold text-xl text-gray-800'>UrbanEats <span className='text-sm text-gray-500 font-normal'>Admin</span></span>
      </div>
      
      {/* Profile Icon */}
      <FaUserCircle className='text-gray-600 text-3xl cursor-pointer hover:text-gray-800 transition-all' />
    </div>
  )
}

export default Navbar