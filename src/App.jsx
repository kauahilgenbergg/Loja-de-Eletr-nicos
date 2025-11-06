import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

// Estilo para o container principal (com o título centralizado)
const appStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  textAlign: 'center',
};

const successStyle = {
  color: 'green',
  backgroundColor: '#e6ffed',
  border: '1px solid green',
  padding: '10px',
  borderRadius: '4px',
  margin: '10px 0',
  textAlign: 'center', 
};

// Estilo para a mensagem de erro (já tínhamos)
const errorStyle = {
  color: 'red',
  backgroundColor: '#ffeeee',
  border: '1px solid red',
  padding: '10px',
  borderRadius: '4px',
  margin: '10px 0',
  textAlign: 'center',
};


function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // 1. NOVO ESTADO para a mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState('');

  // Efeito para "Listagem" (Read / GET)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/users?_limit=5');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError("Erro ao buscar usuários.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Função para "Cadastro" (Create / POST) - MODIFICADA
  const handleAddUser = async (newUser) => {
    try {
      setIsSubmitting(true);
      setError(null); // Limpa erros antigos
      setSuccessMessage(''); // Limpa sucessos antigos

      const response = await api.post('/users', newUser);

      setUsers(prevUsers => [...prevUsers, response.data]);

      // 2. ATUALIZA A MENSAGEM de sucesso
      setSuccessMessage('Cadastro realizado com sucesso!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); 

    } catch (err) {
      setError("Erro ao cadastrar usuário.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderização principal
  return (
    <div style={appStyle}>
      <h1>Aplicação de Cadastro</h1>

      {/* Formulário de Cadastro */}
      <UserForm onAddUser={handleAddUser} isSubmitting={isSubmitting} />

      {/* 4. MOSTRA AS MENSAGENS AQUI (logo acima do formulário) */}
      {successMessage && <div style={successStyle}>{successMessage}</div>}
      {error && <div style={errorStyle}>{error}</div>}

      <hr />

      {/* Listagem de Usuários */}
      {isLoading ? (
        <p>Carregando usuários...</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default App;