import React, { useState } from 'react';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '400px',
  margin: '0 auto 20px auto',
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid black',
  borderRadius: '8px',
  textAlign: 'center',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


function UserForm({ onAddUser, isSubmitting }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !username) {
      alert("Por favor, preencha Nome, Email e Username.");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      phone: phone,
      username: username,
    };

    onAddUser(newUser);

    setName('');
    setEmail('');
    setPhone('');
    setUsername('');
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit} noValidate>
      <h3>Formulário de Cadastro</h3>
      <input
        style={inputStyle}
        type="text"
        placeholder="Nome Completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={inputStyle}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <input
        style={inputStyle}
        type="text"
        placeholder="Username (Login)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={inputStyle}
        type="tel"
        placeholder="Telefone (Opcional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button style={buttonStyle} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}

export default UserForm;