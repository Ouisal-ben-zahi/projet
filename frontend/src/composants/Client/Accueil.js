import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../layout/Footer';
import Navigation from '../../layout/Navigation';
import Slider from '../../layout/slider';
import BarreCategories from './BarreCategories';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../css/accueil.css';
import LoadingSpinner from '../common/LoadingSpinner';

const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNFOUVDRUYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ5NTA1NyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCI+SW1hZ2Ugbm9uIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';

const Accueil = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/produites');
      const products = response.data.slice(0, 6);
      
      const productsWithImages = products.map(product => ({
        ...product,
        imageUrl: product.image || DEFAULT_IMAGE
      }));
      
      setFeaturedProducts(productsWithImages);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const handleAddToCart = (produit) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCart.findIndex(item => item.id === produit.id);
    
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({ ...produit, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Produit ajouté au panier!');
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <div>
      <Navigation />
      <Slider/>
      
      <div className="container mt-5">
        <div className="row">
          {/* Left sidebar with categories */}
          <div className="col-md-3">
            <div className="categories">
              <h3 className="title-categories"><strong>Catégories :</strong></h3>
              <ul className="categories-list">
                <li>
                  <Link 
                    to="/Boutique"
                    className={`category-button ${activeCategoryId === null ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(null)}
                  >
                    Tous les produits
                  </Link>
                </li>
                {categories && categories.length > 0 ? (
                  categories.map((categorie) => (
                    <li key={categorie.id}>
                      <Link 
                        to={`/Boutique?categoryId=${categorie.id}`}
                        className={`category-button ${activeCategoryId === categorie.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(categorie.id)}
                      >
                        {categorie.type}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Aucune catégorie disponible.</p>
                )}
              </ul>
            </div>
          </div>
          
          {/* Right side with featured products */}
          <div className="col-md-9">
            <section className="featured-products">
              <h2>Nos Produits Vedettes</h2>
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="error-message">
                  <p>{error}</p>
                  <button 
                    className="retry-button"
                    onClick={fetchFeaturedProducts}
                  >
                    Réessayer
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {featuredProducts.map((produit) => (
                    <div
                      key={produit.id}
                      className="product-card"
                      onMouseEnter={() => setHoveredProduct(produit.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="product-image-container">
                        <img
                          src={produit.imageUrl}
                          alt={produit.nom}
                          className="product-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_IMAGE;
                          }}
                        />
                        {hoveredProduct === produit.id && (
                          <div className="cart-icon-overlay">
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              className="cart-icon"
                              onClick={() => handleAddToCart(produit)}
                            />
                          </div>
                        )}
                      </div>
                      <div className="product-details">
                        <h3>{produit.nom}</h3>
                        <p className="price">{produit.prix} DH</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Accueil;
