import Header from "../Header/Header";

function Login() {
  return (
    <div className="login">
      <Header>
        <button className="signup_header__button">Regístrate</button>
      </Header>
      <h1 className="login_header">
        Inicia sessión
      </h1>
      <form className="login_form">
        <input type="email"
        id="email"
        className="login_input"
        placeholder="Correo electrónico"
        minLength="2"
        maxLength="40"
        required
        />
        <input type="password"
        id="password"
        className="login_input"
        placeholder="Contraseña"
        minLength="2"
        maxLength="40"
        required
        />
        <button type="submit" className="login_submit">Inicia sesión</button>
      </form>
      <button className="signup_button">¿Aún no eres miembro? Regístrate aquí</button>
    </div>
  );
}

export default Login;