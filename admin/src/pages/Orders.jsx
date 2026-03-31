import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
      toast.success("Status Updated");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='p-6 md:p-10 w-full bg-gray-50 min-h-screen'>
      <h3 className='text-2xl font-bold mb-6 text-gray-800'>Order Management</h3>
      <div className='flex flex-col gap-5'>
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-6 border border-orange-200 p-6 text-sm text-gray-700 rounded-xl bg-white shadow-sm hover:shadow-md transition-all'>
            
          
            <div className='w-20 h-20 flex-shrink-0'>
              <img 
                src={url + "/images/" + order.items[0].image} 
                alt="" 
                className='w-full h-full object-cover rounded-lg border border-orange-100 shadow-sm'
              />
            </div>

            <div>
              <p className='font-bold text-gray-900 leading-tight mb-2'>
                {order.items.map((item, i) => (
                  i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                ))}
              </p>
              <p className='font-semibold text-orange-600'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='mt-2 text-gray-500'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='mt-2 font-medium text-gray-800'>{order.address.phone}</p>
            </div>
            <p className='font-semibold text-center'>Items: {order.items.length}</p>
            <p className='font-bold text-lg text-gray-900 text-center'>LKR {order.amount * 320}</p>
            
            <select 
              onChange={(event) => statusHandler(event, order._id)} 
              value={order.status} 
              className='bg-orange-50 border border-orange-300 p-2 outline-none rounded-lg font-medium cursor-pointer focus:ring-2 focus:ring-orange-200 transition-all'
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders