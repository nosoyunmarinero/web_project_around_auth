import Popup from "../Main/Popup/Popup.jsx";
import DeleteConfirm from "../Form/DeleteConfirm/DeleteConfim.jsx";

import trashIcon from "../../../images/thrashcan.svg";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;

  const imageComponent = {
    title: "",
    children: <ImagePopup card={{ name, link }} />
  };

  const confirmationPopup = { 
    title: "¿Estás seguro/a?", 
    children: <DeleteConfirm 
      cardId={props.card._id} 
      onCardDelete={props.onCardDelete} 
    /> 
  };

  const cardLikeButtonClassName = 
    isLiked ? 'element__like-button-active' : 'element__like-button'
  ;
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  return (
    <div className="element">
      <button className="element__button-image" onClick={() => handleOpenPopup(imageComponent)}>
        <img src={link} alt="Imagen" className="element__image" />
      </button>
      <button className="element__button-delete" id="delete-image-btn" onClick={() => handleOpenPopup(confirmationPopup)}>
        <img
          src={trashIcon}
          alt="Delete button"
          className="element__image-delete"
        />
      </button>
      <div className="element__description">
        <p className="element__title" id="card-title">{name}</p>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}> 
        </button>
      </div>
    </div>
  );
}