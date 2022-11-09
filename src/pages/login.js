import React, { useState } from "react";
import { useFirebase } from "../context/firebaseContext";
import LoginTemplate from "../templates/login/loginTemplate";
import { useNavigate } from "react-router-dom";
import "./login.scss";


export const LoginPage = () => {
  //NAVIGATION INIT
  const navigate = useNavigate();

  //GETTING THE VALUES OF THE CONTEXT
  const { login } = useFirebase();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      let loginResponse = await login(user, password);
      if (loginResponse) {
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  const registerClickEvent = () => {
    navigate("/signup");
  };

  return (
    <LoginTemplate>
      <div className="login-wrapper">
        <div className="login-content">
          <div>
            <a className="back-link" href="/">
              <img src="/images/back.png" alt="backimg" title=""></img>
            </a>
            <span className="registerOption" onClick={registerClickEvent}>
              Registrarse
            </span>
            <h3>Ingreso</h3>
            <p>Bienvenido! Ingresa tu usuario y contrasenna para ingresar</p>
            <form onSubmit={formSubmit}>
              <input
                required
                type="text"
                placeholder="usuario"
                name="user"
                onChange={(e) => setUser(e.target.value)}
              ></input>
              <input
                required
                type="password"
                placeholder="contrasenna"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p className="error"></p>
              <input type="submit" value="Ingresar"></input>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </LoginTemplate>
  );
};
