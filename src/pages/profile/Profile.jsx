import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// --- FUNÇÃO AUXILIAR ---
// Adicionada para formatar o telefone, pois estava sendo usada
// mas não definida no código original.
const formatPhone = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses nos dois primeiros dígitos
  value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen depois dos 5 primeiros dígitos (para celular)
  return value.slice(0, 15); // Limita ao tamanho (XX) XXXXX-XXXX
};
// --- FIM DA FUNÇÃO AUXILIAR ---


function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
  });

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  useEffect(() => {
    if (auth.user) {
      setFormData({
        name: auth.user.name || '',
        email: auth.user.email || '',
        telefone: formatPhone(auth.user.telefone || ''),
        rua: auth.user.rua || '',
        numero: auth.user.numero || '',
        bairro: auth.user.bairro || '',
      });
    }
    // A dependência 'isEditing' garante que, se o usuário cancelar a edição,
    // os dados do formulário sejam redefinidos para os valores originais do 'auth.user'.
  }, [auth.user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formata o telefone em tempo real
    const finalValue = name === 'telefone' ? formatPhone(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (auth.updateUser) {
        // Prepara os dados para salvar, removendo a formatação do telefone
        const dataToSave = {
          name: formData.name,
          telefone: formData.telefone.replace(/\D/g, ''), // Salva apenas os números
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
        };

        await auth.updateUser(dataToSave);
        setIsEditing(false); // Volta para o modo de visualização
      } else {
        console.error("Função 'updateUser' não definida no AuthContext!");
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // O useEffect [auth.user, isEditing] será disparado e reverterá os dados
  };

  // Guard Clause: Redireciona se não estiver logado
  if (!auth.isLoggedIn) {
    navigate('/login');
    return null; // Retorna null para evitar renderizar o restante
  }

  // Guard Clause: Mostra 'Carregando' se o usuário ainda não foi carregado
  if (!auth.user) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="profile-content-wrapper">
      <main className="profile-content">

        {/* MODO DE VISUALIZAÇÃO */}
        {!isEditing ? (
          <div className="profile-card-details">
            <h2>Perfil do Usuário</h2>

            <div><strong>Nome:</strong> {auth.user.name}</div>
            <div><strong>Email:</strong> {auth.user.email}</div>
            {/* Usamos o formData.telefone para mostrar o valor formatado */}
            <div><strong>Telefone:</strong> {formData.telefone || "(Não informado)"}</div>

            <div><strong>Rua:</strong> {formData.rua || "(Não informado)"}</div>
            <div><strong>Número:</strong> {formData.numero || "(Não informado)"}</div>
            <div><strong>Bairro:</strong> {formData.bairro || "(Não informado)"}</div>

            <div className="profile-actions">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Sair (Logout)
              </button>
            </div>
          </div>
        ) : (
          /* MODO DE EDIÇÃO */
          <div className="profile-card-details">
            <h2>Editar Perfil</h2>

            <form onSubmit={handleSubmit} className="profile-form">

              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  title="O email não pode ser alterado."
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength="15"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rua">Rua:</label>
                <input
                  type="text"
                  id="rua"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                  placeholder="Ex: Av. Brasil"
                />
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número:</label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Ex: 123"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bairro">Bairro:</label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Ex: Centro"
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-button" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>

                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default Profile;