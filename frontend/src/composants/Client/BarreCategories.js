import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoriesActions';
import PropTypes from 'prop-types';
import '../../App.css';

const BarreCategories = ({ onCategorySelect, activeCategoryId }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
            </li>
          ))
        ) : (
          <p>Aucune catégorie disponible.</p>
        )}
      </ul>
    </div>
  );
};

// Add PropTypes validation
BarreCategories.propTypes = {
  onCategorySelect: PropTypes.func,
  activeCategoryId: PropTypes.number
};

export default BarreCategories;
