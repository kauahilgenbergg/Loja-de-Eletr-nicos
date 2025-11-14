import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 2. Imports de Páginas Principais
import Home from './pages/Home';
//import Catalog from './pages/Catalog';
import AboutUs from './pages/AboutUs';
//import ProductDetail from './pages/ProductDetail'; 

// 3. Imports das Novas Pastas de Páginas
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/profile/Profile';
//import Orders from './pages/Profile/Orders';
import Wishlist from './pages/checkout/Wishlist';
import Cart from './pages/checkout/Cart';
import Catalog from './pages/Catalog';

import { CartProvider } from './context/CartContext';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="app-content">
        <Routes>
          {/* Páginas Principais */}
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
  );
}

export default App;