import React from 'react'

const ExploreMenu = ({ category, setCategory }) => {

  const menu_list = [
    { 
      menu_name: "Salad", 
      menu_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      menu_name: "Deserts", 
      menu_image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      menu_name: "Sandwich", 
      menu_image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      menu_name: "Cake", 
      menu_image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      menu_name: "Pure Veg", 
      menu_image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
      menu_name: "Pasta", 
      menu_image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      menu_name: "Noodles", 
      menu_image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop" 
    }
  ]

  return (
    <div className='flex flex-col gap-6 py-16 max-w-7xl mx-auto px-6' id='explore-menu'>
      
      {/* Title Section */}
      <div className='space-y-3'>
        <h1 className='text-gray-900 text-4xl md:text-5xl font-black tracking-tight uppercase'>
          Explore <span className='text-orange-600'>Our Menu</span>
        </h1>
        <p className='max-w-2xl text-gray-500 text-lg font-bold leading-relaxed opacity-80'>
          Choose from a diverse menu featuring a delectable array of dishes. 
          Satisfy your cravings with our finest culinary selections.
        </p>
      </div>
      
      {/* Scrollable Categories List */}
      <div className='flex justify-between items-center gap-10 text-center my-8 overflow-x-auto no-scrollbar py-4 px-2'>
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div 
              key={index} 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              className='cursor-pointer flex-shrink-0 group flex flex-col items-center'
            >
              {/* Circular Image Container */}
              <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 transition-all duration-500 shadow-xl relative
                ${isActive 
                  ? "border-orange-600 scale-110 shadow-orange-200" 
                  : "border-gray-50 group-hover:border-orange-300"}`}>
                
                <img 
                  src={item.menu_image} 
                  alt={item.menu_name} 
                  className={`w-full h-full object-cover transition-transform duration-700 
                    ${isActive ? "scale-110 rotate-3" : "group-hover:scale-110"}`} 
                />
                
                {/* Active Overlay */}
                {isActive && (
                    <div className="absolute inset-0 bg-orange-600/10"></div>
                )}
              </div>

              {/* Text Label */}
              <p className={`mt-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all
                ${isActive ? "text-orange-600 scale-105" : "text-gray-400 group-hover:text-orange-500"}`}>
                {item.menu_name}
              </p>
            </div>
          )
        })}
      </div>

      <hr className='h-[1px] bg-gray-100 border-none' />
    </div>
  )
}

export default ExploreMenu;