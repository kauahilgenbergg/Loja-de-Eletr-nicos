import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Profile.css'; 

function Profile() {
  const auth = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(); 
    navigate('/login'); 
  };

  if (!auth.isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Você não está logado</h2>
        <p>Por favor, faça o login para ver seu perfil.</p>
        <button onClick={() => navigate('/login')}>Ir para Login</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Perfil do Usuário</h2>
      
      <div>
        <strong>Nome:</strong> {auth.user.name}
  	  </div>
  	  <div>
        <strong>Email:</strong> {auth.user.email}
  	  </div>
      <div>
        <strong>ID:</strong> {auth.user.id}
  	  </div>

  	  <hr style={{ margin: '20px 0' }} />

  	  <button 
        onClick={handleLogout} 
        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
      >
    	  Sair (Logout)
  	  </button>
  	</div>
  );
}

export default Profile;