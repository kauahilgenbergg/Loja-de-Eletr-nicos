// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Ao iniciar, tente carregar o usuário do localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  // --- FUNÇÃO NOVA E ESSENCIAL ---
  // Recebe os novos dados (ex: { rua: '...', numero: '...' })
  // e mescla com o usuário existente.
  const updateUserContext = (newData) => {
    if (!user) return; // Não faz nada se não há usuário

    // 1. Mescla o usuário antigo com os novos dados
    const updatedUser = { ...user, ...newData };

    // 2. Atualiza o state
    setUser(updatedUser);
    
    // 3. Atualiza o localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };
  // --- FIM DA FUNÇÃO NOVA ---

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUserContext // <-- Expondo a nova função
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}