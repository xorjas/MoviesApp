import "./movie.scss";
import { useFirebase } from "../../context/firebaseContext";
import React, { useState } from "react";

function Movie(props) {
  const [agregada, setAgregada] = useState('');
  const { firebaseUser, addUpdateFavoriteMovie } = useFirebase();

  const addToFavorites = (e, key) => {
    setAgregada('add-animation');
    let docRef = addUpdateFavoriteMovie(key, "", 1);
  };

  React.useEffect(()=>{

  },[agregada])

  return (
    <article className="movie" id={`movie-${props.id}`}>
      <div className="movie-hover">
        <p>{props.overview}</p>
        {firebaseUser ? (
          <p
            className="add-favorites"
            onClick={(e) => addToFavorites(e, props.id)}
          >
            + Add Favorites
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className={`movie-added ${agregada}`}>
        <span>Pelicula Agregada</span>
      </div>
      <h1>{props.name}</h1>
      <img className="movieImage" src={props.imgPath}></img>
      <p>
        {props.rate}
        <img src="images/star.png"></img>
      </p>
    </article>
  );
}

export default Movie;
