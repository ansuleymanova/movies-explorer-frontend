import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList (props) {

    return (
        <ul className="movie-list">
            {props.cards.map((card) =>
                <li>
                    <MoviesCard key={card.id} card={card}/>
                </li>
            )}
        </ul>
    )
}

