import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList (props) {

    return (
        <section className="movie-list">
            {props.cards.map((card) => <MoviesCard key={card.id} card={card}/>)}
        </section>
    )
}

