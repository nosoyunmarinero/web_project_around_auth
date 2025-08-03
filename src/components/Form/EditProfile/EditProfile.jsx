import React, { useRef, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import formValidator from '../../../utils/FormValidator';
import api from '../../../utils/api';

export default function EditProfile({ onClosePopup }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const nameRef = useRef();
  const aboutRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }

    if (currentUser) {
      nameRef.current.value = currentUser.name || '';
      aboutRef.current.value = currentUser.about || '';
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const updatedUser = await api.setUserInfo({
        name: nameRef.current.value,
        about: aboutRef.current.value
      });
      setCurrentUser(updatedUser);
      onClosePopup();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  }

  return (
    <form className="profile__edit-form" id="profile-form" ref={formRef} noValidate onSubmit={handleSubmit}>
      <input
        type="text"
        className="profile__edit-form-input profile__edit-form-input_name"
        placeholder="Nombre"
        id="profileName"
        ref={nameRef}
        required
        minLength="2"
        maxLength="40"
      />
      <span id="profileName-error" className="form__input-error"></span>
      <input
        type="text"
        className="profile__edit-form-input profile__edit-form-input_job"
        placeholder="Acerca de mí"
        id="profileJob"
        ref={aboutRef}
        required
        minLength="2"
        maxLength="200"
      />
      <span id="profileJob-error" className="form__input-error"></span>
      <button
        id="save-button"
        className="profile__edit-form-button profile__edit-form-button_save"
      >
        Guardar
      </button>
    </form>
  )
}
