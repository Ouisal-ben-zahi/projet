import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Accueil from "./composants/Client/Accueil";
import Boutique from "./composants/Client/Boutique";
import Contact from "./composants/Client/Contact";
import Panier from "./composants/Client/Panier";
import Connecter from "./composants/Connecter";
import Inscrire from "./composants/Inscrire";
import Dashboard from "./composants/Admin/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <Provider store={store}>
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Boutique" element={<Boutique />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Panier" element={<Panier />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        <Route path="/Connecter" element={<Connecter />} />
        <Route path="/Inscrire" element={<Inscrire />} />
      </Routes>
    </>
  </Provider>
);

export default App;
