import { useState, useEffect, useRef } from 'react';
import Header from "../Header/Header";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Popup from '../Main/Popup/Popup';
import formValidator from '../../utils/FormValidator';


function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, success: false });
   const emailRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password)
      .then(() => {
        setInfoTooltip({ isOpen: true, success: true });
      })
      .catch(() => {
        setInfoTooltip({ isOpen: true, success: false });
      });
  }

  function closeInfoTooltip() {
    setInfoTooltip({ isOpen: false, success: false });
  }


  // Validacion
   useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  return (
    <div className="login">
      <Header>
        <a href="/login" className="signup_header__button">Iniciar Sesión</a>
      </Header>
      <h1 className="login_header">Regístrate</h1>
      <form className="login_form" onSubmit={handleSubmit} id="login-form" noValidate ref={formRef}>
        <input
          type="email"
          id="email"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile__edit-form-input login_input"
          placeholder="Correo electrónico"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error" id="email-error"></span>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="profile__edit-form-input login_input"
          placeholder="Contraseña"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error" id="password-error"></span>
        <button type="submit" className="login_submit">Regístrate</button>
      </form>
      <a href="/login" className="signup_button">¿Ya eres miembro? Inicia sesión aquí</a>

      {infoTooltip.isOpen && (
              <Popup  onClose={closeInfoTooltip}>
              <InfoTooltip
                isSuccess={infoTooltip.success}
              />
            </Popup>
            )}
    </div>
  );
}

export default Register;