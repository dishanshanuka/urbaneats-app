import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-12 md:my-20 max-w-7xl mx-auto px-4 min-h-[60vh]'>
            <h2 className='text-2xl md:text-3xl font-bold mb-8 text-gray-800'>My Orders</h2>
            <div className='flex flex-col gap-5'>
                {data.map((order, index) => (
                    <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-4 border border-orange-600 py-4 px-6 text-gray-700 rounded-xl shadow-sm bg-white hover:shadow-md transition-all'>
                        
                    
                        <div className='w-16 h-16 md:w-20 md:h-20 flex-shrink-0'>
                            <img 
                                src={url + "/images/" + order.items[0].image} 
                                alt={order.items[0].name} 
                                className='w-full h-full object-cover rounded-lg border border-orange-100 shadow-sm'
                            />
                        </div>
                        
                        <p className='text-sm md:text-base font-medium'>
                            {order.items.map((item, i) => (
                                i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                            ))}
                        </p>
                        
                        <p className='font-bold text-gray-900 text-lg'>LKR {order.amount * 320}.00</p>
                        <p className='text-gray-500 font-medium'>Items: {order.items.length}</p>
                        
                        <p className='flex items-center gap-2'>
                            <span className='text-orange-600 text-xl'>&#x25cf;</span> 
                            <b className='font-semibold text-gray-800'>{order.status}</b>
                        </p>
                        
                        <button onClick={fetchOrders} className='bg-orange-600 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-colors active:scale-95'>
                            Track Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders