import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";

const Add = () => {

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

    return (
        <div className='w-[70%] ml-[5vw] mt-[50px] text-[#6d6d6d] text-base'>
            <form className='flex flex-col gap-5'>
                
                <div className="flex flex-col gap-2">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <div className='w-[120px] h-[80px] border border-dashed border-gray-400 flex items-center justify-center cursor-pointer bg-gray-100'>
                            {image ? <img className='w-full h-full object-cover' src={URL.createObjectURL(image)} alt="" /> : <FiUpload className='text-3xl' />}
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                <div className="flex flex-col gap-2 w-[max(40%,280px)]">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} className='p-2 border border-gray-300 rounded-md outline-none' type="text" name='name' placeholder='Type here' required />
                </div>

                <div className="flex flex-col gap-2 w-[max(40%,280px)]">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} className='p-2 border border-gray-300 rounded-md outline-none' name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>

                <div className='flex gap-8'>
                    <div className='flex flex-col gap-2'>
                        <p>Product category</p>
                        <select onChange={onChangeHandler} className='max-w-[120px] p-2 border border-gray-300 rounded-md outline-none' name="category">
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
                    <div className='flex flex-col gap-2'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} className='max-w-[120px] p-2 border border-gray-300 rounded-md outline-none' type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='max-w-[120px] p-2 bg-black text-white rounded-md mt-4'>ADD</button>
            </form>
        </div>
    )
}

export default Add