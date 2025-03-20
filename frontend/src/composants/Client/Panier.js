import React, { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../../layout/Navigation';
import '../css/panier.css';

// Image par défaut si l'image du produit ne charge pas
const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNFOUVDRUYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ5NTA1NyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCI+SW1hZ2Ugbm9uIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';

const Panier = () => {
  const [count, setCount] = useState(0);
  const [IdUser, setIdUser] = useState(1);
  const [panier, setPanier] = useState([]);
  const [produites, setProduites] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [localCartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    // 1. Récupérer les produits du panier depuis l'API
    const fetchPanier = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ligne-commandes");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPanier(data.ligneCommandes || []);
        setProduites(data.produites || []);
      } catch (error) {
        console.error("Error fetching panier data:", error);
        setError(error.message);
      }
    };

    // 2. Récupérer les produits du panier depuis localStorage
    const getLocalCart = () => {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log("LocalStorage cart:", localCart);
      setLocalCartItems(localCart);
    };

    fetchPanier();
    getLocalCart();
  }, []);

  // Gestion des erreurs d'image
  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = DEFAULT_IMAGE;
  };

  const getProduitDetails = (IdProduite) => {
    return produites.find((produite) => produite.id === IdProduite);
  };

  const calculateItemTotal = (item) => {
    const produit = getProduitDetails(item.id_produite);
    return produit ? produit.prix * item.quantité : 0;
  };

  const calculateCartTotal = () => {
    return panier
      .filter((item) => item.id_utilisateur === IdUser)
      .reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ligne-commandes/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantité: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const data = await response.json();
      console.log('Quantity updated successfully:', data);

      setPanier((prevPanier) =>
        prevPanier.map((item) =>
          item.id === itemId ? { ...item, quantité: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError(error.message);
    }
  };

  const handleIncrement = (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(itemId, newQuantity);
  };

  const handleDecrement = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(itemId, newQuantity);
    }
  };

  // Implémentation correcte de handleAddToCart
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
    
    // Update local state to reflect changes
    setLocalCartItems(existingCart);
    
    // Optional: Show some feedback to user
    alert('Produit ajouté au panier!');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navigation />
      <h5 className="my-4 container">Panier</h5>

      <div className="d-flex container">
        {/* Tableau des produits du panier */}
        <div className="product-table">
          <table className="table table-borderless custom-table">
            <thead>
              <tr>
                <th className="border-bottom-green">Produit</th>
                <th className="border-bottom-green">Prix</th>
                <th className="border-bottom-green">Quantité</th>
                <th className="border-bottom-green">Totale</th>
                <th className="border-bottom-green"></th>
              </tr>
            </thead>
            <tbody>
              {/* Afficher les produits du panier venant de l'API */}
              {panier
                .filter((item) => item.id_utilisateur === IdUser)
                .map((item) => {
                  const produit = getProduitDetails(item.id_produite);
                  return (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={produit && produit.image ? produit.image : DEFAULT_IMAGE}
                            alt={produit ? produit.nom : 'Produit'}
                            style={{ width: "50px", height: "50px", marginRight: "10px" }}
                            onError={handleImageError}
                          />
                          {produit ? produit.nom : 'Produit non trouvé'}
                        </div>
                      </td>
                      <td>{produit ? `${produit.prix} DH` : 'N/A'}</td>
                      <td>
                        <button
                          style={{ margin: "5px", padding: "5px" }}
                          className="btn btn-success"
                          onClick={() => handleDecrement(item.id, item.quantité)}
                          disabled={item.quantité <= 1}
                        >
                          -
                        </button>
                        {item.quantité}
                        <button
                          style={{ margin: "5px", padding: "5px" }}
                          className="btn btn-success"
                          onClick={() => handleIncrement(item.id, item.quantité)}
                        >
                          +
                        </button>
                      </td>
                      <td>{calculateItemTotal(item)} DH</td>
                      <td>
                        <a>
                          <FontAwesomeIcon icon={faTrash} className="delete-icon" size="lg" style={{ color: "red" }} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              
              {/* Afficher les produits du panier venant de localStorage */}
              {localCartItems.map((item) => (
                <tr key={`local-${item.id}`}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.image || item.imageUrl || DEFAULT_IMAGE}
                        alt={item.nom}
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                        onError={handleImageError}
                      />
                      {item.nom || 'Produit non nommé'}
                    </div>
                  </td>
                  <td>{item.prix} DH</td>
                  <td>
                    <button
                      style={{ margin: "5px", padding: "5px" }}
                      className="btn btn-success"
                      onClick={() => {
                        // Décrémenter la quantité dans localStorage
                        const updatedCart = localCartItems.map(cartItem => 
                          cartItem.id === item.id && cartItem.quantity > 1 
                            ? {...cartItem, quantity: cartItem.quantity - 1} 
                            : cartItem
                        );
                        setLocalCartItems(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                      }}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      style={{ margin: "5px", padding: "5px" }}
                      className="btn btn-success"
                      onClick={() => {
                        // Incrémenter la quantité dans localStorage
                        const updatedCart = localCartItems.map(cartItem => 
                          cartItem.id === item.id 
                            ? {...cartItem, quantity: cartItem.quantity + 1} 
                            : cartItem
                        );
                        setLocalCartItems(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.prix * item.quantity} DH</td>
                  <td>
                    <a onClick={() => {
                      // Supprimer l'élément du panier localStorage
                      const updatedCart = localCartItems.filter(cartItem => cartItem.id !== item.id);
                      setLocalCartItems(updatedCart);
                      localStorage.setItem('cart', JSON.stringify(updatedCart));
                    }}>
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" size="lg" style={{ color: "red" }} />
                    </a>
                  </td>
                </tr>
              ))}
              
              {/* Afficher un message si le panier est vide */}
              {panier.filter(item => item.id_utilisateur === IdUser).length === 0 && localCartItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    Votre panier est vide. <a href="/boutique">Continuer vos achats</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Résumé du panier */}
        <div className="cart-summary">
          <table className="table table-borderless custom-table ms-5">
            <tbody>
              <tr>
                <th className="border-bottom-green">Totale Panier</th>
              </tr>
              <tr>
                <td className="bold-text">
                  Total d'articles : <span className="bold-text">
                    {calculateCartTotal() + localCartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0)}
                  </span> DH
                </td>
              </tr>
              <tr>
                <td className="bold-text">
                  Nombre d'articles : {panier.filter((item) => item.id_utilisateur === IdUser).length + localCartItems.length}
                </td>
              </tr>
              <tr>
                <td>
                  <button className="btn btn-success">Valider Commande</button>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/boutique">
                    Continuer Vos Achats
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggestions de produits */}
      <div className="produits-container my-4 container">
        <h5>D'autres suggestions pour vous</h5>
        <div className="produits-grid">
          {produites.slice(0, 6).map((produit) => (
            <div
              key={produit.id}
              className="produit-card"
              onMouseEnter={() => setHoveredProduct(produit.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="produit-image-container">
                <img
                  src={produit.image || DEFAULT_IMAGE}
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
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Panier;