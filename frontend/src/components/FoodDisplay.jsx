import React from 'react'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  const food_list = [
    { _id: "1", name: "Greek Salad", image: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg", price: 12, description: "Fresh and healthy greens with olives", category: "Salad" },
    { _id: "2", name: "Veggie Burger", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg", price: 18, description: "Delicious plant-based protein burger", category: "Burger" },
  ]

  return (
    <div className='max-w-7xl mx-auto px-4 mt-10 mb-20'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Top dishes near you</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay