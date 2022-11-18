import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import { api } from "../../utils/MainApi";
import {filterByQuery, selectShortMovies} from "../../utils/filters";

export default function SavedMovies (props) {
    const [savedMovies, setSavedMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [isShortsSelected, setIsShortsSelected] = useState(false);

    function handleSearch (query) {
        props.setPreloader(true);
        setQuery(query);
        api.getSavedMovies().then((movies) => {
            console.log(movies);
            const films = isShortsSelected ? selectShortMovies(movies) : movies;
            setSavedMovies(filterByQuery(films, query));
        }).catch((err) => console.log(err)).finally(() => props.setPreloader(false))
    }

    function handleShorts() {
        setIsShortsSelected(!isShortsSelected);
    }

    useEffect(() => {
        let movies;
        if (query) {
            movies = filterByQuery(props.savedMovies, query)
        } else {
            movies = props.savedMovies;
        }
        if (isShortsSelected) {
            setSavedMovies(selectShortMovies(movies));
        } else {
            setSavedMovies(movies);
        }
    }, [isShortsSelected, props.savedMovies])

    return (
        <main className="saved-movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {savedMovies.length > 0
                ? <MoviesCardList films={savedMovies} handleDelete={props.handleDelete}/>
                : <span>Ничего не нашлось :(</span>
            }
        </main>
    )
}
