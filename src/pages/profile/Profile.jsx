import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import './Profile.css'; 

const formatPhone = (value) => {
  let v = (value || '').replace(/\D/g, '');
  v = v.substring(0, 11);
  v = v.replace(/^(\d{2})/, '($1) ');
  v = v.replace(/(\d{5})(\d{1,4})/, '$1-$2');
  return v;
};

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', telefone: '', endereco: '',
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
        endereco: auth.user.endereco || '',
      });
    }
  }, [auth.user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'telefone' ? formatPhone(value) : value;
    setFormData(prevState => ({ ...prevState, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (auth.updateUser) {
        const dataToSave = {
          ...formData,
          telefone: formData.telefone.replace(/\D/g, ''),
        };
        await auth.updateUser(dataToSave); 
        setIsEditing(false); 
      } else {
        console.error("Função 'updateUser' não definida no AuthContext!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!auth.isLoggedIn) {
    navigate('/login');
    return null; 
  }
  if (!auth.user) {
    return <p>Carregando dados...</p>;
  }

  return (
    // Removido o 'profile-page-container' para simplificar o layout
    <div className="profile-content-wrapper"> 
      
      <main className="profile-content">
        
        {!isEditing ? (
          <div className="profile-card-details">
            <h2>Perfil do Usuário</h2>
            <div><strong>Nome:</strong> {auth.user.name}</div>
            <div><strong>Email:</strong> {auth.user.email}</div>
            <div><strong>Telefone:</strong> {formData.telefone || "(Não informado)"}</div>
            <div><strong>Endereço:</strong> {formData.endereco || "(Não informado)"}</div>
            
            <div className="profile-actions"> {/* Novo div para os botões */}
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Sair (Logout)
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-card-details">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} readOnly title="O email não pode ser alterado." />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" maxLength="15" />
              </div>
              <div className="form-group">
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Ex: Rua, Número, Cidade - UF" />
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