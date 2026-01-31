import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  
  const { food_list } = useContext(StoreContext);

  return (
    // Added responsive padding and margin top
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20' id='food-display'>
      {/* Title size: 2xl on mobile, 3xl on larger screens */}
      <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-10 text-center md:text-left'>
        Top dishes for you
      </h2>
      
      {/* Grid logic:
          - grid-cols-1: 1 item per row on mobile
          - sm:grid-cols-2: 2 items per row on tablets
          - lg:grid-cols-3: 3 items per row on laptops
          - xl:grid-cols-4: 4 items per row on wide screens
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem 
                key={index} 
                id={item._id}
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            )
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay;