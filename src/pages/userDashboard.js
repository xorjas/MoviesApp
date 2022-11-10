import AuthPage from "../layout/auth/auth";
import React from "react";
import "./userDashboard.scss";
import { useFirebase } from "../context/firebaseContext";
import FavoriteMovies from "../components/favoriteMovies/favoriteMovies";

export const UserDashboard = () => {
  const { firebaseUser, favoriteMoviesList, getFavoriteMovies } = useFirebase();
  React.useEffect(() => {
    console.log("dashboard");
    getFavoriteMovies();
  }, []);

  if(firebaseUser){
    return(
      <AuthPage>
        <div className="dashboard">
        <div className="profile-menu">
          <div className="profile-info">
            <img src="https://via.placeholder.com/100" alt=""></img>
            <p className="profile-name">{firebaseUser.displayName}</p>
            <p className="email">{firebaseUser.email}</p>
          </div>
          <div className="profile-options">
            <span>Dashboard</span>
            <a href="/">
              <span className="option option1">Pagina Principal</span>
            </a>
            <span className="option option2">Favoritas</span>
          </div>
        </div>
        <div className="movies-wrapper">
          <h1 className="title">Hello {firebaseUser.email}</h1>
          <div className="favorite-movies">
            {favoriteMoviesList.map((x) => (
              <FavoriteMovies
                key={x.movieID}
                movieID={x.movieID}
                comment={x.comment}
                rating={x.rating}
              ></FavoriteMovies>
            ))}
          </div>
        </div>
      </div>
      </AuthPage>
    )
  }else{return (
    <AuthPage>
      
    </AuthPage>
  );}

  
};
