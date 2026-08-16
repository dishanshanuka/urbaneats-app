import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import LoginPopup from './components/LoginPopup'
import Verify from './pages/Verify'
import MyOrders from './pages/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatBot } from './components/ChatBot';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      <div className='min-h-screen bg-white w-full overflow-x-hidden'>
      
        <Navbar setShowLogin={setShowLogin} /> 
        
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/chatbot' element={<ChatBot />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default App