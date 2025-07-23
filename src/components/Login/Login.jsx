import { useState, useRef,useEffect} from 'react';
import Header from "../Header/Header";
import formValidator from '../../utils/FormValidator';
import InfoTooltipSucess from '../InfoTooltip/InfoTooltipSucess';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef();
  const formRef = useRef();

  const { handleOpenPopup } = props;

  const infoToolpopup = { title: "", children: <InfoTooltipSucess /> };

  useEffect(() => {
    if (formRef.current) {
      formValidator.setForm(formRef.current).enableValidation();
    }
  }, []);

  function handleSubmit(e) {
  e.preventDefault();
  handleOpenPopup();
}

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
        ref={inputRef}
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

        ref={inputRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="profile__edit-form-input login_input"
        placeholder="Contraseña"
        minLength="2"
        maxLength="40"
        required
        />
        <span className="form__input-error" id="password-error"></span>
        <button type="submit" className="login_submit" onClick={() => {
         handleOpenPopup(infoToolpopup)
        }}>Inicia sesión</button>
      </form>
      <button className="signup_button">¿Aún no eres miembro? Regístrate aquí</button>
    </div>
  );
}

export default Login;