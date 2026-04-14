import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';
import ReviewModal from '../components/ReviewModal'; 

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

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
            
            <div className='mb-12'>
                <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tighter'>
                    My <span className='text-orange-600'>Orders</span>
                </h2>
                <div className='w-20 h-1.5 bg-orange-600 mt-2 rounded-full'></div>
            </div>

            <div className='flex flex-col gap-6'>
                {data.map((order, index) => (
                    <div key={index} className='grid grid-cols-1 md:grid-cols-[0.6fr_2fr_1.2fr_0.8fr_1.5fr_1.2fr] items-center gap-6 border border-gray-100 py-6 px-8 text-gray-700 rounded-[2.5rem] shadow-xl shadow-gray-100/50 bg-white hover:border-orange-500/30 transition-all'>
                        
                        <div className='w-20 h-20 flex-shrink-0'>
                            <img src={url + "/images/" + order.items[0].image} alt="" className='w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white' />
                        </div>
                        
                        {/* Fix: Order Names Section with Line Clamp and smaller text */}
                        <div className='max-w-[280px]'>
                            <p className='text-[11px] md:text-[12px] font-bold text-gray-800 uppercase leading-snug line-clamp-2'>
                                {order.items.map((item, i) => (
                                    i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
                                ))}
                            </p>
                        </div>
                        
                        <p className='font-black text-gray-900 text-xl tracking-tighter'>
                            <span className='text-orange-600 text-[10px] mr-1 uppercase'>LKR</span>
                            {Number(order.amount).toLocaleString()}.00
                        </p>

                        <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Items: {order.items.length}</p>
                        
                        <div className='flex items-center justify-start'>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest'
                                style={{ 
                                    backgroundColor: order.status.toLowerCase() === "food processing" ? "#fef2f2" : order.status.toLowerCase() === "out for delivery" ? "#fff7ed" : "#f0fdf4",
                                    color: order.status.toLowerCase() === "food processing" ? "#dc2626" : order.status.toLowerCase() === "out for delivery" ? "#ea580c" : "#16a34a",
                                    border: `1px solid ${order.status.toLowerCase() === "food processing" ? "#fee2e2" : order.status.toLowerCase() === "out for delivery" ? "#ffedd5" : "#dcfce7"}`
                                }}>
                                {order.status.toLowerCase() === "food processing" && <FiClock className='animate-spin'/>}
                                {order.status.toLowerCase() === "out for delivery" && <FiTruck className='animate-bounce'/>}
                                {order.status.toLowerCase() === "delivered" && <FiCheckCircle />}
                                {order.status}
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <button onClick={fetchOrders} className='bg-orange-600 text-white py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all'>
                                Track Order
                            </button>
                            {order.status.toLowerCase() === "delivered" && (
                                <button onClick={() => { setSelectedOrder(order); setShowReviewModal(true); }} className='bg-white text-orange-600 border border-orange-600 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-50 transition-all'>
                                    Rate Order
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showReviewModal && (
                <ReviewModal order={selectedOrder} url={url} token={token} setShowReviewModal={setShowReviewModal} />
            )}
        </div>
    )
}

export default MyOrders;