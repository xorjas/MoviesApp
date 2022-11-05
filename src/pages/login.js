import LoginTemplate from "../templates/login/loginTemplate";
import "./login.scss";

export const LoginPage = () => {

  const formSubmit = () =>{

  }


  return (
    <LoginTemplate>
      <div className="login-wrapper">
        <div className="login-content">
          <div>
            <a className="back-link" href="/">
              <img src="/images/back.png"></img>
            </a>
            <h3>Ingreso</h3>
            <p>
              Bienvenido!! Por favor ingresa tu usuario y contrasenna para
              ingresar
            </p>
            <form onSubmit={formSubmit}>
              <input type="text" placeholder="usuario" name="user"></input>
              <input
                type="password"
                placeholder="contrasenna"
                name="password"
              ></input>
              <input type="submit" value="Ingresar"></input>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </LoginTemplate>
  );
};
