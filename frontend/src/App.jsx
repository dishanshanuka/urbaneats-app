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

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      {/* 1. මෙතන 'max-w-[90%]' එක අයින් කරලා 'w-full' කරන්න */}
      <div className='min-h-screen bg-white w-full overflow-x-hidden'>
      
        <Navbar setShowLogin={setShowLogin} /> 
        
        {/* 2. Routes තියෙන div එකේ container එක අයින් කරන්න. 
           අපි ඒක ඒ ඒ Page එක ඇතුළතදී පාලනය කරමු. */}
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            
            {/* අනිත් පිටු සඳහා වෙනම container එකක් අවශ්‍ය නම් 
               ඒවා ඒ Page එක ඇතුළත 'max-w-[90%] mx-auto' ලෙස දාන්න */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default App