import React from 'react';
import './AboutUs.css'; 

function AboutUs() {
  return (
    <div className="about-page-container">
      <div className="about-card">
        <section className="about-section">
          <h2>Sobre a Eritrônicos</h2>
          <p>
            Fundada em 2025, pelos estudantes de Engenharia de Software: Erick, Kauã e Gustavo. A Eritrônicos nasceu de um sonho de facilitar o acesso à tecnologia de ponta. Acreditamos que a inovação deve estar ao alcance de todos.
          </p>
        </section>

        <section className="about-section">
          <h2>Nossa Missão</h2>
          <p>
            Oferecer os melhores produtos eletrônicos, com o melhor preço, e um atendimento ao cliente que realmente resolve.
          </p>
        </section>
      </div>
    </div>
  );
}
export default AboutUs;