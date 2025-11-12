import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // 1. Importa o hook do contexto
import SearchBar from '../components/layout/SearchBar.jsx';
import ProductCard from '../components/product/ProductCard.jsx'; 
import './Catalog.css'; 

function Catalog() {
  // 2. Não temos mais useState para 'allProducts', 'isLoading' ou 'error'
  const [searchTerm, setSearchTerm] = useState('');

  // 3. Pega tudo o que precisa do Contexto
  const { 
    allProducts, 
    isLoading, 
    error,
    increaseQty,      // Função para adicionar ao carrinho
    toggleWishlist    // Função para favoritar
  } = useCart();

  // 4. Filtra a lista mestre (allProducts) que veio do contexto
  const filteredProducts = (allProducts || []).filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 5. Os estados de 'loading' e 'error' também vêm do contexto
  if (isLoading) { 
    return <p>Carregando produtos...</p>;
  }
  if (error) { 
    return <p>Erro ao carregar produtos: {error.message}</p>;
  }

  // 6. O 'return' é o mesmo, mas agora o 'ProductCard' vai receber as funções
  return (
    <div className="catalog-container">
      <h1>Nosso Catálogo</h1>
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            
            // 7. Passa as funções do contexto para o Card
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => increaseQty(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />

          ))
        ) : (
          <p>Nenhum produto encontrado com o termo "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;