import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import api from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import { CurrentUserProvider } from '../contexts/CurrentUserContext.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import Login from "./Login/Login.jsx"
import Signup from "./Register/Register.jsx"
import InfoTooltip from './InfoTooltip/InfoTooltip';
import Popup from './Main/Popup/Popup.jsx';

function App() {

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, []);

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.addNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  }

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

  return (
    <>
      <Routes>
        <Route path="/login" element={
          <>
            <Login handleOpenPopup={handleOpenPopup} />
            {popup && (
              <Popup onClose={handleClosePopup} title={popup.title}>
                {popup.children}
              </Popup>
            )}
          </>
        } />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={true}>
              <div className="page__content">
                {/* ✅ CAMBIO PRINCIPAL: Usar CurrentUserProvider en lugar del Context.Provider manual */}
                <CurrentUserProvider>
                  <Header />
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

export default App