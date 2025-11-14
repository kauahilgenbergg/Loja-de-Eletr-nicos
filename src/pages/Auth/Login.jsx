import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Auth.css'; 

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 

        console.log("Dados do Login:", { email, password });

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

                <button type="submit" className="auth-button">Entrar</button>

                <p className="auth-link">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;