import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  
  const { food_list, search } = useContext(StoreContext);

  const static_food_list = [
    { 
      _id: "s1", 
      name: "Greek Salad", 
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop", 
      price: 1200, 
      description: "Fresh cucumbers, tomatoes, olives, and premium feta cheese.", 
      category: "Salad" 
    },
    { 
      _id: "s2", 
      name: "Veg Pasta", 
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop", 
      price: 1850, 
      description: "Delicious creamy pasta with seasonal vegetables.", 
      category: "Pasta" 
    },
    { 
      _id: "s3", 
      name: "Chicken Sandwich", 
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop", 
      price: 950, 
      description: "Grilled chicken with avocado and secret sauce.", 
      category: "Sandwich" 
    },
    { 
      _id: "s4", 
      name: "Berry Cake", 
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
      price: 850, 
      description: "Sweet cake topped with fresh strawberries and berries.", 
      category: "Cake" 
    },
    { 
      _id: "s5", 
      name: "Lasagna", 
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop", 
      price: 2400, 
      description: "Layered pasta with rich meat sauce and cheese.", 
      category: "Pasta" 
    },
    { 
      _id: "s6", 
      name: "Veg Noodles", 
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop", 
      price: 1350, 
      description: "Stir-fried noodles with crisp garden veggies.", 
      category: "Noodles" 
    },
    { 
      _id: "s7", 
      name: "Fruit Salad", 
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop", 
      price: 750, 
      description: "A refreshing mix of seasonal tropical fruits.", 
      category: "Salad" 
    },
    { 
      _id: "s8", 
      name: "Chocolate Dessert", 
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop", 
      price: 1100, 
      description: "Rich chocolate mousse with dark chocolate glaze.", 
      category: "Deserts" 
    },
    {
      _id: "s9",
      name: "Classic Pepperoni Pizza",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop",
      price: 3250,
      description: "Crispy crust topped with zesty tomato sauce, melted mozzarella, and spicy pepperoni.",
      category: "Pizza"
    },
    {
      _id: "s10",
      name: "Double Cheese Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
      price: 1850,
      description: "Juicy double beef patty with melted cheddar, fresh lettuce, and our secret Urban sauce.",
      category: "Sandwich"
    },
    {
      _id: "s11",
      name: "Creamy White Pasta",
      image: "https://images.unsplash.com/photo-1645112481338-3014556272b7?q=80&w=1000&auto=format&fit=crop",
      price: 2100,
      description: "Rich and creamy Alfredo sauce with mushrooms, parmesan cheese, and garlic herbs.",
      category: "Pasta"
    },
    {
      _id: "s12",
      name: "Chocolate Lava Cake",
      image: "https://images.unsplash.com/photo-1624353335560-b4a958ceca55?q=80&w=1000&auto=format&fit=crop",
      price: 950,
      description: "Decadent dark chocolate cake with a warm, gooey molten center. A true sweet delight.",
      category: "Cake"
    },
    {
      _id: "s13",
      name: "Crispy Chicken Rolls",
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop",
      price: 750,
      description: "Golden fried rolls filled with seasoned shredded chicken and spicy vegetables.",
      category: "Rolls"
    }
  ];

  const display_list = food_list && food_list.length > 0 ? food_list : static_food_list;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20' id='food-display'>
      
      <h2 className='text-2xl md:text-3xl font-black text-gray-800 mb-6 md:mb-10 text-center md:text-left uppercase tracking-tighter'>
        {search ? `Results for "${search}"` : "Top dishes for you"}
      </h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
        {display_list.map((item, index) => {
          if (!item || !item.name) return null;

          const matchesCategory = category === "All" || category === item.category;
          const matchesSearch = item.name.toLowerCase().includes((search || "").toLowerCase());

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
      {display_list.filter(item => 
        item && item.name &&
        (category === "All" || category === item.category) && 
        item.name.toLowerCase().includes((search || "").toLowerCase())
      ).length === 0 && (
        <div className='text-center py-20'>
          <p className='text-gray-400 text-lg font-bold uppercase tracking-widest'>No dishes found matching your search.</p>
        </div>
      )}

    </div>
  )
}

export default FoodDisplay;