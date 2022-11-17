import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import {useEffect, useState} from "react";
import { filterByQuery, selectShortMovies } from "../../utils/Filters";

export default function Movies (props) {
    const [isShortsSelected, setIsShortsSelected] = useState(false);
    const [movies, setMovies] = useState([]);

    function handleSearch (query) {
        props.setPreloader(true);
        localStorage.setItem('query', query);
        moviesApi.getFilms().then((movies) => {
            const films = isShortsSelected ? selectShortMovies(movies) : movies;
            setMovies(filterByQuery(films, query));
        }).catch((err) => console.log(err)).finally(() => props.setPreloader(false))
    }

    function handleShorts() {
        setIsShortsSelected(!isShortsSelected);
        localStorage.setItem('isShortsSelected', (!isShortsSelected).toString());
        setMovies(selectShortMovies(movies));
    }

    useEffect(() => {
        setIsShortsSelected(localStorage.getItem('isShortsSelected') === 'true');
        setMovies(JSON.parse(localStorage.getItem('films')));
    }, [])

    return (
        <main className="movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {movies.length > 0
                ? <MoviesCardList films={movies} handleAdd={props.handleAdd} handleDelete={props.handleDelete}/>
                : <span className="movies__no-results">{props.noResults}</span>
            }
        </main>
    )
}