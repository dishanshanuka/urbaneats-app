import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import LoginPopup from './components/LoginPopup'

const App = () => {
 
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
     
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      <div className='min-h-screen bg-white'>
      
        <Navbar setShowLogin={setShowLogin} /> 
        
        <div className='max-w-[90%] mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App