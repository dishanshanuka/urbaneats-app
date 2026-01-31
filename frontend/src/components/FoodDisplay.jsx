import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  
  const { food_list } = useContext(StoreContext);

  return (
    <div className='max-w-7xl mx-auto px-4 mt-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
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