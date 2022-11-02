import React, { createContext, useContext, useState } from "react";

const MoviesContext = createContext({
  movies: [],
  movieDetails: undefined,
  loadingMovies: false,
  getLatestMovies: () => {},
  getNowPlayingMovies: () => {},
  getMovieDetails: () => {}
});

export const MoviesContextProvider = ({ children }) => {

  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(undefined);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const getNowPlayingMovies = React.useCallback(async () => {
    try {
      setLoadingMovies(true);
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US&page=1"
      );
      const moviesList = await response.json();
      setMovies(moviesList);
      setLoadingMovies(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getLatestMovies = React.useCallback(async () => {
    try {
      setLoadingMovies(true);
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US&page=1"
      );
      const moviesList = await response.json();
      setMovies(moviesList);
      setLoadingMovies(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getMovieDetails = React.useCallback(async (id) => {
    try {
      setLoadingMovies(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US`
      );
      const details = await response.json();
      setMovieDetails(details);
      setLoadingMovies(false);
      return details;
    } catch (error) {
      console.error(error);
    }
  }, []);

 
  const contextValue = {
    movies,
    movieDetails,
    loadingMovies,
    getLatestMovies,
    getMovieDetails,
    getNowPlayingMovies
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
