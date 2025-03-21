<<<<<<< HEAD
import api from "../../api";
=======
import axios from 'axios';
>>>>>>> dev

export const definirCategories = (categories) => ({
  type: 'DEFINIR_CATEGORIES',
  payload: categories
});

<<<<<<< HEAD
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/categories'); // Assure-toi que cette route existe
      console.log("Catégories récupérées :", response.data); // Debugging

      dispatch(definirCategories(response.data));
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };
=======
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });

    const response = await axios.get('http://localhost:8000/api/categories');
    console.log('Categories fetched:', response.data); // Debug log

    dispatch({
      type: 'FETCH_CATEGORIES_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch({
      type: 'FETCH_CATEGORIES_FAILURE',
      payload: error.message
    });
  }
>>>>>>> dev
};
