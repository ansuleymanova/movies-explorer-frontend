import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import { cards } from "../../fake-data";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies (props) {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList cards={cards}/>
        </main>
    )
}