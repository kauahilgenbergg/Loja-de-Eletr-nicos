// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- ADICIONADO
import api from '../services/api'; // <-- ADICIONADO (verifique se o caminho para seu 'api' está correto)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Ao iniciar, tente carregar o usuário do localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate(); // <-- ADICIONADO

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login'); // <-- Mantido da branch 'login'
  };

  // Função 'updateUser' (da branch 'login')
  // RESOLVIDO: Endpoint ajustado de '/users' para '/usuario' para consistência
  const updateUser = async (newData) => {
      try {
      // Usando '/usuario/' para ser consistente com Login e Register
      const response = await api.put(`/usuario/${user.id}`, newData);
      
      setUser(response.data); 
      
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      
      console.log("Perfil atualizado com sucesso!");
      
    } catch (error) {
      console.error("Erro no AuthContext ao atualizar usuário:", error);
      throw error; 
    }
  };

  // --- FUNÇÃO NOVA E ESSENCIAL --- (da branch 'develop')
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
    updateUser, // <-- Expondo a função da API
    updateUserContext // <-- Expondo a função local
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