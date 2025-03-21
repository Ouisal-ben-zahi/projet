import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoriesActions';
<<<<<<< HEAD
import '../../App.css';
import { Link } from 'react-router-dom';

const BarreCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories); 
=======
import PropTypes from 'prop-types';
import '../../App.css';

const BarreCategories = ({ onCategorySelect, activeCategoryId }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
>>>>>>> dev

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

<<<<<<< HEAD
  return (
    <div className="categories">
      <h3 className="title-categories"><strong>Catégories :</strong></h3>
      <ul>
        {categories && categories.length > 0 ? (
          categories.map((categorie) => (
            <li key={categorie.id}>
              <Link to={`/boutique?categorie=${categorie.id}`} style={{ color: 'black', textDecoration: 'none' }}>
              {categorie.type} </Link>
              
              
              
=======
  const handleCategoryClick = (categoryId) => {
    console.log('Category clicked in BarreCategories:', categoryId);
    if (typeof onCategorySelect === 'function') {
      onCategorySelect(categoryId);
    } else {
      console.error('onCategorySelect is not a function:', onCategorySelect);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="categories">
      <h3 className="title-categories"><strong>Catégories :</strong></h3>
      <ul className="categories-list">
        <li>
          <button 
            className={`category-button ${activeCategoryId === null ? 'active' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            Tous les produits
          </button>
        </li>
        {categories && categories.length > 0 ? (
          categories.map((categorie) => (
            <li key={categorie.id}>
              <button 
                className={`category-button ${activeCategoryId === categorie.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(categorie.id)}
              >
                {categorie.type}
              </button>
>>>>>>> dev
            </li>
          ))
        ) : (
          <p>Aucune catégorie disponible.</p>
        )}
      </ul>
    </div>
  );
};

<<<<<<< HEAD
=======
// Add PropTypes validation
BarreCategories.propTypes = {
  onCategorySelect: PropTypes.func,
  activeCategoryId: PropTypes.number
};

>>>>>>> dev
export default BarreCategories;
