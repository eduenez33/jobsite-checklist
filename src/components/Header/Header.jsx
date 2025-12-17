import { MapPlus } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SitesContext from "../../contexts/SitesContext";

import "./Header.css";

function Header() {
  const { handleCreateSiteClick } = useContext(SitesContext);

  return (
    <header className="header">
      <div className="header__text">
        <Link to="/" className="header__link">
          <h1 className="header__title">Listo.</h1>
        </Link>
        <p className="header__caption">
          Manage your construction sites and supply checklists
        </p>
      </div>
      <button className="header__button" onClick={handleCreateSiteClick}>
        <MapPlus />
        <span>Create New Site</span>
      </button>
    </header>
  );
}

export default Header;
