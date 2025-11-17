// src/pages/Auth/Login.jsx (ou onde o seu estiver)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Auth.css'; 
import { api } from '../../services/api'; // <-- 1. IMPORTAR SUA API

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // 2. CORRIGIDO: Usar api.js e filtrar via 'params'
        try {
            // A MockAPI permite filtrar. Isto é mais seguro e eficiente.
            const response = await api.get('/usuario', {
                params: {
                    email: email,
                    password: password
                }
            });

            // Se a MockAPI retornar um array com 1 item, o usuário existe
            if (response.data.length > 0) {
                const foundUser = response.data[0];
                
                auth.login(foundUser); // Salva o usuário no Contexto

                alert('Login realizado com sucesso!');
                navigate('/home'); // Redireciona para a home
            } else {
                alert('Email ou senha inválidos.');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            const errorMsg = error.response?.data?.message || error.message;
            alert(`Erro ao tentar fazer login: ${errorMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                {/* ... (o resto do seu JSX continua igual) ... */}
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
                  />
                </div>

                <button type="submit" className="auth-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>

                <p className="auth-link">
                    Não tem uma conta? <Link to="/">Cadastre-se</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;