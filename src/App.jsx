import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

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
        <Routes>
          
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />

          </Route>

        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;