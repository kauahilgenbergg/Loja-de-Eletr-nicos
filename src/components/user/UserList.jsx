import React from 'react';

// Estilos simples para a lista (opcional, pode ir no index.css)
const listStyle = {
  listStyle: 'none',
  padding: 0,
};

const itemStyle = {
  background: '#e0f7fa',
  color: 'black',
  border: '1px solid #ddd',
  margin: '5px 0',
  padding: '10px',
  borderRadius: '4px',
  textAlign: 'left',
};

function UserList({ users }) {
  if (users.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <div>
      <h3>Usuários Cadastrados</h3>
      <ul style={listStyle}>
        {users.map(user => (
          <li key={user.id} style={itemStyle}>
            <strong>{user.name}</strong> ({user.email})
            <br />
            <small>Username: {user.username} | Telefone: {user.phone}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;