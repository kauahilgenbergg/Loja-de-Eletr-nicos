// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // RESOLVIDO: Usando o inicializador "lazy" do localStorage (da branch 'develop')
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // RESOLVIDO: Mantendo o 'useNavigate' (da branch 'login'), necessário para o logout
  const navigate = useNavigate();

  // Este useEffect é um código comum que estava em ambas as branches
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // RESOLVIDO: Função 'login' modificada para se alinhar com a lógica da branch 'develop'
  // Ela agora recebe o objeto do usuário, em vez de fazer a chamada da API.
  const login = (userObject) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userObject));
    setUser(userObject);
    // A navegação agora é feita pelo próprio componente Login.jsx
  };

  // Função 'logout' (código comum)
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  // Função 'updateUser' (da branch 'login')
  // RESOLVIDO: Endpoint ajustado de '/users' para '/usuario' para consistência
  const updateUser = async (newData) => {
    if (!user || !user.id) {
      console.error("Usuário não encontrado para atualizar");
      throw new Error("Usuário não autenticado");
    }

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

  // RESOLVIDO: O 'value' agora expõe as funções de ambas as branches
  const value = {
    user,
    isLoggedIn: !!user,
    login, // A nova função login(userObject)
    logout,
    updateUser, // Da branch 'login'
    updateUserContext // Da branch 'develop'
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