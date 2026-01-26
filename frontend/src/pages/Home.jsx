import React from 'react'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      {/* Main Banner Container */}
      <div className="bg-orange-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between min-h-[450px] shadow-sm">
        
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Order your <br />
            <span className="text-orange-600">favourite food</span> here
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients.
          </p>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg cursor-pointer">
            View Menu
          </button>
        </div>
        
        {/* Right Side: Visual Placeholder */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
            <div className="w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30 absolute"></div>
            <p className="text-orange-400 font-medium italic relative z-10">Delicious food photos coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default Home