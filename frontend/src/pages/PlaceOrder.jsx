import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className='flex flex-col md:flex-row items-start justify-between gap-12 mt-24 mb-20 max-w-7xl mx-auto px-4'>
      
      {/* Left Side: Delivery Information */}
      <div className='w-full md:max-w-[max(30%,500px)]'>
        <p className='text-3xl font-bold mb-8 text-gray-800'>Delivery Information</p>
        <div className='flex gap-3 mb-4'>
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='First name' required />
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Last name' required />
        </div>
        <input className='w-full border border-gray-300 p-3 rounded outline-orange-600 mb-4' type="email" placeholder='Email address' required />
        <input className='w-full border border-gray-300 p-3 rounded outline-orange-600 mb-4' type="text" placeholder='Street' required />
        <div className='flex gap-3 mb-4'>
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='City' required />
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='State' required />
        </div>
        <div className='flex gap-3 mb-4'>
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Zip code' required />
          <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Country' required />
        </div>
        <input className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Phone' required />
      </div>

      {/* Right Side: Cart Totals */}
      <div className='w-full md:max-w-[40%]'>
        <div className='flex-1 flex flex-col gap-5 bg-gray-50 p-8 rounded-2xl shadow-sm'>
          <h2 className='text-2xl font-bold'>Cart Totals</h2>
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
          <button type='button' className='bg-orange-600 text-white w-full py-3 rounded font-bold hover:bg-orange-700 transition mt-5'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder