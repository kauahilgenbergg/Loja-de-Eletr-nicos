import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Auth.css'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); 

        if (password !== confirmPassword) {
            alert("As senhas não são iguais!");
            setIsSubmitting(false); 
            return;
        }

        const userData = { name, email, password };

        try {
            const response = await fetch('/api/users', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro do servidor:", errorText);
                throw new Error(errorText || 'Falha ao cadastrar');
            }

            const data = await response.json(); 
            console.log('Usuário cadastrado:', data);

            alert('Cadastro realizado com sucesso!');
            navigate('/login'); 

        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert(`Erro ao cadastrar: ${error.message}`);
        } finally {
            setIsSubmitting(false); 
        }
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

                <button type="submit" className="auth-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <p className="auth-link">
                    Já tem uma conta? <Link to="/login">Faça Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;