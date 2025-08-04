import { useState } from 'react';
import Header from "../Header/Header";
import { registerUser } from '../../utils/auth';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
//import formValidator from '../../utils/FormValidator';



function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, success: false });
;

function handleSubmit(e) {
    e.preventDefault();

    registerUser({ email, password })
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

      <button className="signup_button">¿Ya eres miembro? Inicia sesión aquí</button>

      {
        infoTooltip.isOpen && (
          <InfoTooltip isSuccess={infoTooltip.success} />
        )
      }
    </div>
  );
}

export default Register;