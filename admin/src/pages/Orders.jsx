import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { 
  FiCheckCircle, 
  FiClock, 
  FiMapPin, 
  FiPhone, 
  FiHash, 
  FiPackage, 
  FiTruck, 
  FiChevronDown 
} from 'react-icons/fi'

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
    <div className='p-4 md:p-8 w-full bg-[#fcfcfc] min-h-screen min-w-0 font-sans'>
      
      <div className='max-w-7xl mx-auto'>
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
              className='bg-white border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 rounded-[2.5rem] p-5 md:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8 overflow-hidden'
            >
              
              {/* Section 1: Order Identity & Image */}
              <div className='flex gap-6 items-center min-w-0 flex-1'>
                <div className='relative shrink-0'>
                  <div className='w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-lg border-2 border-white group'>
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
                  <div className='absolute -top-2 -right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-black text-[10px] border-2 border-white shadow-lg'>
                    {order.items.length}
                  </div>
                </div>

                <div className='min-w-0 space-y-1.5'>
                  <div className='flex items-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]'>
                    <FiHash className='shrink-0' />
                    <span>ID: {order._id.slice(-6)}</span>
                  </div>
                  
                  <h4 className='text-[11px] md:text-[13px] font-bold text-gray-700 uppercase leading-snug line-clamp-2 max-w-[280px]'>
                    {order.items.map((item, i) => (
                      i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                    ))}
                  </h4>

                  <p className='text-gray-900 font-black text-xl tracking-tighter'>
                    <span className='text-orange-600 text-xs mr-1 uppercase'>LKR</span>
                    {Number(order.amount).toLocaleString()}.00
                  </p>
                </div>
              </div>

              {/* Section 2: Delivery Details Card */}
              <div className='flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-[2.2rem] border border-gray-100'>
                <div className='space-y-2'>
                  <p className='text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]'>Recipient</p>
                  <p className='font-black text-gray-800 text-[11px] uppercase tracking-tight'>{order.address.firstName} {order.address.lastName}</p>
                  <div className='flex items-center gap-2 text-gray-500 text-[11px] font-bold'>
                    <FiPhone className='text-orange-500' size={12}/>
                    <span>{order.address.phone}</span>
                  </div>
                </div>

                <div className='space-y-2 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6'>
                  <p className='text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]'>Shipping To</p>
                  <div className='flex items-start gap-2 text-gray-500 text-[10.5px] font-bold'>
                    <FiMapPin className='text-orange-500 shrink-0 mt-0.5' size={14}/>
                    <p className='leading-relaxed uppercase tracking-tight'>
                      {order.address.street}, {order.address.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Status Controls with Custom Dropdown Icon */}
              <div className='flex flex-row xl:flex-col gap-3 min-w-[220px]'>
                <div 
                  className='flex-1 flex items-center justify-center gap-2 py-4 px-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm border transition-all duration-300'
                  style={{ 
                    backgroundColor: order.status.toLowerCase() === "food processing" ? "#fef2f2" : 
                                    order.status.toLowerCase() === "out for delivery" ? "#fff7ed" : "#f0fdf4",
                    color: order.status.toLowerCase() === "food processing" ? "#dc2626" : 
                           order.status.toLowerCase() === "out for delivery" ? "#ea580c" : "#16a34a",
                    borderColor: order.status.toLowerCase() === "food processing" ? "#fee2e2" : 
                                 order.status.toLowerCase() === "out for delivery" ? "#ffedd5" : "#dcfce7"
                  }}
                >
                  {order.status.toLowerCase() === "food processing" && <FiClock className='animate-spin' style={{animationDuration: '3s'}}/>}
                  {order.status.toLowerCase() === "out for delivery" && <FiTruck className='animate-bounce'/>}
                  {order.status.toLowerCase() === "delivered" && <FiCheckCircle />}
                  {order.status}
                </div>

                {/* Custom Styled Select with Icon */}
                <div className='relative flex-1 group'>
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status} 
                    className='w-full bg-white border-2 border-gray-100 p-4 pr-10 outline-none rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-pointer focus:border-orange-500 transition-all shadow-sm appearance-none'
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors'>
                    <FiChevronDown size={18} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders;