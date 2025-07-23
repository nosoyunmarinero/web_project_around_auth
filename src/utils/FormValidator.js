class FormValidator {
  constructor(settings) {
    this.settings = settings;
  }

  setForm(formRef) {
    this.formRef = formRef;
    return this;
  }

  showInputError(inputElement) {
    const errorElement = this.formRef.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.add(this.settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add("form__input-error_active");
      inputElement.classList.add("form__input_type_error");

    }
  }
  
  hideInputError(inputElement) {
    const errorElement = this.formRef.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.remove(this.settings.inputErrorClass);
      inputElement.classList.remove("form__input_type_error");
      errorElement.textContent = "";
    }
  }

  checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this.showInputError(inputElement)
      : this.hideInputError(inputElement);
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleSaveButton(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "transparent";
      buttonElement.style.color = "#c4c4c4";
      buttonElement.style.cursor = "not-allowed";
    } else {
      buttonElement.disabled = false;
      buttonElement.style.backgroundColor = "black";
      buttonElement.style.color = "white";
      buttonElement.style.cursor = "pointer";
    }
  }

  setEventListener() {
    if (this.formRef) {
      this.inputList = Array.from(
        this.formRef.querySelectorAll(this.settings.inputSelector)
      );
      this.buttonElement = this.formRef.querySelector(this.settings.buttonSelector);
      if (this.inputList && this.buttonElement) {
        this.inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this.checkInputValidity(inputElement);
            this.toggleSaveButton(this.inputList, this.buttonElement);
          });
        });
      }
    }
  }

  enableValidation() {
    if (this.formRef) {
      this.formRef.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this.setEventListener();
    }
    return this;
  }
}

const formValidator = new FormValidator({
  inputSelector: ".profile__edit-form-input",
  buttonSelector: ".profile__edit-form-button",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_active",
});

export default formValidator;