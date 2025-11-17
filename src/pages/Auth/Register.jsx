import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const checkUser = await api.get(`/users?email=${email}`);
      if (checkUser.data.length > 0) {
        setError('Este email já está cadastrado.');
        return;
      }

      const response = await api.post('/users', { name, email, password });
      
      auth.login(email, password);

    } catch (err) {
      setError('Falha ao cadastrar. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>
        
        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        
        <button type="submit" className="auth-button">Criar Conta</button>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Faça o Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;