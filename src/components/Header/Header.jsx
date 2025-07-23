import logo from "../../../images/header-logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo Around the U.S."
        className="header__logo"
      />
      {children}
    </header>
  );
}

export default Header;