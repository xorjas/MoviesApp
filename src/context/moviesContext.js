import React, { createContext, useContext, useState } from "react";

const MoviesContext = createContext({
  pageNumber: 1,
  movieSelection: "",
  movies: [],
  movieDetails: undefined,
  loadingMovies: false,
  getLatestMovies: () => {},
  getNowPlayingMovies: () => {},
  getMovieDetails: () => {},
  setTypeOfMovies: () => {},
  setPageNumber: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const [pageNumber, setMoviePageNumber] = useState(1);
  const [movieSelection, setMovieType] = useState("nowPlaying");
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(undefined);
  const [loadingMovies, setLoadingMovies] = useState(false);

  const getNowPlayingMovies = React.useCallback(async (page) => {
    try {
      setLoadingMovies(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US&page=${page}`
      );
      const moviesList = await response.json();
      setMovies(moviesList);
      setLoadingMovies(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getLatestMovies = React.useCallback(async (page) => {
    try {
      setLoadingMovies(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US&page=${page}`
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

  const setTypeOfMovies = React.useCallback(async (type) => {
    try {
      setMovieType(type);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setPageNumber = React.useCallback(async (page) => {
    try {
      if (page > 0) {
        setMoviePageNumber(page);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    if (!loadingMovies) {
      switch (movieSelection) {
        case "latest":
          getLatestMovies(pageNumber);
          break;
        case "nowPlaying":
          getNowPlayingMovies(pageNumber);
          break;
        default:
          getLatestMovies(pageNumber);
      }
    }
  }, [
    movieSelection,
    pageNumber,
    setPageNumber,
    getNowPlayingMovies,
    getLatestMovies
  ]);

  const contextValue = {
    pageNumber,
    movieSelection,
    movies,
    movieDetails,
    loadingMovies,
    getLatestMovies,
    getMovieDetails,
    getNowPlayingMovies,
    setTypeOfMovies,
    setPageNumber
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
