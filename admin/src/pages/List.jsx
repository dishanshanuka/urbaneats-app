import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiTrash2, FiTag, FiDollarSign } from 'react-icons/fi'

const List = () => {

  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to retrieve food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Backend server might be offline");
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error occurred while removing the item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='p-8 bg-[#fcfcfc] min-h-screen w-full lg:w-[80%]'>
      <div className='max-w-6xl mx-auto'>
        
        {/* Header Section */}
        <div className='flex items-center gap-3 mb-10'>
          <div className='w-2 h-10 bg-orange-600 rounded-full'></div>
          <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tighter'>
            Food <span className='text-orange-600'>Inventory</span>
          </h2>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Table Header - Only visible on medium screens and up */}
          <div className="hidden md:grid grid-cols-[1fr_2.5fr_1.5fr_1fr_1fr] items-center gap-4 p-6 bg-gray-50/50 border-b border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <p>Product</p>
            <p>Description</p>
            <p className='text-center'>Category</p>
            <p className='text-center'>Price</p>
            <p className='text-center'>Action</p>
          </div>

          <div className='divide-y divide-gray-50'>
            {list.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2.5fr_1.5fr_1fr_1fr] items-center gap-4 p-6 hover:bg-gray-50/50 transition-all group">
                  
                  {/* Image Container */}
                  <div className='relative'>
                    <img 
                      className='w-16 h-16 object-cover rounded-2xl shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-300' 
                      src={`${url}/images/` + item.image} 
                      alt={item.name} 
                    />
                  </div>

                  {/* Name & Details */}
                  <div className='flex flex-col'>
                    <p className='font-black text-gray-800 text-base uppercase leading-tight'>{item.name}</p>
                    <p className='text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest'>SKU: FD-{item._id.slice(-5)}</p>
                  </div>

                  {/* Category Badge */}
                  <div className='hidden md:flex justify-center'>
                    <span className='flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100'>
                      <FiTag size={12}/>
                      {item.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className='flex justify-center'>
                    <p className='flex items-center gap-1 font-black text-gray-900 text-lg tracking-tighter'>
                      <span className='text-orange-600 text-sm'>$</span>{item.price}
                    </p>
                  </div>

                  {/* Delete Action */}
                  <div className='flex justify-center'>
                    <div 
                      onClick={() => removeFood(item._id)} 
                      className='p-3 bg-red-50 text-red-500 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm'
                    >
                      <FiTrash2 size={18} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {list.length === 0 && (
            <div className='text-center py-20 text-gray-400 font-bold uppercase tracking-widest'>
              Inventory is empty
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List