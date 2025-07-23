import React, {useRef, useEffect} from 'react'
import formValidator from '../../../utils/FormValidator';

export default function NewCard({onCardSubmit}) {
    const titleRef = useRef();
    const imageURLRef = useRef();
    const formRef = useRef();

    useEffect(() => {
      if (formRef.current) {
        formValidator.setForm(formRef.current).enableValidation();
      }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        onCardSubmit({
            name: titleRef.current.value,
            link: imageURLRef.current.value
        });
    }
    return (
        <form className="profile__edit-form" id="add-card-form" ref={formRef} noValidate onSubmit={handleSubmit}>
            <input
              type="text"
              className="profile__edit-form-input profile__edit-form-input_name"
              placeholder="Titulo"
              id="title"
              ref={titleRef}
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__input-error" id="title-error"></span>
            <input
              type="url"
              className="profile__edit-form-input profile__edit-form-input_job"
              placeholder="URL de la imagen"
              id="imageURL"
              ref={imageURLRef}
              required
            />
            <span className="form__input-error" id="imageURL-error"></span>
            <button
            id="save-button"
            className="profile__edit-form-button profile__edit-form-button_save"
          >
            Guardar
          </button>
          </form>
    )
}