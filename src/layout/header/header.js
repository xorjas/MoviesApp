import { useMovies } from "../../context/moviesContext";
import "./header.scss";

function Header(props) {

  const { setTypeOfMovies } = useMovies();

  const latestMoviesClickEvent = () => {
    setTypeOfMovies('latest');
  }
  
  const nowPlayingMoviesClickEvent = () =>{
    setTypeOfMovies('nowPlaying');
  }



  return (
    <header>
      <div></div>
      <nav>
        <img src="images/movie.png" alt=""></img>
        <a href="/"><p>Inicio</p></a>
        <p onClick={nowPlayingMoviesClickEvent}>Estrenos</p>
        <p onClick={latestMoviesClickEvent}>Populares</p>
        <a href="/dashboard"><p>Cuenta</p></a>
      </nav>
    </header>
  );
}

export default Header;
