import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import store from './redux/store';
import Accueil from './Client/Accueil'; 
import Boutique from './Client/Boutique'; 
import Contact from './Client/Contact'; 
import Panier from './Client/Panier';

import GestionCommandes from './Admin/GestionCommandes';
import GestionPaiement from './Admin/GestionProduits';
import GestionUtilisateur from './Admin/GestionUtilisateur';
import GestionProduits from './Admin/GestionProduits';
import TableauBord from './Admin/TableauBord';

import Connecter from './Connecter';
import Inscrire from './Inscrire';

import Footer from './layout/Footer';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Définir les routes */}
        <Route path="/" element={<Accueil />} />
        <Route path="/Boutique" element={<Boutique />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Panier" element={<Panier />} />       
        <Route path="/GestionCommandes" element={<GestionCommandes />} />
        <Route path="/GestionPaiement" element={<GestionPaiement />} />
        <Route path="/GestionUtilisateur" element={<GestionUtilisateur />} />
        <Route path="/GestionProduits" element={<GestionProduits />} />
        <Route path="/TableauBord" element={<TableauBord />} />
        <Route path="/Connecter" element={<Connecter />} />
        <Route path="/Inscrire" element={<Inscrire />} />

 

      </Routes>

      {/* Ajout du Footer */}

      <Footer />
    </BrowserRouter>
  </Provider>
);

export default App;

