import { useState,useEffect } from 'react'


import api from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

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
  
  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
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
    
    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
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
    
      <div className="page__content">
      <CurrentUserContext.Provider value={{currentUser, handleUpdateUser}}>
        <Header />
      <Main 
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        onUpdateAvatar={handleUpdateAvatar}
        popup={popup}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onCardSubmit={handleAddPlaceSubmit}
      />
      </CurrentUserContext.Provider>
    </div>
    
  )
}

export default App
