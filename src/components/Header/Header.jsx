import logo from "../../../images/header-logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ children, isLoggedIn, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      {isLoggedIn ? (
        <>
          <img
            src={logo}
            alt="Logo Around the U.S."
            className="header__logo"
          />
          {currentUser?.email && (
            <div className="header__user-info">
              <span className="header__email">{currentUser.email}</span>
              <button className="header__signout" onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
          {children}
        </>
      ) : (
        <>
          <img
            src={logo}
            alt="Logo Around the U.S."
            className="header__logo"
          />
          {children}
        </>
      )}
    </header>
  );
}

export default Header;