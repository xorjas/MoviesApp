import PrincipalTemplate from "../templates/principal/principalTemplate";
import MovieList from "../components/movieList/movieList";
import { MoviesContextProvider } from "../context/moviesContext";

export const HomePage = () => {
  return (
    <MoviesContextProvider>
      <PrincipalTemplate>
        <MovieList></MovieList>
      </PrincipalTemplate>
    </MoviesContextProvider>
  );
};
