import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-12 md:my-32 max-w-7xl mx-auto px-6 min-h-[60vh] font-sans'>
            
            {/* Header Section */}
            <div className='mb-12'>
                <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tighter'>
                    My <span className='text-orange-600'>Orders</span>
                </h2>
                <div className='w-20 h-1.5 bg-orange-600 mt-2 rounded-full'></div>
            </div>

            <div className='flex flex-col gap-6'>
                {data.map((order, index) => (
                    <div key={index} className='grid grid-cols-1 md:grid-cols-[0.6fr_2fr_1.2fr_0.8fr_1.5fr_1.2fr] items-center gap-6 border border-gray-100 py-6 px-8 text-gray-700 rounded-[2.5rem] shadow-xl shadow-gray-100/50 bg-white hover:border-orange-500/30 transition-all group'>
                        
                        {/* Order Leading Image */}
                        <div className='w-20 h-20 flex-shrink-0'>
                            <img 
                                src={url + "/images/" + order.items[0].image} 
                                alt={order.items[0].name} 
                                className='w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                        
                        {/* Order Summary */}
                        <p className='text-sm md:text-base font-black text-gray-800 uppercase leading-tight'>
                            {order.items.map((item, i) => (
                                i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                            ))}
                        </p>
                        
                        {/* Amount */}
                        <p className='font-black text-gray-900 text-xl tracking-tighter'>
                            <span className='text-orange-600 text-[10px] mr-1 uppercase'>LKR</span>
                            {Number(order.amount).toLocaleString()}.00
                        </p>

                        {/* Item Count */}
                        <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                            Items: {order.items.length}
                        </p>
                        
                        {/* Status Badge with Case-Insensitive Icon Logic */}
                        <div className='flex items-center justify-start'>
                            <div 
                                className='flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm'
                                style={{ 
                                    backgroundColor: order.status.toLowerCase() === "food processing" ? "#fef2f2" : 
                                                    order.status.toLowerCase() === "out for delivery" ? "#fff7ed" : "#f0fdf4",
                                    color: order.status.toLowerCase() === "food processing" ? "#dc2626" : 
                                           order.status.toLowerCase() === "out for delivery" ? "#ea580c" : "#16a34a",
                                    border: `1px solid ${
                                           order.status.toLowerCase() === "food processing" ? "#fee2e2" : 
                                           order.status.toLowerCase() === "out for delivery" ? "#ffedd5" : "#dcfce7"}`
                                }}
                            >
                                {/* Icons logic checking lowercase status */}
                                {order.status.toLowerCase() === "food processing" && <FiClock className='animate-spin' style={{animationDuration: '3s'}}/>}
                                {order.status.toLowerCase() === "out for delivery" && <FiTruck className='animate-bounce'/>}
                                {order.status.toLowerCase() === "delivered" && <FiCheckCircle />}
                                {order.status}
                            </div>
                        </div>
                        
                        {/* Action Button */}
                        <button onClick={fetchOrders} className='bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-orange-100'>
                            Track Order
                        </button>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className='text-center py-20 text-gray-400 font-bold uppercase tracking-widest'>
                        No orders placed yet
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyOrders;