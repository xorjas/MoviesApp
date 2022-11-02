import './movie.scss'

function Movie(props){
    return(
        <article className='movie'>
            <div className='movie-hover'>
                <p>{props.overview}</p>
            </div>
            <h1>{props.name}</h1>
            <img className='movieImage' src={props.imgPath}></img>
            <p>{props.rate}<img src='images/star.png'></img></p>
        </article>
    );
}

export default Movie;