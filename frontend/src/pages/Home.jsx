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
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Background Subtle Zoom
    gsap.from(".hero-bg", {
      scale: 1.1,
      duration: 2,
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
          
          {/* 1. Navbar එක පැහැදිලිව පෙනීමට ඉහළ සිට එන අඳුරු Gradient එක (Top Shadow) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent h-[40%]"></div>

          {/* 2. අකුරු පෙනීමට වම් පැත්තේ සිට එන අඳුරු Gradient එක (Left Shadow) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* Hero Content Area */}
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-20 relative z-10 mt-10">
          <div className="max-w-3xl space-y-5">
            
            <h1 className="hero-content text-5xl md:text-[75px] font-extrabold text-white leading-[1] tracking-tight uppercase">
              Order your <br />
              <span className="text-orange-500">
                favourite food
              </span> <br />
              here
            </h1>
            
            <p className="hero-content text-gray-200 text-sm md:text-lg max-w-lg font-medium leading-relaxed border-l-4 border-orange-500 pl-5 opacity-90">
              Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
            </p>
            
            <div className="hero-content pt-4">
              <button className="bg-[#ff4c24] text-white px-12 py-3.5 rounded-full font-bold text-base hover:bg-orange-700 transition-all shadow-[0_10px_25px_rgba(255,76,36,0.3)] active:scale-95 uppercase tracking-wider">
                View Menu
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* --- HERO SECTION END --- */}

      {/* පහළ කොටස් සඳහා පමණක් max-width container එකක් භාවිතා කර ඇත */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>

    </div>
  )
}

export default Home;