import React from "react";
import Movie from "../movie/movie";
import { useMovies } from "../../context/moviesContext";
import "./movieList.scss";

function MovieList() {
  const {
    movies,
    movieSelection,
    getLatestMovies,
    getNowPlayingMovies,
  } = useMovies();

 

  if (movies.results != null) {
    return (
      <div className="movieList">
        {movies.results.map((x) => (
          <Movie
            key={x.id}
            name={x.original_title}
            overview={x.overview}
            rate={x.vote_average}
            imgPath={`https://image.tmdb.org/t/p/w500/${x.poster_path}`}
          ></Movie>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default MovieList;
