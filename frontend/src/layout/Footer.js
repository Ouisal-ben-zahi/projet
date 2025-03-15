import React from 'react';
import './Footer.css'; // Importation du fichier CSS

const Footer = () => {
  return (
    <footer className="footer">
      {/* Première liste horizontale */}
      <div className="footer-row">
        <div className="footer-item">
          <div className="icon-title-container">
            <img src="/images/PH_FOOTER 1.png" alt="Arrosage des plantes" className="icon-title" />
          </div>
          <h3>Arrosage des plantes</h3>
          <p >Une plateforme en ligne spécialisée dans
           la vente de plantes, accessoires de
           jardinage et produits connexes</p>
        </div>
        <div className="footer-item">
          <div className="icon-title-container">
            <img src="/images/PH_FOOTER 1.png" alt="Entretien du Jardin" className="icon-title" />
          </div>
          <h3>Entretien du Jardin</h3>
          <p >Une plateforme en ligne spécialisée dans la vente de plantes, accessoires de jardinage et produits connexes</p>
        </div>
        <div className="footer-item">
          <div className="icon-title-container">
            <img src="/images/PH_FOOTER 1.png" alt="Rénovation d'Usine" className="icon-title" />
          </div>
          <h3>Rénovation d'Usine</h3>
          <p>Une plateforme en ligne spécialisée dans la vente de plantes, accessoires de jardinage et produits connexes</p>
        </div>
      </div>

      {/* Deuxième liste horizontale */}
      <div className="footer-row hover-row">
        <div className="footer-item">
          <p>
            <img src="/images/Calling.png" alt="Téléphone" className="icon-contact" /> +212 0512363381
          </p>
        </div>
        <div className="footer-item">
          <p>
            <img src="/images/Location.png" alt="Adresse" className="icon-contact" /> Aghmat Centre, Al Haouz - Marrakech
          </p>
        </div>
        <div className="footer-item">
          <p>
            <img src="/images/Message.png" alt="E-mail" className="icon-contact" /> contact@toudert.com
          </p>
        </div>
      </div>

      {/* Troisième liste horizontale */}
      <div className="footer-row">
        <div className="footer-item">
          <h3>Mon Compte</h3>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/boutique">Boutique</a></li>
            <li><a href="/plantes">Plantes</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>Catégories</h3>
          <ul>
            <li ><a href="/plantes">Plantes</a></li>
            <li ><a href="/accessoires">Accessoires de jardinage</a></li>
            <li  ><a href="/produits">Produits connexes</a></li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>Réseaux sociaux</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/Facebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/Instagram.png" alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/Linkedin.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;