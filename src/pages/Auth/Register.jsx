import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

import './Auth.css'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não são iguais!");
            return;
        }

        const userData = { name, email, password };
        console.log("Dados de Registro:", userData);

    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Criar Conta</h2>
                
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </div>

                <button type="submit" className="auth-button">Registrar</button>

                <p className="auth-link">
                    Já tem uma conta? <Link to="/login">Faça Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;