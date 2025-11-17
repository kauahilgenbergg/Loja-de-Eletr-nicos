import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api'; // ✅ importando o api direto
import './Home.css'; 

function Home() {
  const [products, setProducts] = useState([]);

  /*useEffect(() => {
    // Busca 4 produtos para destaque
    const loadProducts = async () => {
      try {
        const response = await api.get('/produtos'); // ✅ chamada direta
        const allProducts = response.data;
        setProducts(allProducts.slice(0, 4)); // pega só os 4 primeiros
      } catch (error) {
        console.error("Falha ao carregar produtos:", error);
      }
    };
    loadProducts();
  }, []);*/

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h1>Bem-vindo à Eritrônicos</h1>
        <p>A tecnologia que você busca, com o preço que você merece.</p>
        <Link to="/catalog" className="btn-primary">Ver Catálogo</Link>
      </section>
    </div>
  );
}

export default Home;
