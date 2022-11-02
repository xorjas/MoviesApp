import LoginTemplate from "../templates/login/loginTemplate";
import './login.scss';

export const LoginPage = () => {
  return (
    <LoginTemplate>
      <div className="login-wrapper">
        <div className="login-content">
          <div>
            <a className="back-link" href="/"><img src="/images/back.png"></img></a>
            <h3>Ingreso</h3>
            <p>Bienvenido!! Por favor ingresa tu usuario y contrasenna para ingresar</p>
          </div>
          <div>

          </div>
        </div>
      </div>
    </LoginTemplate>
  );
};
