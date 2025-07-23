import closeIcon from "../../../../images/Close-Icon.svg";

export default function Popup(props) {
    const { onClose, title, children} = props;
    return (
        <div className="popup">
          <div
            className={title ? "popup__content" : "element__modal"}
          >
            <button className="popup__close_button" onClick={onClose}>
              <img
                src={closeIcon}
                alt="Cerrar"
                id="avatar-button-close"
                className="profile__close-icon"
              />
            </button>
            {title && <header className="profile__edit-form-header">{title}</header>}
            {children}
          </div>
        </div>
    )
}