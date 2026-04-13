import React, { useState } from 'react'
import { FiUpload, FiPlusCircle, FiLayers } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const url = "http://localhost:4000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if(!image) {
            toast.error("Please upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error adding food item");
        }
    }

    return (
        <div className='p-8 bg-[#fcfcfc] min-h-screen w-full lg:w-[80%] font-sans'>
            <div className='max-w-4xl mx-auto'>
                
                {/* Header Section */}
                <div className='flex items-center gap-3 mb-10'>
                    <div className='w-2 h-10 bg-orange-600 rounded-full'></div>
                    <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tighter'>
                        Add New <span className='text-orange-600'>Dish</span>
                    </h2>
                </div>

                <form onSubmit={onSubmitHandler} className='bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col gap-8'>
                    
                    {/* Image Upload Area */}
                    <div className="flex flex-col gap-4">
                        <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Product Image</p>
                        <label htmlFor="image" className='group'>
                            <div className='w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden hover:border-orange-500 hover:bg-orange-50 transition-all duration-500'>
                                {image ? (
                                    <img className='w-full h-full object-cover animate-fade-in' src={URL.createObjectURL(image)} alt="" />
                                ) : (
                                    <div className='flex flex-col items-center text-gray-300 group-hover:text-orange-600 transition-colors'>
                                        <FiUpload className='text-4xl mb-2' />
                                        <span className='text-[10px] font-black uppercase tracking-widest'>Upload Photo</span>
                                    </div>
                                )}
                            </div>
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col gap-3">
                        <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name} name='name' className='p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/20 focus:bg-white transition-all font-bold text-gray-700 placeholder:text-gray-300' type="text" placeholder='ENTER DISH NAME' required />
                    </div>

                    {/* Description Input */}
                    <div className="flex flex-col gap-3">
                        <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" className='p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/20 focus:bg-white transition-all font-bold text-gray-600 placeholder:text-gray-300' placeholder='WRITE DETAILS ABOUT THE INGREDIENTS...' required></textarea>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {/* Category Select */}
                        <div className='flex flex-col gap-3'>
                            <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Category</p>
                            <div className='relative'>
                                <FiLayers className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                                <select onChange={onChangeHandler} value={data.category} name="category" className='w-full p-4 pl-12 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/20 focus:bg-white transition-all font-black text-gray-700 appearance-none cursor-pointer uppercase text-xs tracking-widest'>
                                    <option value="Salad">Salad</option>
                                    <option value="Rolls">Rolls</option>
                                    <option value="Deserts">Deserts</option>
                                    <option value="Sandwich">Sandwich</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pure Veg">Pure Veg</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Noodles">Noodles</option>
                                </select>
                            </div>
                        </div>

                        {/* Price Input with LKR Prefix */}
                        <div className='flex flex-col gap-3'>
                            <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Price</p>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-orange-600 pointer-events-none'>
                                    LKR
                                </div>
                                <input 
                                    onChange={onChangeHandler} 
                                    value={data.price} 
                                    name='price' 
                                    className='w-full p-4 pl-14 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/20 focus:bg-white transition-all font-black text-gray-700 placeholder:text-gray-300' 
                                    type="Number" 
                                    placeholder='1200' 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type='submit' className='flex items-center justify-center gap-3 bg-orange-600 text-white p-5 rounded-2xl mt-4 hover:bg-black transition-all duration-300 font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 active:scale-95 text-xs'>
                        <FiPlusCircle size={20} />
                        Add To Inventory
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add