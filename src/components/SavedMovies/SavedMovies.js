import './SavedMovies.css'
import { cards } from "../../fake-data";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies (props) {
    const newCards = cards.filter(card => card.isSaved);

    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList cards={newCards}/>
        </div>
    )
}
