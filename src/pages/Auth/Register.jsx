// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Auth.css'; 
import { api } from '../../services/api';

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

        try {
            // Passo 1: Verificar se o e-mail já existe
            const checkResponse = await api.get('/usuario', {
                params: { email: email }
            });

            if (checkResponse.data.length > 0) {
                alert('Este e-mail já está cadastrado.');
                setIsSubmitting(false);
                return;
            }

            const userData = { 
                name: name, 
                email: email, 
                password: password,
                
                // Avatar padrão
                imagem: "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-vetor.jpg",
                
                // Campos de endereço/pagamento vazios
                rua: "",
                numero: "",
                bairro: "",
                telefone: "",
                formaPagamento: "",

                // --- MUDANÇA AQUI ---
                // Tipo fixo como "usuario", como solicitado
                tipo: "usuario"
                // --- FIM DA MUDANÇA ---
            };

            // Passo 2: Se não existir, criar o usuário
            const response = await api.post('/usuario', userData);

            console.log('Usuário cadastrado:', response.data);
            alert('Cadastro realizado com sucesso!');
            navigate('/login'); 

        } catch (error) {
            console.error('Erro no cadastro:', error);
            const errorMsg = error.response?.data?.message || error.message;
            alert(`Erro ao cadastrar: ${errorMsg}`);
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
                
                <p className="auth-switch">
                  Já tem uma conta? <Link to="/login">Faça o Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;