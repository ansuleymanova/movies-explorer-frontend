import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import { api } from "../../utils/MainApi";
import {filterByQuery, selectShortMovies} from "../../utils/Filters";


export default function SavedMovies (props) {
    const [films, setFilms] = useState([]);
    const [noResults, setNoResults] = useState('');
    const [isShortsSelected, setIsShortsSelected] = useState(false);

    function handleSearch (query) {
        props.setPreloader(true);
        localStorage.setItem('query', query);
        const movies = JSON.parse(localStorage.getItem('savedMovies'));
        let foundMovies = filterByQuery(movies, query);
        if (isShortsSelected) {
            foundMovies = selectShortMovies(foundMovies);
        }
        setFilms(foundMovies);
        if (films.length === 0) {
            setNoResults('Ничего не нашлось :(')
        }
        props.setPreloader(false);
    }

    function handleShorts() {
        setIsShortsSelected(!isShortsSelected);
        localStorage.setItem('isShortsSelected', (!isShortsSelected).toString());
    }

    useEffect(() => {
        props.setPreloader(true);
        const shorts = localStorage.getItem('isShortsSelected');
        const query = localStorage.getItem('query');
        if (shorts) {
            setIsShortsSelected(shorts === 'true');
        }
        api.getSavedMovies().then((movies) => {
            localStorage.setItem('savedMovies', JSON.stringify(movies))
            handleSearch(query);
        }).catch((err) => {
            console.log(err);
            setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        }).finally(() => props.setPreloader(false));
    }, [])

    return (
        <main className="saved-movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {films.length > 0
                ? <MoviesCardList films={films}/>
                : <span>{noResults}</span>
            }
        </main>
    )
}
