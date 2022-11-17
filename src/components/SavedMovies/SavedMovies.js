import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import { api } from "../../utils/MainApi";
import {filterByQuery, selectShortMovies} from "../../utils/Filters";

export default function SavedMovies (props) {
    const [savedMovies, setSavedMovies] = useState([]);
    const [isShortsSelected, setIsShortsSelected] = useState(false);

    function handleSearch (query) {
        props.setPreloader(true);
        localStorage.setItem('query', query);
        api.getSavedMovies().then((movies) => {
            const films = isShortsSelected ? selectShortMovies(movies) : movies;
            setSavedMovies(filterByQuery(films, query));
        }).catch((err) => console.log(err)).finally(() => props.setPreloader(false))
    }

    function handleShorts() {
        setIsShortsSelected(!isShortsSelected);
        localStorage.setItem('isShortsSelected', (!isShortsSelected).toString());
    }

    useEffect(() => {
        setIsShortsSelected(localStorage.getItem('isShortsSelected') === 'true');
        if (isShortsSelected) {
            setSavedMovies(selectShortMovies(props.savedMovies));
        } else {
            setSavedMovies(props.savedMovies);
        }
    }, [isShortsSelected, props.savedMovies])

    return (
        <main className="saved-movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {savedMovies.length > 0
                ? <MoviesCardList films={savedMovies} handleDelete={props.handleDelete}/>
                : <span>{props.noResults}</span>
            }
        </main>
    )
}
