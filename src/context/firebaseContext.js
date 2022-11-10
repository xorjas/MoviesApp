import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useState, useContext } from "react";

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
  favoriteMoviesList: [],
  signout: () => Promise.resolve(undefined),
  login: () => Promise.resolve(undefined),
  register: () => Promise.resolve(undefined),
  getFavoriteMovies: () => {},
  addUpdateFavoriteMovie: () => {},
});

export const FirebaseContextProvider = ({ children }) => {
  //CONTEXT STATES
  const [app, setApp] = useState(undefined);
  const [database, setDataBase] = useState(undefined);
  const [firebaseUser, setFirebaseUser] = useState(undefined);
  const [hasAuthLoaded, setHasAuthLoaded] = useState(false);
  const [favoriteMoviesList, setFavoriteMovieList] = useState([]);

  //FUNCTION FOR THE CONTEXT
  //LOGIN FROM FIREBASE
  const login = async (email, password) => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      setFirebaseUser(user.user);
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

  //ADD FAVORITE MOVIE
  const addUpdateFavoriteMovie = async (movieID, comment, rating) => {
    try {
      const docRef = await setDoc(
        doc(database, "favorites", firebaseUser.uid + movieID),
        {
          movieID: movieID,
          comment: comment,
          rating: rating,
          uid: firebaseUser.uid,
        }
      );
      getFavoriteMovies();
      return docRef;
    } catch (error) {
      console.error(error);
    }
  };

  const getFavoriteMovies = async () => {
    try {
      const movieList = [];
      const favoritesMovies = await collection(database, "favorites");
      const q = await query(
        favoritesMovies,
        where("uid", "==", firebaseUser.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        movieList.push(doc.data())
      });
      setFavoriteMovieList(movieList);
    } catch (error) {}
  };


  const signout = async () => {
    try {
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // Query firebase for the user
  }, [firebaseUser]);

  //APP INITIALIZATION
  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
    const db = getFirestore(app);
    setDataBase(db);
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
    favoriteMoviesList,
    signout,
    login,
    register,
    getFavoriteMovies,
    addUpdateFavoriteMovie,
  };

  //RETURN OF THE JSX
  return (
    <FirebaseContext.Provider value={contextValue}>
      {hasAuthLoaded && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
