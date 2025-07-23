import { useState, useRef,useEffect} from 'react';
import Header from "../Header/Header";
//import formValidator from '../../utils/FormValidator';

function handleSubmit(e) {
  e.preventDefault();
  console.log(email, password);
}

function Login() {
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div className="login">
      <Header>
        <button className="signup_header__button">Iniciar Sesión</button>
      </Header>
      <h1 className="login_header">
        Regístrate
      </h1>
      <form className="login_form" onSubmit={handleSubmit} id="login-form" noValidate>
        <input type="email"
        id="email"
        //ref={inputRef}
        //value={email}
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

        // ref={inputRef}
        //value={password}
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
    </div>
  );
}

export default Login;