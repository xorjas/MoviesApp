import React from "react";
import Movie from "../movie/movie";
import { useMovies, p } from "../../context/moviesContext";
import "./movieList.scss";

function MovieList() {
  const { movies, pageNumber, setPageNumber, movieSelection, getLatestMovies, getNowPlayingMovies } = useMovies();

  const nextPage = () => {
    setPageNumber(pageNumber+1);
  }

  const previousPage = () => {
    setPageNumber(pageNumber-1);
  }

  React.useEffect(()=>{
    
    
  },[pageNumber])

  if (movies.results != null) {
    return (
      <div>
        <div className="movieList">
          {movies.results.map((x) => (
            <Movie
              key={x.id}
              id={x.id}
              name={x.original_title}
              overview={x.overview}
              rate={x.vote_average}
              imgPath={`https://image.tmdb.org/t/p/w500/${x.poster_path}`}
            ></Movie>
          ))}
        </div>
        <div className="pagination">
          <span onClick={previousPage}>Anterior</span>
          <span>{pageNumber}</span>
          <span onClick={nextPage}>Siguiente</span>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default MovieList;
