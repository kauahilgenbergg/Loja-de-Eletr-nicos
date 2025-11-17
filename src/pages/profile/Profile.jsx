import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// Importe os ícones
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaEdit, FaSignOutAlt, FaSave, FaTimes 
} from 'react-icons/fa';
// Importe o novo CSS
import './Profile.css'; 

// --- FUNÇÃO AUXILIAR ---
// (Mantida, pois está correta)
const formatPhone = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  return value.slice(0, 15);
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
  }, [auth.user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        const dataToSave = {
          name: formData.name,
          telefone: formData.telefone.replace(/\D/g, ''), // Salva apenas os números
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
        };

        await auth.updateUser(dataToSave);
        setIsEditing(false); 
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
  };

  // Guard Clauses (Mantidas, pois são boas práticas)
  if (!auth.isLoggedIn) {
    navigate('/login');
    return null; 
  }

  if (!auth.user) {
    return <div className="loading-spinner">Carregando dados...</div>; // Estilo de loading
  }

  return (
    <div className="profile-page">
      <main className="profile-card">

        {/* MODO DE VISUALIZAÇÃO */}
        {!isEditing ? (
          <div className="profile-view">
            <h2>Perfil do Usuário</h2>

            <section className="profile-section">
              <h3><FaUser /> Dados Pessoais</h3>
              <div className="profile-data">
                <div className="data-item">
                  <strong>Nome:</strong>
                  <span>{auth.user.name || "(Não informado)"}</span>
                </div>
                <div className="data-item">
                  <strong>Email:</strong>
                  <span>{auth.user.email || "(Não informado)"}</span>
                </div>
                <div className="data-item">
                  <strong>Telefone:</strong>
                  <span>{formData.telefone || "(Não informado)"}</span>
                </div>
              </div>
            </section>

            <section className="profile-section">
              <h3><FaMapMarkerAlt /> Endereço</h3>
              <div className="profile-data">
                <div className="data-item">
                  <strong>Rua:</strong>
                  <span>{formData.rua || "(Não informado)"}</span>
                </div>
                <div className="data-item">
                  <strong>Número:</strong>
                  <span>{formData.numero || "(Não informado)"}</span>
                </div>
                <div className="data-item">
                  <strong>Bairro:</strong>
                  <span>{formData.bairro || "(Não informado)"}</span>
                </div>
              </div>
            </section>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <FaEdit /> Editar Perfil
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>
          </div>
        ) : (
          /* MODO DE EDIÇÃO */
          <div className="profile-edit">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              
              <section className="profile-section">
                <h3><FaUser /> Dados Pessoais</h3>
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
              </section>

              <section className="profile-section">
                 <h3><FaMapMarkerAlt /> Endereço</h3>
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
              </section>

              <div className="form-buttons">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  <FaSave /> {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  <FaTimes /> Cancelar
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