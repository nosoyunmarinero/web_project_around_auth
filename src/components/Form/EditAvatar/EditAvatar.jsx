import React, { useRef, useEffect, useContext } from 'react';
import formValidator from '../../../utils/FormValidator';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.jsx';

export default function EditAvatar({onUpdateAvatar}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const inputRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: inputRef.current.value
      },
      currentUser,
      setCurrentUser
    );
  }

  return (
    <form className="profile__edit-form" id="avatar-form" ref={formRef} noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        className="profile__edit-form-input profile__edit-form-input_name"
        placeholder="https://ejemplo.com/imagen-ejemplo.jpg"
        id="avatarURL"
        ref={inputRef}
        required
      />
      <span id="avatarURL-error" className="form__input-error"></span>
      <button
        id="save-button"
        className="profile__edit-form-button profile__edit-form-button_save"
      >
        Guardar
      </button>
    </form>
  )
}