import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  
  const { food_list, search } = useContext(StoreContext);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20' id='food-display'>
      
      <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-10 text-center md:text-left'>
        {search ? `Results for "${search}"` : "Top dishes for you"}
      </h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
        {food_list.map((item, index) => {
          
        
          
          const matchesCategory = category === "All" || category === item.category;
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

          if (matchesCategory && matchesSearch) {
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

      {/* No results message */}
      {food_list.filter(item => 
        (category === "All" || category === item.category) && 
        item.name.toLowerCase().includes(search.toLowerCase())
      ).length === 0 && (
        <div className='text-center py-20'>
          <p className='text-gray-400 text-lg italic'>No dishes found matching your search.</p>
        </div>
      )}

    </div>
  )
}

export default FoodDisplay;