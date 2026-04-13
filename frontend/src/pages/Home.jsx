import React, { useRef, useState } from 'react'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Home = () => {
  const [category, setCategory] = useState("All");
  const container = useRef();

  useGSAP(() => {
    // Entrance Animation
    gsap.from(".hero-content", {
      y: 30, 
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });

    // Background Subtle Zoom
    gsap.from(".hero-bg", {
      scale: 1.2,
      duration: 2.5,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-white">
      
      {/* --- HERO SECTION START --- */}
      <div className="relative w-full h-screen flex items-center overflow-hidden">
        
        {/* Background Image & Overlay Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Background" 
            className="hero-bg w-full h-full object-cover"
          />
          
          {/* Gradients to make text readable and look premium */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent h-[40%]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content Area */}
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-20 relative z-10 mt-10">
          <div className="max-w-4xl space-y-6">
            
            <div className="hero-content flex items-center gap-3">
               <div className="w-10 h-1 bg-orange-500 rounded-full"></div>
               <span className="text-white font-black text-xs uppercase tracking-[0.4em]">Premium Delivery Service</span>
            </div>

            <h1 className="hero-content text-6xl md:text-[90px] font-black text-white leading-[0.95] tracking-tighter uppercase">
              Order your <br />
              <span className="text-orange-500">
                favourite food
              </span> <br />
              here
            </h1>
            
            <p className="hero-content text-gray-300 text-sm md:text-lg max-w-xl font-bold leading-relaxed border-l-4 border-orange-500 pl-6 opacity-90">
              Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
            </p>
            
            <div className="hero-content pt-6 flex gap-5">
              <button 
                onClick={() => document.getElementById('explore-menu').scrollIntoView({behavior: 'smooth'})}
                className="bg-[#ff4c24] text-white px-12 py-4 rounded-full font-black text-xs hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(255,76,36,0.3)] active:scale-95 uppercase tracking-[0.2em]"
              >
                View Menu
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* --- HERO SECTION END --- */}

      <div className="max-w-7xl mx-auto px-4 mt-24">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>

    </div>
  )
}

export default Home;