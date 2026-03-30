import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FoodItem = ({ id, name, price, description, image }) => {
  
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='rounded-2xl shadow-md bg-white overflow-hidden border border-gray-100 hover:shadow-xl transition-all relative'>
      <div className='relative'>
        
        
        <img 
          src={url + "/images/" + image} 
          alt={name} 
          className='w-full h-48 object-cover' 
        />
        
        {!cartItems[id] 
          ? <button 
              onClick={() => addToCart(id)} 
              className='absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-orange-600 hover:scale-110 transition cursor-pointer'
            >
              <FaPlus />
            </button>
          : <div className='absolute bottom-3 right-3 flex items-center gap-3 bg-white p-2 rounded-full shadow-md'>
              <FaMinus onClick={() => removeFromCart(id)} className='text-red-500 cursor-pointer hover:scale-110 transition' />
              <p className='font-bold text-gray-800'>{cartItems[id]}</p>
              <FaPlus onClick={() => addToCart(id)} className='text-green-600 cursor-pointer hover:scale-110 transition' />
            </div>
        }
      </div>

      <div className='p-5'>
        <p className='text-lg font-bold text-gray-800'>{name}</p>
        <p className='text-gray-500 text-sm my-2 leading-relaxed'>{description}</p>
        <div className='flex justify-between items-center'>
            <p className='text-orange-600 text-xl font-bold'>${price}</p>
            
        </div>
      </div>
    </div>
  )
}

export default FoodItem;