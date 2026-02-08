import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <Routes>
            <Route path="/add" element={<h1>Add Food Page</h1>} />
            <Route path="/list" element={<h1>List Food Page</h1>} />
            <Route path="/orders" element={<h1>Orders Page</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App