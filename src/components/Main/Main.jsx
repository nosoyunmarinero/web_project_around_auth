import { useEffect, useState, useContext } from "react";
import Popup from "./Popup/Popup.jsx";
import NewCard from "../Form/NewCard/NewCard.jsx";
import EditProfile from "../Form/EditProfile/EditProfile.jsx";
import EditAvatar from "../Form/EditAvatar/EditAvatar.jsx";
import Card from "../Card/Card.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import editIcon from "../../../images/edit-button.svg";




export default function Main({popup, onOpenPopup, onClosePopup, onUpdateAvatar, cards, onCardLike, onCardDelete, onCardSubmit}) {
  
  const {currentUser} = useContext(CurrentUserContext);
  

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard onCardSubmit={onCardSubmit}/> };
  const avatarPopup = { title: "Editar avatar", children: <EditAvatar onUpdateAvatar={onUpdateAvatar}/> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> }; 
 


    return (
        <main className="content">
        {/*Profile*/}
        <section className="profile" id="profile">
          <div className="profile__avatar-container">
            <img src={currentUser.avatar} alt="Imagen de perfil." className="profile__avatar" />
            <button className="profile__avatar-edit-button" id="avatar-edit-button" onClick={() => onOpenPopup(avatarPopup)}>
              <img
                src={editIcon}
                alt="Editar avatar"
                className="profile__avatar-edit-icon"
              />
            </button>
            
          </div>
          <div className="profile__info">
            <h2 className="profile__name" id="profile-name">{currentUser.name}</h2>
            <h3 className="profile__about" id="profile-job">{currentUser.about}</h3>
            <button id="edit-button-open" className="profile__edit-button" onClick={() => onOpenPopup(editProfilePopup)}>
              <img src={editIcon} alt=" Boton editar" />
            </button>
          </div>
          <button aria-label="Add Card" className="profile__add-button" id="add-button-open" onClick={() => onOpenPopup(newCardPopup)}>+</button>
        </section>
        {/* Contenedor de tarjetas */}
        <div className="element-list__item">
          {/*Aqui aparecen las cards creadas con JS*/}
          {cards.map((card) => (
      <Card key={card._id} card={card} handleOpenPopup={onOpenPopup} onCardLike={onCardLike} onCardDelete={onCardDelete}
      
      />
    ))}
        </div>
        {/*Footer*/}
        <Footer />
        {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      </main>
    );
    
  }