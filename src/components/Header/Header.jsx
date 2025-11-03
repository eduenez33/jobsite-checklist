import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">Listo.</h1>
        <p className="header__caption">
          Manage your construction sites and supply checklists
        </p>
      </div>
      <button className="header__button">
        + <span>Create New Site</span>
      </button>
    </header>
  );
}

export default Header;
