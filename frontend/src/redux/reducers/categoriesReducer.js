const initialState = {
  categories: [],
<<<<<<< HEAD
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEFINIR_CATEGORIES':
      return {
        ...state,  // On garde les autres propriétés du state inchangées
        categories: action.payload,  // On met à jour seulement categories
=======
  loading: false,
  error: null
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
>>>>>>> dev
      };
    default:
      return state;
  }
};

export default categoriesReducer;
