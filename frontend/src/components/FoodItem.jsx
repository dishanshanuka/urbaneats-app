import React from 'react'

const FoodItem = ({ id, name, price, description, image }) => {
  return (
    <div className='w-full mx-auto rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl bg-white overflow-hidden border border-gray-100'>
      <div className='relative'>
        <img src={image} alt={name} className='w-full h-48 object-cover' />
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-lg font-bold text-gray-800'>{name}</p>
        </div>
        <p className='text-gray-500 text-sm leading-5 mb-3'>{description}</p>
        <p className='text-orange-600 text-xl font-bold'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem