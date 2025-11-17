// src/pages/checkout/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importe o useAuth

// Recebe a nova prop 'isLoading'
export default function AddressForm({ onGoToPayment, isLoading }) {
  const { user } = useAuth(); // Pegue o usuário logado

  // Inicie os campos com os dados do usuário, se existirem
  const [rua, setRua] = useState(user?.rua || '');
  const [numero, setNumero] = useState(user?.numero || '');
  const [bairro, setBairro] = useState(user?.bairro || '');
  const [telefone, setTelefone] = useState(user?.telefone || '');
  
  const [error, setError] = useState('');

  // Se o usuário for carregado depois, atualize os campos
  useEffect(() => {
    if (user) {
      setRua(user.rua || '');
      setNumero(user.numero || '');
      setBairro(user.bairro || '');
      setTelefone(user.telefone || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // Não faça nada se já estiver carregando
    
    // Validação simples
    if (!rua || !numero || !bairro || !telefone) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    
    // Envia os dados para o 'Cart.jsx'
    onGoToPayment({
      rua,
      numero,
      bairro,
      cidade: 'Ponta Grossa', // Fixo
      telefone,
    });
  };

  return (
    <div className="checkout-form-container">
      <h3>🚚 Informações de Entrega</h3>
      <p>Entregamos apenas em Ponta Grossa - PR.</p>
      
      {error && <p className="form-error" style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        
        {/* --- OS INPUTS QUE FALTAVAM --- */}

        <div className="form-group">
          <label htmlFor="rua">Rua / Avenida</label>
          <input
            id="rua"
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            placeholder="Ex: Av. Vicente Machado"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="numero">Número</label>
          <input
            id="numero"
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ex: 500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Ex: Centro"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            value="Ponta Grossa"
            disabled // Campo travado
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone / WhatsApp</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(42) 99999-9999"
          />
        </div>

        {/* --- FIM DOS INPUTS QUE FALTAVAM --- */}

        <button 
          type="submit" 
          className="payment-btn" 
          disabled={isLoading}
        >
          {isLoading ? 'Salvando Endereço...' : 'Escolher Forma de Pagamento'}
        </button>
      </form>
    </div>
  );
}