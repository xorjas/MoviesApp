import { useFirebase } from "../../context/firebaseContext";
import { useMovies } from "../../context/moviesContext";
import "./header.scss";

function Header(props) {

  const {firebaseUser, signout} = useFirebase();

  const { setTypeOfMovies } = useMovies();

  const latestMoviesClickEvent = () => {
    setTypeOfMovies('latest');
  }
  const nowPlayingMoviesClickEvent = () =>{
    setTypeOfMovies('nowPlaying');
  }

  const signOutEvent = () =>{
    signout();
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
        {firebaseUser ? <p id="unlog" onClick={signOutEvent}>Deslogear</p> : <></>}
      </nav>
    </header>
  );
}

export default Header;
