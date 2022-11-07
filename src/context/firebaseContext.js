import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//FIREBASE CREDENTIALS
const firebaseConfig = {
  apiKey: "AIzaSyCefysnRGGv5uZfC2a_DGrtj9lGjGV5BzU",
  authDomain: "moviesapp-5dd48.firebaseapp.com",
  projectId: "moviesapp-5dd48",
  storageBucket: "moviesapp-5dd48.appspot.com",
  messagingSenderId: "392545914507",
  appId: "1:392545914507:web:b69dd082f3ccfa5d714e8e",
};

// CREATING THE CONTEXT WITH IT PROPERTIES
const FirebaseContext = createContext({
  app: null,
  firebaseUser: undefined,
  hasAuthLoaded: true,
  login: () => Promise.resolve(undefined),
  register: () => Promise.resolve(undefined),
  loginRedirect: () => {},
});

export const FirebaseContextProvider = ({ children }) => {
  //CONTEXT STATES
  const [app, setApp] = useState(undefined);
  const [firebaseUser, setFirebaseUser] = useState(undefined);
  const [hasAuthLoaded, setHasAuthLoaded] = useState(false);

  //FUNCTION FOR THE CONTEXT
  //LOGIN FROM FIREBASE
  const login = async (email, password) => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      setFirebaseUser(user.user);
      console.log(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  //REGISTER FROM FIREBASE
  const register = async (email, password) => {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setFirebaseUser(user.user);

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const loginRedirect = () => {
    if (!firebaseUser) {
    }
  };

  React.useEffect(() => {
    // Query firebase for the user
  }, [firebaseUser]);

  //APP INITIALIZATION
  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
  }, []);

  React.useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setHasAuthLoaded(true);
    });

    return unsubscribe;
  }, []);

  //CONTEXT VALUES
  const contextValue = {
    app,
    firebaseUser,
    hasAuthLoaded,
    login,
    register,
    loginRedirect,
  };

  //RETURN OF THE JSX
  return (
    <FirebaseContext.Provider value={contextValue}>
      {hasAuthLoaded && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
