import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}&password=${password}`); 
      
      if (response.data.length > 0) {
        const foundUser = response.data[0];
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        setUser(foundUser);
        navigate('/home');
      } else {
        throw new Error("Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const updateUser = async (newData) => {
    if (!user || !user.id) {
      console.error("Usuário não encontrado para atualizar");
      throw new Error("Usuário não autenticado");
    }

    try {
      const response = await api.put(`/users/${user.id}`, newData);
      
      setUser(response.data); 
      
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      
      console.log("Perfil atualizado com sucesso!");
      
    } catch (error) {
      console.error("Erro no AuthContext ao atualizar usuário:", error);
      throw error; 
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser
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