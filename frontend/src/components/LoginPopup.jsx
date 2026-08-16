import React, { useContext, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  
  const [formData, setFormData] = useState({
    name: "Dishan Shanuka",
    email: "dishanss123@gmail.com",
    password: "dsdss12345678"
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const onLogin = async (e) => {
    e.preventDefault();
    
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, formData);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
        toast.success(response.data.message); 
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error: Please check your server");
      }
    }
  }

  return (
    <div className='fixed inset-0 z-[100] w-full h-full bg-black/60 flex justify-center items-center px-4'>
      <form onSubmit={onLogin} className='w-full max-w-[350px] sm:max-w-[400px] bg-white text-gray-500 flex flex-col gap-6 py-8 px-8 rounded-2xl animate-fade-in shadow-2xl'>
        
        <div className='flex justify-between items-center text-black font-bold text-2xl'>
          <h2>{currState}</h2>
          <AiOutlineClose 
            className='cursor-pointer hover:text-orange-600 transition-all text-2xl' 
            onClick={() => setShowLogin(false)} 
          />
        </div>

        <div className='flex flex-col gap-4'>
          {currState === "Login" ? null : (
            <input 
              className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' 
              name='name' 
              onChange={onChangeHandler} 
              value={formData.name} 
              type="text" 
              placeholder='Your name' 
              required 
              autoComplete="off"
            />
          )}
          <input 
            className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' 
            name='email' 
            onChange={onChangeHandler} 
            value={formData.email} 
            type="email" 
            placeholder='Your email' 
            required 
            autoComplete="off"
          />
          <input 
            className='border border-gray-300 p-3 rounded-lg outline-orange-600 focus:border-orange-600 transition-all' 
            name='password' 
            onChange={onChangeHandler} 
            value={formData.password} 
            type="password" 
            placeholder='Password' 
            required 
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className='bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition active:scale-95 shadow-md'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className='flex items-start gap-2 -mt-2'>
          <input className='mt-1 cursor-pointer w-4 h-4 accent-orange-600' type="checkbox" required defaultChecked />
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