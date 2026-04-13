import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FoodItem = ({ id, name, price, description, image }) => {
  
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const imageSource = image.startsWith('http') 
    ? image 
    : (url ? `${url}/images/${image}` : `/assets/${image}`);

  return (
    <div className='group rounded-[2.5rem] shadow-sm bg-white overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 relative'>
      <div className='relative overflow-hidden'>
        
        <img 
          src={imageSource} 
          alt={name} 
          className='w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110' 
        />
        
        {/* Item Counter Overlay */}
        <div className='absolute bottom-4 right-4'>
          {!cartItems[id] 
            ? <button 
                onClick={() => addToCart(id)} 
                className='bg-white p-3 rounded-2xl shadow-xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-gray-50'
              >
                <FaPlus size={18} />
              </button>
            : <div className='flex items-center gap-4 bg-white p-2 rounded-2xl shadow-2xl border border-gray-50 animate-fade-in'>
                <div 
                  onClick={() => removeFromCart(id)} 
                  className='bg-orange-50 p-2 rounded-xl text-orange-600 cursor-pointer hover:bg-orange-600 hover:text-white transition-all'
                >
                  <FaMinus size={14} />
                </div>
                <p className='font-black text-gray-800 text-sm'>{cartItems[id]}</p>
                <div 
                  onClick={() => addToCart(id)} 
                  className='bg-orange-600 p-2 rounded-xl text-white cursor-pointer hover:bg-orange-500 transition-all'
                >
                  <FaPlus size={14} />
                </div>
              </div>
          }
        </div>
      </div>

      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <p className='text-lg font-black text-gray-900 uppercase tracking-tighter leading-tight'>{name}</p>
        </div>
        <p className='text-gray-400 text-[13px] font-medium my-3 leading-relaxed line-clamp-2'>{description}</p>
        
        <div className='flex justify-between items-center mt-4'>
            <div className='flex flex-col'>
              <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Price</span>
              <p className='text-orange-600 text-xl font-black tracking-tighter'>
                LKR {price.toLocaleString()}
              </p>
            </div>
            <div className='flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full'>
              <span className='text-orange-600 text-xs font-black'>4.5</span>
              <span className='text-orange-400 text-xs'>★</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem;