import React, { useState } from "react";
import { useFirebase } from "../context/firebaseContext";
import LoginTemplate from "../templates/login/loginTemplate";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { async } from "@firebase/util";

export const SignPage = () => {
  //NAVIGATION INIT
  const navigate = useNavigate();

  //GETTING THE VALUES OF THE CONTEXT
  const { firebaseUser, login, register, something } = useFirebase();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      let registerResponse = await register(user, password);
      if (registerResponse) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <LoginTemplate>
      <div className="login-wrapper">
        <div className="login-content">
          <div>
            <a className="back-link" href="/">
              <img src="/images/back.png"></img>
            </a>
            <h3>Registrarse</h3>
            <p>Ingresa un usuario y una contraseena para registrarte</p>
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
              <input type="submit" value="Registrarse"></input>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </LoginTemplate>
  );
};
