import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 350,
    }

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error occurred while placing order");
      }
    } catch (error) {
      console.log(error);
      alert("Payment Error");
    }
  }

  return (
    <form onSubmit={placeOrder} className='flex flex-col lg:flex-row items-start justify-between gap-12 mt-32 md:mt-40 mb-20 max-w-7xl mx-auto px-6 font-sans'>
      
      {/* Left Side: Delivery Information */}
      <div className='w-full lg:max-w-[550px]'>
        <div className='mb-10'>
            <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tighter'>
                Delivery <span className='text-orange-600'>Information</span>
            </h2>
            <div className='w-20 h-1.5 bg-orange-600 mt-2 rounded-full'></div>
        </div>
        
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='FIRST NAME' />
                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='LAST NAME' />
            </div>

            <input required name='email' onChange={onChangeHandler} value={data.email} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="email" placeholder='EMAIL ADDRESS' />
            <input required name='street' onChange={onChangeHandler} value={data.street} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='STREET' />
            
            <div className='flex flex-col sm:flex-row gap-4'>
                <input required name='city' onChange={onChangeHandler} value={data.city} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='CITY' />
                <input required name='state' onChange={onChangeHandler} value={data.state} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='STATE / PROVINCE' />
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='ZIP CODE' />
                <input required name='country' onChange={onChangeHandler} value={data.country} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='COUNTRY' />
            </div>

            <input required name='phone' onChange={onChangeHandler} value={data.phone} className='w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-orange-500/30 transition-all font-bold text-xs tracking-widest bg-gray-50/50' type="text" placeholder='PHONE NUMBER' />
        </div>
      </div>

      {/* Right Side: Cart Totals */}
      <div className='w-full lg:max-w-[420px]'>
        <div className='flex flex-col gap-6 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100/50'>
          <h2 className='text-2xl font-black text-gray-900 uppercase tracking-tighter'>Summary</h2>
          
          <div className='space-y-4'>
            <div className='flex justify-between text-gray-400 font-bold uppercase text-[11px] tracking-widest'>
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount().toLocaleString()}</p>
            </div>
            <hr className='border-gray-50' />
            <div className='flex justify-between text-gray-400 font-bold uppercase text-[11px] tracking-widest'>
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount() === 0 ? 0 : 350}</p>
            </div>
            <hr className='border-gray-200 shadow-sm' />
            <div className='flex justify-between text-xl font-black text-gray-900 uppercase tracking-tighter pt-2'>
              <p>Total</p>
              <p className='text-orange-600'>LKR {(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 350).toLocaleString()}</p>
            </div>
          </div>

          <button type='submit' className='bg-orange-600 text-white w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 mt-6 shadow-xl shadow-orange-100 text-xs'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;