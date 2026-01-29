import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-16 pb-8 px-4 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight text-orange-600">
            Urban<span className="text-gray-900">Eats</span>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Step into style with the best sneakers in town. We bring quality and comfort straight to your doorstep.
          </p>
          <div className="flex space-x-5">
            <FaFacebook className="text-xl cursor-pointer hover:text-orange-600 transition-colors" />
            <FaInstagram className="text-xl cursor-pointer hover:text-orange-600 transition-colors" />
            <FaTwitter className="text-xl cursor-pointer hover:text-orange-600 transition-colors" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-orange-600 transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><a href="/" className="hover:text-orange-600 transition">Home</a></li>
            <li><a href="/shop" className="hover:text-orange-600 transition">Shop Sneakers</a></li>
            <li><a href="/new" className="hover:text-orange-600 transition">New Arrivals</a></li>
            <li><a href="/offers" className="hover:text-orange-600 transition">Special Offers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-orange-600 transition">Order Tracking</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Return Policy</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Contact Us</h3>
          <ul className="space-y-3 text-gray-600 text-sm font-medium">
            <li className="flex items-center">urbaneats@gmail.com</li>
            <li className="flex items-center">+94 71 234 5678</li>
            <li className="text-gray-500 font-normal">No 123, Galle Road, Colombo</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} UrbanEats. All rights reserved.</p>
          <p>Developed by <span className="font-semibold text-gray-700">Dishan Shanuka</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;