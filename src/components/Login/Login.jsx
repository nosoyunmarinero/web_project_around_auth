import { useState, useRef, useEffect } from 'react';
import Header from "../Header/Header";
import formValidator from '../../utils/FormValidator';
import InfoTooltipSucess from '../InfoTooltip/InfoTooltipSucess';
import InfoTooltipFail from '../InfoTooltip/InfoTooltipFail';

function Login({ handleOpenPopup }) {  // ✅ Recibe la prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  // ✅ Crear el objeto popup para el tooltip de éxito
  const successPopup = {
    title: "",
    children: <InfoTooltipSucess />
  };

  const failPopup = {
    title: "",
    children: <InfoTooltipFail />
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);

    handleOpenPopup(successPopup);
  }

  function testFail(e) {
    e.preventDefault();
    handleOpenPopup(failPopup);
  }

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  return (
    <div className="login">
      <Header>
        <button className="signup_header__button">Regístrate</button>
      </Header>
      <h1 className="login_header">
        Inicia sessión
      </h1>
      <form className="login_form" onSubmit={handleSubmit} id="login-form" noValidate ref={formRef}>
        <input type="email"
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
        <input type="password"
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
        <button type="submit" className="profile__edit-form-button login_submit">Inicia sesión</button>
      </form>
      <button onClick={testFail} >Test fail</button>
      <button className="signup_button">¿Aún no eres miembro? Regístrate aquí</button>
    </div>
  );
}

export default Login;