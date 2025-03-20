import axios from 'axios';

export const definirCategories = (categories) => ({
  type: 'DEFINIR_CATEGORIES',
  payload: categories
});

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
};
