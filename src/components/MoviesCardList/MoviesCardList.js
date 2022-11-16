import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList (props) {

    return (
        <ul className="movie-list">
            {props.films.map((film) =>
                <li key={film.id ? film.id : film._id}>
                    <MoviesCard card={film}/>
                </li>
            )}
        </ul>
    )
}

