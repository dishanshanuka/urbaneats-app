import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { FiCheckCircle, FiClock, FiMapPin, FiPhone, FiHash, FiPackage } from 'react-icons/fi'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error occurred");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
      toast.success("Status Updated Successfully");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='p-4 md:p-8 w-full bg-[#fcfcfc] min-h-screen min-w-0'>
      
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='flex items-center gap-3 mb-10'>
          <div className='w-2 h-10 bg-orange-600 rounded-full'></div>
          <h2 className='text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter'>
            Order <span className='text-orange-600'>Management</span>
          </h2>
        </div>

        <div className='grid gap-6'>
          {orders.map((order, index) => (
            <div 
              key={index} 
              className='bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] p-5 md:p-7 flex flex-col xl:flex-row xl:items-center justify-between gap-6 overflow-hidden'
            >
              
              {/* Section 1: Order Identity & REALISTIC FOOD IMAGE */}
              <div className='flex gap-5 items-start min-w-0 flex-1'>
                <div className='relative shrink-0'>
                  
                  {/* --- REALISTIC FOOD IMAGE (First Item) --- */}
                  <div className='w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white group'>
                    {order.items && order.items.length > 0 ? (
                      <img 
                        src={`${url}/images/${order.items[0].image}`} 
                        alt={order.items[0].name} 
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400'>
                        <FiPackage size={30} />
                      </div>
                    )}
                  </div>
                  
                  {/* Total Items Count Badge */}
                  <div className='absolute -top-2 -right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-lg'>
                    {order.items.length}
                  </div>
                </div>

                <div className='min-w-0 space-y-1.5'>
                  <div className='flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest'>
                    <FiHash className='shrink-0' />
                    <span>ID: {order._id.slice(-6)}</span>
                  </div>
                  <h4 className='text-base font-black text-gray-800 uppercase leading-tight truncate max-w-[280px]'>
                    {order.items.map((item, i) => (
                      i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                    ))}
                  </h4>
                  <p className='text-orange-600 font-black text-lg'>
                    LKR {(order.amount * 320).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Section 2: Delivery Details Card */}
              <div className='flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/80 p-5 rounded-2xl border border-gray-100'>
                <div className='space-y-1'>
                  <p className='text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1'>Recipient</p>
                  <p className='font-bold text-gray-800 text-sm uppercase'>{order.address.firstName} {order.address.lastName}</p>
                  <div className='flex items-center gap-2 text-gray-500 text-xs'>
                    <FiPhone className='text-orange-500' size={12}/>
                    <span>{order.address.phone}</span>
                  </div>
                </div>

                <div className='space-y-1 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4'>
                  <p className='text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1'>Shipping To</p>
                  <div className='flex items-start gap-2 text-gray-500 text-xs'>
                    <FiMapPin className='text-orange-500 shrink-0 mt-0.5' size={14}/>
                    <p className='leading-snug truncate'>
                      {order.address.street}, {order.address.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Status Controls */}
              <div className='flex flex-row xl:flex-col gap-3 min-w-[180px]'>
                <div className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm
                  ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {order.status === "Delivered" ? <FiCheckCircle /> : <FiClock />}
                  {order.status}
                </div>

                <select 
                  onChange={(event) => statusHandler(event, order._id)} 
                  value={order.status} 
                  className='flex-1 bg-white border-2 border-gray-100 p-3 outline-none rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer focus:border-orange-500 transition-all shadow-sm'
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders;