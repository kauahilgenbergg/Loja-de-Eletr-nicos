import React, { useState, useMemo } from 'react'; 
import { useCart } from '../context/CartContext';
import SearchBar from '../components/layout/SearchBar.jsx'; 
import ProductCard from '../components/product/ProductCard.jsx'; 
import './Catalog.css'; 

const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price !== 'string') {
    return 0;
  }
  
  const cleanString = price
    .replace("R$", "")     
    .replace(/\./g, "")    
    .replace(",", ".")     
    .trim();               
    
  const number = parseFloat(cleanString);
  return isNaN(number) ? 0 : number;
};


function Catalog() {
  const [searchCriteria, setSearchCriteria] = useState({ term: '', filter: '' });

  const { 
    allProducts, 
    isLoading, 
    error,
    increaseQty,
    toggleWishlist
  } = useCart();

  const filteredProducts = useMemo(() => {
    const { term, filter } = searchCriteria;
    
    let products = [...(allProducts || [])];

    if (term) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    switch (filter) {
      case 'price_asc':
        products.sort((a, b) => parsePrice(a.preco) - parsePrice(b.preco));
        break;
      case 'price_desc':
        products.sort((a, b) => parsePrice(b.preco) - parsePrice(a.preco));
        break;
      case 'name_asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break; 
    }

    return products;
  }, [allProducts, searchCriteria]);

  if (isLoading) { 
    return <p>Carregando produtos...</p>;
  }
  if (error) { 
    return <p>Erro ao carregar produtos: {error.message}</p>;
  }

  return (
    <div className="catalog-container">
      <h1>Nosso Catálogo</h1>
      
      <SearchBar onSearch={setSearchCriteria} />
      
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => increaseQty(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado com o termo "{searchCriteria.term}"</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;