import React, { useState } from 'react'; // Import useState for state management
import './Navbar.css';
import { FiSearch } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";

const Navbar = () => {
  // State to keep track of the active menu item
  const [menu, setMenu] = useState("home");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-urban">Urban</span>
        <span className="logo-eats">Eats</span>
      </div>
      
      {/* Navigation Links with onClick events */}
      <ul className="navbar-links">
        {/* If 'menu' state is 'home', we add the 'active' class */}
        <li 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li 
          onClick={() => setMenu("contact")} 
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </li>
      </ul>

      <div className='navbar-right'>
        <div className="navbar-search-icon">
          <FiSearch size={22} />
        </div>
        
        <div className='navbar-basket-icon'>
          <SlBasket size={22} />
          <div className="dot"></div>
        </div>

        <div className="navbar-auth">
          <button className="login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;