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

        const resourcePath = '/usuario'; 

        // --- ETAPA 1: Verificar se o e-mail já existe ---
        try {
            const checkResponse = await api.get(resourcePath, {
                params: { email: email }
            });

            // Se a API retornou 200 OK e a lista NÃO está vazia, o e-mail JÁ existe.
            if (checkResponse.data.length > 0) {
                alert('Este e-mail já está cadastrado.');
                setIsSubmitting(false);
                return;
            }
            
            // Se a API retornou 200 OK e a lista ESTÁ vazia, o e-mail está livre.
            // O código continua automaticamente para a ETAPA 2.

        } catch (error) {
            // Se a API retornou um erro...
            // Verificamos se é O ERRO 404 (Não Encontrado)
            if (error.response && error.response.status === 404) {
                // Ótimo! 404 significa que o e-mail não foi encontrado, então está livre.
                // O código continua para a ETAPA 2.
            } else {
                // Se foi qualquer OUTRO erro (500, erro de rede, etc.)
                console.error('Erro ao verificar e-mail:', error);
                const errorMsg = error.response?.data?.message || error.message;
                alert(`Erro ao verificar disponibilidade do e-mail: ${errorMsg}`);
                setIsSubmitting(false);
                return; // Para a execução aqui
            }
        }

        // --- ETAPA 2: Criar o novo usuário ---
        // (Só chegamos aqui se o e-mail estava livre - 200 c/ array vazio OU 404)
        try {
            const userData = { 
                name: name, 
                email: email, 
                password: password,
                imagem: "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-vetor.jpg",
                rua: "",
                numero: "",
                bairro: "",
                telefone: "",
                formaPagamento: "",
                tipo: "usuario",
            };

            const response = await api.post(resourcePath, userData); 

            console.log('Usuário cadastrado:', response.data);
            alert('Cadastro realizado com sucesso!');
            navigate('/login'); 

        } catch (error) {
            // Erro específico da criação (POST)
            console.error('Erro no cadastro:', error);
            const errorMsg = error.response?.data?.message || error.message;
            alert(`Erro ao cadastrar: ${errorMsg}`);
        } finally {
            // Isso será executado após a ETAPA 2 (sucesso ou falha)
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
                    t_ype="password" 
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

