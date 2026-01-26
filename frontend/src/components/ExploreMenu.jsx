import React from 'react'

const ExploreMenu = ({ category, setCategory }) => {
  const menu_list = [
    { menu_name: "Salad", menu_image: "🥗" },
    { menu_name: "Rolls", menu_image: "🌯" },
    { menu_name: "Deserts", menu_image: "🍰" },
    { menu_name: "Sandwich", menu_image: "🥪" },
    { menu_name: "Cake", menu_image: "🎂" },
    { menu_name: "Pure Veg", menu_image: "🥦" },
    { menu_name: "Pasta", menu_image: "🍝" },
    { menu_name: "Noodles", menu_image: "🍜" }
  ]

  return (
    <div className='flex flex-col gap-5 py-10 max-w-7xl mx-auto px-4' id='explore-menu'>
      <h1 className='text-gray-800 text-4xl font-bold'>Explore our menu</h1>
      <p className='max-w-[100%] md:max-w-[60%] text-gray-600 text-lg'>
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>
      
      <div className='flex justify-between items-center gap-8 text-center my-5 overflow-x-auto no-scrollbar p-4 -ml-4 overflow-y-visible'>
        {menu_list.map((item, index) => {
          return (
            <div 
              key={index} 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              className='cursor-pointer flex-shrink-0 group'
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-300 flex-shrink-0
                ${category === item.menu_name 
                  ? "border-[5px] border-orange-600 scale-110 shadow-md" 
                  : "border-[5px] border-transparent bg-orange-50 group-hover:bg-orange-100"}`}>
                {item.menu_image}
              </div>
              <p className={`mt-3 font-medium transition-colors ${category === item.menu_name ? "text-orange-600 font-bold" : "text-gray-600"}`}>
                {item.menu_name}
              </p>
            </div>
          )
        })}
      </div>
      <hr className='h-[2px] bg-gray-200 border-none' />
    </div>
  )
}

export default ExploreMenu;