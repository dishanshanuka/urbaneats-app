import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className='fixed inset-0 z-[100] w-full h-full bg-black/60 flex justify-center items-center px-4'>
      
      
      <form className='w-full max-w-[350px] sm:max-w-[400px] bg-white text-gray-500 flex flex-col gap-6 py-8 px-8 rounded-2xl animate-fade-in shadow-2xl'>
        
        <div className='flex justify-between items-center text-black font-bold text-2xl'>
          <h2>{currState}</h2>
          <AiOutlineClose 
            className='cursor-pointer hover:text-orange-600 transition-all text-2xl' 
            onClick={() => setShowLogin(false)} 
          />
        </div>

        <div className='flex flex-col gap-4'>
        
          {currState === "Login" ? null : (
            <input className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' type="text" placeholder='Your name' required />
          )}
          <input className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' type="email" placeholder='Your email' required />
          <input className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' type="password" placeholder='Password' required />
        </div>

        <button className='bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition active:scale-95 shadow-md'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className='flex items-start gap-2 -mt-2'>
          <input className='mt-1 cursor-pointer w-4 h-4 accent-orange-600' type="checkbox" required />
          <p className='text-xs leading-tight'>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

    
        {currState === "Login"
          ? <p className='text-sm text-center'>Create a new account? <span className='text-orange-600 font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p className='text-sm text-center'>Already have an account? <span className='text-orange-600 font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup