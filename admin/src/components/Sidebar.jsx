import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAddCircleOutline } from "react-icons/io"; // Add icon
import { MdFormatListBulleted } from "react-icons/md"; // List icon
import { HiOutlineClipboardList } from "react-icons/hi"; // Orders icon

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>
      <div className='flex flex-col gap-5 pt-12 pl-[20%]'>
        
        {/* Add Items Link */}
        <NavLink to='/add' className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-lg cursor-pointer transition-all ${isActive ? "bg-[#fff0ed] border-orange-500" : ""}`}>
            <IoMdAddCircleOutline className='text-2xl' />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>

        {/* List Items Link */}
        <NavLink to='/list' className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-lg cursor-pointer transition-all ${isActive ? "bg-[#fff0ed] border-orange-500" : ""}`}>
            <MdFormatListBulleted className='text-2xl' />
            <p className='hidden md:block'>List Items</p>
        </NavLink>

        {/* Orders Link */}
        <NavLink to='/orders' className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-lg cursor-pointer transition-all ${isActive ? "bg-[#fff0ed] border-orange-500" : ""}`}>
            <HiOutlineClipboardList className='text-2xl' />
            <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar