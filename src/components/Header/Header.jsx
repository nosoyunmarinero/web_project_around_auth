import logo from "../../../images/header-logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useContext } from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Header({ children }) {

  const {loggedIn, setLoggedIn} = useAuth();
  const {currentUser} = useContext(CurrentUserContext)


  return (
    <header className="header">
      {loggedIn ? (
        <>
          <img
            src={logo}
            alt="Logo Around the U.S."
            className="header__logo"
          />
          {currentUser?.email && (
            <span className="header_email">{currentUser.email}</span>
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