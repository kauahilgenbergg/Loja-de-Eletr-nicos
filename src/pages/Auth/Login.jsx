import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Auth.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/users'); 
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao buscar usuários');
            }

            const users = await response.json();

            const foundUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (foundUser) {
                // 3. Salve o usuário no Contexto!
                auth.login(foundUser); 

                alert('Login realizado com sucesso!');
                navigate('/home'); 
            } else {
                alert('Email ou senha inválidos.');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            alert(`Erro ao tentar fazer login: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
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