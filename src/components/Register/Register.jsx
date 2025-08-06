import { useState } from 'react';
import Header from "../Header/Header";
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Register({ onRegister }) { // ← Cambiar OnRegister por onRegister
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, success: false });

  function handleSubmit(e) {
    e.preventDefault();

    // Usar la función que viene del App.jsx
    onRegister(email, password)
      .then(() => {
        setInfoTooltip({ isOpen: true, success: true }); // mostrar éxito
      })
      .catch(() => {
        setInfoTooltip({ isOpen: true, success: false }); // mostrar error
      });
  }

  return (
    <div className="login">
      <Header>
        <a href="/login" className="signup_header__button">Iniciar Sesión</a>
      </Header>
      <h1 className="login_header">Regístrate</h1>
      <form className="login_form" onSubmit={handleSubmit} id="login-form" noValidate>
        <input
          type="email"
          id="email"
          value={email} // ← Agregar value
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
          value={password} // ← Agregar value
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
        <InfoTooltip isSuccess={infoTooltip.success} />
      )}
    </div>
  );
}

export default Register;