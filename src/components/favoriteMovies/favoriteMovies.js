import React, { useState } from "react";
import "./favoriteMovies.scss";
import { useMovies } from "../../context/moviesContext";
import { useFirebase } from "../../context/firebaseContext";

function FavoriteMovies(props) {
  const { getMovieDetails, movieDetails } = useMovies();
  const { addUpdateFavoriteMovie } = useFirebase();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(1);

  React.useEffect(() => {
    getMovieDetails(props.movieID).then((result) => {
      setImage(result.poster_path);
      setComment(props.comment);
      setMovieName(result.original_title);
      setRating(props.rating);
    });
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    addUpdateFavoriteMovie(props.movieID, comment, rating);
    try {
    } catch (error) {}
  };

  return (
    <article className="favorite-movie">
      <h1>{movieName}</h1>
      <img
        className="movieImage"
        src={`https://image.tmdb.org/t/p/w500/${image}`}
      ></img>
      <form onSubmit={formSubmit}>
        <label>Mi comentario</label>
        <textarea
          required
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <label>Calificacion</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input type="submit" value="Calificar"></input>
      </form>
    </article>
  );
}

export default FavoriteMovies;
