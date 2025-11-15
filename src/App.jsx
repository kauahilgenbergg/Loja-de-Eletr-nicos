import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/profile/Profile';
import Wishlist from './pages/checkout/Wishlist';
import Cart from './pages/checkout/Cart';
import Catalog from './pages/Catalog';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <Header />

          <main className="app-content">
      	    <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/Cart" element={<Cart />} />      
              <Route path="/Catalog" element={<Catalog />} />    
              <Route path="/about" element={<AboutUs />} />   
              <Route path="/profile" element={<Profile />} />       
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;