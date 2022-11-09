import React, { createContext, useContext, useState } from "react";

const MoviesContext = createContext({
  pageNumber: 1,
  movieSelection: '',
  movies: [],
  movieDetails: undefined,
  loadingMovies: false,
  getLatestMovies: () => {},
  getNowPlayingMovies: () => {},
  getMovieDetails: () => {},
  setTypeOfMovies: () => {},
  nextMoviePage: () => {},
  previousMoviePage: () => {}
});

export const MoviesContextProvider = ({ children }) => {

  const [pageNumber, setMoviePageNumber] = useState(0);
  const [movieSelection, setMovieType] = useState('latest');
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
        "https://api.themoviedb.org/3/movie/popular?api_key=d3cb19215805c4a60e93dc7559f7598f&language=en-US&page=1"
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

  const nextMoviePage = React.useCallback(async () => {
    try {
      setMoviePageNumber(pageNumber++);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const previousMoviePage = React.useCallback(async () => {
    try {
      setMoviePageNumber(pageNumber--);
    } catch (error) {
      console.error(error);
    }
  }, []);
  


  React.useEffect(() => {
    switch(movieSelection){
      case 'latest':
        getLatestMovies();
        break;
      case 'nowPlaying':
        getNowPlayingMovies();
        break;
      default:
        getNowPlayingMovies();
    }
  }, [movieSelection, pageNumber]);

 
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
    nextMoviePage,
    previousMoviePage
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
