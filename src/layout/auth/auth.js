import React from "react";
import { useNavigate } from "react-router-dom";

function AuthPage({ children }) {

  const navigate = useNavigate();
  const logedUser = false;

  React.useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
  }, []);

  return <div><p>AUTH PAGE</p>{children}</div>;
}

export default AuthPage;
