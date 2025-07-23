import { useState, useContext, useRef, useEffect } from 'react'; 
import CurrentUserContext from '../../../contexts/CurrentUserContext'; 
import formValidator from '../../../utils/FormValidator';

export default function EditProfile() {

  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser } = userContext;
  const inputRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
  };

    return (
        <form className="profile__edit-form" id="profile-form" ref={formRef} noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="profile__edit-form-input profile__edit-form-input_name"
          placeholder="Nombre"
          id="name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}  
        />
        <span className="form__input-error" id="name-error"></span>
        <input
          type="text"
          className="profile__edit-form-input profile__edit-form-input_job"
          placeholder="Acerca de mí"
          id="job"
          minLength="2"
          maxLength="200"
          required
          value={description}
          ref={inputRef}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error" id="job-error"></span>
        <button
            id="save-button"
            className="profile__edit-form-button profile__edit-form-button_save"
            type='submit'
          >
            Guardar
          </button>
      </form>
    )
}