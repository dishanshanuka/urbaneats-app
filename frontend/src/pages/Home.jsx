import React, { useRef, useState } from 'react' // Added useState for category selection
import ExploreMenu from '../components/ExploreMenu'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Home = () => {
  // State to track the selected food category
  const [category, setCategory] = useState("All");
  
  // Reference for the main container to scope GSAP animations
  const container = useRef();

  useGSAP(() => {
    // 1. Entrance animation for the text and button
    gsap.from(".hero-content", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)", 
      clearProps: "all"      
    });

    // 2. Continuous Floating animation for the placeholder section
    gsap.to(".floating-food", {
      y: -20,               // Moves up by 20px
      duration: 2,          // Time for one direction
      repeat: -1,           // Infinite loop
      yoyo: true,           // Back and forth movement
      ease: "sine.inOut"    // Natural organic feel
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full">
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Hero Section Banner */}
        <div className="bg-orange-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between min-h-[450px] shadow-sm relative overflow-visible">
          
          {/* Left Side: Information */}
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="hero-content text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Order your <br />
              <span className="text-orange-600">favourite food</span> here
            </h1>
            <p className="hero-content text-gray-600 text-lg max-w-md">
              Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients.
            </p>
            <button className="hero-content relative z-20 bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg cursor-pointer active:scale-95">
              View Menu
            </button>
          </div>
          
          {/* Right Side: Animated Placeholder */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
              {/* Added 'floating-food' class for the continuous animation */}
              <div className="floating-food w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-20 absolute"></div>
              <div className="floating-food text-center relative z-10">
                <p className="text-5xl mb-2">🍔 🥗</p>
                <p className="text-orange-500 font-medium italic">
                  Delicious food photos <br /> coming soon...
                </p>
              </div>
          </div>
        </div>
      </div>
      
      {/* Passing category state to ExploreMenu component */}
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  )
}

export default Home