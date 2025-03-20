import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../../layout/Footer';
import Navigation from '../../layout/Navigation';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../css/panier.css';
import BarreCategories from './BarreCategories';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLocation } from 'react-router-dom';

// Use a data URI for the placeholder to avoid network requests
const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNFOUVDRUYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ5NTA1NyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCI+SW1hZ2Ugbm9uIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';

const Boutique = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    if (categoryId) {
      setSelectedCategoryId(Number(categoryId));
    } else {
      setSelectedCategoryId(null);
    }
  }, [location.search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = selectedCategoryId 
        ? `http://localhost:8000/api/produites?categorie=${selectedCategoryId}`
        : 'http://localhost:8000/api/produites';
      
      console.log('Fetching products from:', url);
      const response = await axios.get(url);
      
      console.log('Products received:', response.data);

      const productsWithImages = response.data.map(product => {
        // Check if the product has a valid image URL
        const hasValidImage = product.image && !product.image.includes('undefined') && !product.image.includes('null');
        return {
          ...product,
          image: hasValidImage ? product.image : DEFAULT_IMAGE,
          imageUrl: hasValidImage ? `http://localhost:8000/api/images/${product.image.split('/').pop()}` : DEFAULT_IMAGE
        };
      });
      
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleAddToCart = (produit) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(item => item.id === produit.id);
    
    if (existingProductIndex !== -1) {
      // If product exists, increment quantity
      existingCart[existingProductIndex].quantity = (existingCart[existingProductIndex].quantity || 1) + 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      existingCart.push({
        ...produit,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Optional: Show some feedback to user
    alert('Produit ajouté au panier!');
  };

  const handleImageError = useCallback((e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = DEFAULT_IMAGE;
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div>
      <Navigation />
      <div className="boutique-container">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <BarreCategories 
                onCategorySelect={handleCategorySelect} 
                activeCategoryId={selectedCategoryId} 
              />
            </div>
            
            <div className="col-md-9">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="error-message">
                  <p>{error}</p>
                  <button className="retry-button" onClick={fetchProducts}>
                    Réessayer
                  </button>
                </div>
              ) : (
                <div className="produits-container">
                  <div className="produits-grid">
                    {products.length === 0 ? (
                      <div className="no-products">
                        <p>Aucun produit trouvé</p>
                      </div>
                    ) : (
                      products.map((produit) => (
                        <div
                          key={produit.id}
                          className="produit-card"
                          onMouseEnter={() => setHoveredProduct(produit.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <div className="produit-image-container">
                            <img
                              src={produit.imageUrl}
                              alt={produit.nom}
                              className="produit-image"
                              onError={handleImageError}
                              loading="lazy"
                            />
                            {hoveredProduct === produit.id && (
                              <div className="cart-icon-overlay">
                                <FontAwesomeIcon 
                                  icon={faShoppingCart} 
                                  className="cart-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(produit);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="produit-details">
                            <h3 className="produit-nom">{produit.nom}</h3>
                            <p className="produit-prix">{produit.prix} DH</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Boutique;