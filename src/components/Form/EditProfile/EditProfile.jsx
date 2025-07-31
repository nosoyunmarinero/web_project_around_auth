import React, { useRef, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext'; // ← Importar contexto
import formValidator from '../../../utils/FormValidator';
import api from '../../../utils/api'; // ← Importar API

export default function EditAvatar() { // ← Quitar prop onUpdateAvatar
  const { setCurrentUser } = useContext(CurrentUserContext); // ← Usar contexto
  const avatarRef = useRef(); // ← Corregir: era inputRef pero usabas avatarRef
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // ← Usar API directamente
      const updatedUser = await api.setAvatar({
        avatar: avatarRef.current.value // ← Corregir: era avatarURL
      });
      setCurrentUser(updatedUser); // ← Actualizar contexto
    } catch (error) {
      console.error('Error al actualizar avatar:', error);
    }
  }

  return (
    <form className="profile__edit-form" id="avatar-form" ref={formRef} noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        className="profile__edit-form-input profile__edit-form-input_name"
        placeholder="https://ejemplo.com/imagen-ejemplo.jpg"
        id="avatarURL"
        ref={avatarRef} // ← Corregir: usar avatarRef consistentemente
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