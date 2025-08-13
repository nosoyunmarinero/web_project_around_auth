import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { loginUser, registerUser } from '../utils/auth.js';
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import { CurrentUserProvider } from '../contexts/CurrentUserContext.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx";
import Popup from './Main/Popup/Popup.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Todos los useEffect deben estar aquí, al principio
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      api.updateToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      api.getInitialCards().then((data) => {
        const validCards = Array.isArray(data) ? data.filter(card => card && card._id) : [];
        setCards(validCards);
      }).catch(err => {
        console.log('No hay cards aún, empezando con array vacío');
        setCards([]);
      });
    }
  }, [isLoggedIn, token]);



  const handleLogin = (email, password) => {
    return loginUser({ email, password })
      .then(response => {
        console.log('Login response:', response);

        // Guardar token en localStorage
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setIsLoggedIn(true);
        api.updateToken(response.token);

        console.log('Login exitoso');
        navigate('/');
      })
      .catch(error => {
        console.error('Error en login:', error);
        throw error;
      });
  };

  const handleRegister = (email, password) => {
    return registerUser({ email, password })
      .then(response => {
        console.log('Registro exitoso:', response);
        return response;
      })
      .catch(error => {
        console.error('Error en registro:', error);
        throw error;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddPlaceSubmit = (data) => {
    api.addNewCard(data)
      .then((newCard) => {
        setCards(prevCards => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch(err => console.error('Error al agregar card:', err));
  };

  const handleUpdateUser = (data, currentUser, setCurrentUser) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data, currentUser, setCurrentUser) => {
    (async () => {
      await api.setAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
  }

  async function handleCardDelete(cardId) {
    await api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== cardId));
      handleClosePopup();
    })
  }

  // Renderizado condicional DEBE estar al final
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={
          <>
            <Login onLogin={handleLogin}
              handleOpenPopup={handleOpenPopup}
            />
            {popup && (
              <Popup onClose={handleClosePopup} title={popup.title}>
                {popup.children}
              </Popup>
            )}
          </>
        } />

        <Route path="/signup" element={
          <>
            <Register onRegister={handleRegister}
             handleOpenPopup={handleOpenPopup}
             />
            {popup && (
              <Popup onClose={handleClosePopup} title={popup.title}>
                {popup.children}
              </Popup>
            )}
          </>
        } />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="page__content">
                <CurrentUserProvider>
                  <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout} />
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onUpdateAvatar={handleUpdateAvatar}
                    onUpdateUser={handleUpdateUser}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onCardSubmit={handleAddPlaceSubmit}
                  />
                </CurrentUserProvider>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;


