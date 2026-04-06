import React from 'react'

const ExploreMenu = ({ category, setCategory }) => {

  const menu_list = [
    { menu_name: "Salad", menu_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Deserts", menu_image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Sandwich", menu_image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Cake", menu_image: "https://images.unsplash.com/photo-1578985543219-12415024f03a?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Pure Veg", menu_image: "https://images.unsplash.com/photo-1540420773420-3366772f4492?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Pasta", menu_image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=300" },
    { menu_name: "Noodles", menu_image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=300" }
  ]

  return (
    <div className='flex flex-col gap-6 py-16 max-w-7xl mx-auto px-6' id='explore-menu'>
      
      {/* Title Section */}
      <div className='space-y-3'>
        <h1 className='text-gray-900 text-4xl md:text-5xl font-black tracking-tight uppercase'>
          Explore <span className='text-orange-600'>Our Menu</span>
        </h1>
        <p className='max-w-2xl text-gray-500 text-lg font-medium leading-relaxed'>
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
              className='cursor-pointer flex-shrink-0 group'
            >
              {/* Circular Image Container */}
              <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 transition-all duration-500 shadow-lg
                ${isActive 
                  ? "border-orange-600 scale-110 shadow-orange-200" 
                  : "border-gray-100 group-hover:border-orange-300"}`}>
                
                <img 
                  src={item.menu_image} 
                  alt={item.menu_name} 
                  className={`w-full h-full object-cover transition-transform duration-500 
                    ${isActive ? "scale-110" : "group-hover:scale-110"}`} 
                />
                
                {/* Active Overlay */}
                {isActive && (
                    <div className="absolute inset-0 bg-orange-600/10 transition-opacity"></div>
                )}
              </div>

              {/* Text Label */}
              <p className={`mt-4 text-sm md:text-base font-bold uppercase tracking-wider transition-colors
                ${isActive ? "text-orange-600 scale-105" : "text-gray-600 group-hover:text-orange-500"}`}>
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