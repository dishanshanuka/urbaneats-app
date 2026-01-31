import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='mt-24 mb-20'>
      <div className='max-w-7xl mx-auto px-4'>
        
        {/* Cart Items Table Container */}
        <div className="overflow-x-auto">
          {/* We set a min-width so the table doesn't squash on mobile */}
          <div className="min-w-[700px]">
            <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-sm border-b pb-2 px-2'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] items-center text-sm py-4 border-b px-2 hover:bg-gray-50 transition'>
                    <img src={item.image} alt="" className='w-12 h-12 object-cover rounded' />
                    <p className='font-medium text-gray-800'>{item.name}</p>
                    <p>${item.price}</p>
                    <p className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded'>{cartItems[item._id]}</p>
                    <p className='font-bold'>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cursor-pointer text-red-500 font-bold hover:scale-125 transition w-fit px-2'>x</p>
                  </div>
                )
              }
              return null;
            })}
          </div>
        </div>

        {/* Cart Bottom Section - Changes from column to row on md screens */}
        <div className='mt-20 flex flex-col-reverse md:flex-row justify-between gap-12'>
          
          {/* Totals Section */}
          <div className='flex-1 flex flex-col gap-5'>
            <h2 className='text-2xl font-bold text-gray-800'>Cart Totals</h2>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='flex justify-between text-gray-600'>
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className='flex justify-between text-lg font-bold text-gray-800'>
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button 
              onClick={() => navigate('/order')} 
              className='bg-orange-600 text-white w-full md:w-64 py-3 rounded font-bold hover:bg-orange-700 transition active:scale-95 mt-5 shadow-md'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Promo Code Section */}
          <div className='flex-1'>
            <p className='text-gray-500 text-sm'>If you have a promo code, Enter it here</p>
            <div className='mt-3 flex items-center bg-gray-100 rounded overflow-hidden'>
              <input type="text" placeholder='promo code' className='bg-transparent border-none outline-none px-4 py-3 flex-1' />
              <button className='bg-gray-800 text-white px-6 md:px-10 py-3 hover:bg-black transition'>Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart