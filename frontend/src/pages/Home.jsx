import React, { useRef } from 'react'
import ExploreMenu from '../components/ExploreMenu'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Home = () => {
  const container = useRef();

  useGSAP(() => {
    // If visibility is the issue, we use a simpler animation first
    gsap.from(".hero-content", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)", // This gives a slight bounce effect
      clearProps: "all"      // This removes GSAP styles after animation is done
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full">
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-orange-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between min-h-[450px] shadow-sm relative overflow-visible">
          
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="hero-content text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Order your <br />
              <span className="text-orange-600">favourite food</span> here
            </h1>
            <p className="hero-content text-gray-600 text-lg max-w-md">
              Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients.
            </p>
            {/* Added relative and z-index to make sure button is on top */}
            <button className="hero-content relative z-20 bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg cursor-pointer active:scale-95">
              View Menu
            </button>
          </div>
          
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
              <div className="w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-20 absolute"></div>
              <p className="hero-content text-orange-500 font-medium italic relative z-10 text-center">
                Delicious food photos <br /> coming soon...
              </p>
          </div>
        </div>
      </div>
      
      <ExploreMenu />
    </div>
  )
}

export default Home