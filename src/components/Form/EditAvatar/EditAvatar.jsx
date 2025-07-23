import React, { useRef, useEffect } from 'react';
import formValidator from '../../../utils/FormValidator';

export default function EditAvatar({onUpdateAvatar}) {
  const inputRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatarURL: avatarRef.current.value
    });
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