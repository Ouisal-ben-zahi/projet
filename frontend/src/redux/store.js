<<<<<<< HEAD
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import {thunk} from "redux-thunk";
import produitsReducer from './reducers/produitsReducer';
import utilisateursReducer from './reducers/utilisateursReducer';
import panierReducer from './reducers/panierReducer';
import commandesReducer from './reducers/commandesReducer';
import categoriesReducer from './reducers/categoriesReducer';


// Combinaison des reducers
const rootReducer = combineReducers({
  produits: produitsReducer,
  utilisateurs: utilisateursReducer,
  panier: panierReducer,
  commandes: commandesReducer,
  categories:categoriesReducer,
  
});

// Création du store Redux
const store = createStore(rootReducer,applyMiddleware(thunk));

=======
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './reducers/categoriesReducer';
import { thunk } from 'redux-thunk';

// Remove the old createStore setup and just use configureStore
const store = configureStore({
  reducer: {
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)
});

>>>>>>> dev
export default store;