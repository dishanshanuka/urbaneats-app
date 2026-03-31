import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  // 1. save delivery information to state
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  })

  // 2. update delivery information state when user types in the form
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  // 3. place order when user submits the form
  const placeOrder = async (event) => {
    event.preventDefault();
    
    // get cart items from cartItems state and prepare order data to send to backend
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
      amount: getTotalCartAmount() + 2,
    }

    try {
      // send order data to backend to create order and get Stripe checkout session URL
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
    <form onSubmit={placeOrder} className='flex flex-col lg:flex-row items-start justify-between gap-12 mt-12 md:mt-24 mb-20 max-w-7xl mx-auto px-4'>
      
      {/* Left Side: Delivery Information */}
      <div className='w-full lg:max-w-[max(30%,500px)]'>
        <p className='text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center lg:text-left'>
            Delivery Information
        </p>
        
        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} className='w-full border border-gray-300 p-3 rounded outline-orange-600 mb-4' type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} className='w-full border border-gray-300 p-3 rounded outline-orange-600 mb-4' type="text" placeholder='Street' />
        
        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <input required name='city' onChange={onChangeHandler} value={data.city} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='State' />
        </div>

        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} className='w-full border border-gray-300 p-3 rounded outline-orange-600' type="text" placeholder='Phone' />
      </div>

      {/* Right Side: Cart Totals */}
      <div className='w-full lg:max-w-[40%]'>
        <div className='flex flex-col gap-5 bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100'>
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
          <button type='submit' className='bg-orange-600 text-white w-full py-3 rounded font-bold hover:bg-orange-700 transition active:scale-95 mt-5 shadow-md'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;