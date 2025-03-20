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

export default store;