import { Link,useLocation } from "react-router-dom";
import tudert from '../Images/tudert.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    const location = useLocation();
    const isActive =(path)=>location.pathname ==path ?"active":"";
    console.log(location.pathname);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <img src={tudert} alt="Tudert logo" className="logo" style={{ width: '100px', height: '100px' }} />
          </div>

          <div className="d-flex justify-content-center flex-grow-1">
            <ul className="navbar-nav d-flex justify-content-center w-100">
              <li className={`nav-item ms-5 ${isActive('/')}`}><Link to="/">Accueil</Link></li>
              <li className={`nav-item ms-5 ${isActive('/boutique')}`}><Link to="/boutique">Boutique</Link></li>
              <li className={`nav-item ms-5 ${isActive('/contact')}`}><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="d-flex justify-content-end">
            <ul className="navbar-nav d-flex justify-content-end">
              <li className="nav-item ms-3"><Link to="/search" aria-label="Search"><FontAwesomeIcon icon={faSearch} className="nav-icon" /></Link></li>
              <li className="nav-item ms-3"><Link to="/panier" aria-label="Cart"><FontAwesomeIcon icon={faShoppingCart} className="nav-icon" /></Link></li>
              <li className="nav-item ms-3"><button className="nav-btn btn btn-success">Se Connecter</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
