import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useFirebase,
} from "../../context/firebaseContext";

function AuthPage({ children }) {

  
  const { firebaseUser } = useFirebase();
  
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!firebaseUser) {
      navigate("/login");
    }
  }, [firebaseUser]);

  return <div>{children}</div>;
}

export default AuthPage;
