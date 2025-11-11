import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// 1. IMPORTE O SEU PROVEDOR DE CONTEXTO
import { CartProvider } from './context/CartContext' // <-- Verifique se este caminho está correto

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. ENVOLVA O APP COM O PROVIDER */}
      <CartProvider> 
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)