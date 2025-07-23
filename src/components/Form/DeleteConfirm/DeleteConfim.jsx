import { useContext } from "react"
import CurrentUserContext from "../../../contexts/CurrentUserContext.js"

export default function DeleteConfirm({ cardId, onCardDelete}) {
    const {currentUser} = useContext(CurrentUserContext);

    const handleDelete = () => {
        onCardDelete(cardId);
    }
    
  return (
    <div>
          <header className="profile__edit-form-header"></header>
          <button
            className="profile__edit-form-button profile__delete-button"
            id="delete-button"
            type="submit"
            onClick={handleDelete}
          >
            Si
          </button>
    </div>
  )
}