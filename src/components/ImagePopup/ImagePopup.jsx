import closeIcon from "../../../images/Close-Icon.svg";

export default function ImagePopup(props) {
    const { card } = props;
    return (
        <>
          <div className="popup__image">
            <img
              src={card.link}
              alt={card.name}
              className="popup__image-content" />
          </div>
          <p className="popup__image-title">{card.name}</p>
        </>
    ) 
}