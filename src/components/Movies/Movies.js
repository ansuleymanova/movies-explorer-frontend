import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import {useEffect, useState} from "react";
import { filterByQuery, selectShortMovies } from "../../utils/Filters";
import {api} from "../../utils/MainApi";

export default function Movies (props) {
    const [films, setFilms] = useState([]);
    const [noResults, setNoResults] = useState('');
    const [isShortsSelected, setIsShortsSelected] = useState(false);

    function handleSearch (query) {
        props.setPreloader(true);
        localStorage.setItem('query', query);
        const movies = JSON.parse(localStorage.getItem('films'));
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
        moviesApi.getFilms().then((films) => {
            localStorage.setItem('films', JSON.stringify(films));
            handleSearch(query);
        }).catch((err) => {
            console.log(err);
            setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        }).finally(() => props.setPreloader(false));
        api.getSavedMovies().then((movies) => {
            localStorage.setItem('savedMovies', JSON.stringify(movies))
        }).catch((err) => {
            console.log(err);
            setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        }).finally(() => props.setPreloader(false));
    }, [])

    return (
        <main className="movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {films.length > 0
                ? <MoviesCardList films={films}/>
                : <span className="movies__no-results">{noResults}</span>
            }
        </main>
    )
}