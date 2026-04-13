import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='mt-40 mb-20 font-sans'> 
      <div className='max-w-7xl mx-auto px-4'>
        
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[11px] font-black uppercase tracking-widest border-b pb-6 px-4'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p className='text-center'>Quantity</p>
              <p>Total</p>
              <p className='text-center'>Remove</p>
            </div>

            {/* Backend Data Rendering */}
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-sm py-6 border-b px-4 hover:bg-gray-50/50 transition border-gray-100 group'>
                    
                    <img src={url + "/images/" + item.image} alt={item.name} className='w-16 h-16 object-cover rounded-2xl shadow-sm border-2 border-white group-hover:scale-105 transition-transform duration-300' />
                    
                    <p className='font-black text-gray-900 uppercase tracking-tighter text-base'>{item.name}</p>
                    
                    <p className='font-bold text-gray-500 text-xs uppercase tracking-widest'>LKR {item.price.toLocaleString()}</p>
                    
                    <div className='flex justify-center'>
                        <p className='bg-orange-50 text-orange-600 w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs shadow-sm border border-orange-100'>{cartItems[item._id]}</p>
                    </div>
                    
                    <p className='font-black text-gray-900 text-base tracking-tighter'>LKR {(item.price * cartItems[item._id]).toLocaleString()}</p>
                    
                    {/* Updated Remove Button */}
                    <div className='flex justify-center'>
                        <button 
                            onClick={() => removeFromCart(item._id)} 
                            className='p-3 bg-red-50 text-red-500 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm border border-red-100 active:scale-90 group'
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>

                  </div>
                )
              }
              return null;
            })}
          </div>
        </div>

        {/* Totals Section */}
        <div className='mt-24 flex flex-col-reverse md:flex-row justify-between gap-12'>
          <div className='flex-1 flex flex-col gap-6 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100/50'>
            <h2 className='text-2xl font-black text-gray-900 uppercase tracking-tighter'>Cart Totals</h2>
            <div className='space-y-4 font-bold'>
              <div className='flex justify-between text-gray-400 uppercase text-[10px] tracking-widest'>
                <p>Subtotal</p>
                <p>LKR {getTotalCartAmount().toLocaleString()}</p>
              </div>
              <hr className='border-gray-50' />
              <div className='flex justify-between text-gray-400 uppercase text-[10px] tracking-widest'>
                <p>Delivery Fee</p>
                <p>LKR {getTotalCartAmount() === 0 ? 0 : 350}</p>
              </div>
              <hr className='border-gray-200' />
              <div className='flex justify-between text-xl font-black text-gray-900 uppercase tracking-tighter pt-2'>
                <p>Total</p>
                <p className='text-orange-600'>LKR {getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 350).toLocaleString()}</p>
              </div>
            </div>
            <button onClick={() => navigate('/order')} className='bg-orange-600 text-white w-full py-5 rounded-[1.5rem] font-black hover:bg-black transition-all active:scale-95 shadow-xl shadow-orange-100 uppercase tracking-widest text-[11px] mt-4'>
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Promo Code */}
          <div className='flex-1 lg:pl-20'>
            <p className='text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4'>Promo Code</p>
            <div className='flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-2 focus-within:border-orange-500/30 transition-all'>
              <input type="text" placeholder='ENTER CODE' className='bg-transparent border-none outline-none px-6 py-3 flex-1 text-[11px] font-black tracking-widest placeholder:text-gray-300' />
              <button className='bg-black text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition font-black text-[10px] uppercase tracking-widest shadow-lg'>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart