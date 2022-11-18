import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import { filterByQuery, selectShortMovies } from "../../utils/filters";

export default function Movies (props) {
    const [isShortsSelected, setIsShortsSelected] = useState(false);
    const [movies, setMovies] = useState([]);

    function handleSearch (query) {
        props.setPreloader(true);
        localStorage.setItem('query', query);
        const allMovies = JSON.parse(localStorage.getItem('films'));
        const shortFiltered = isShortsSelected ? selectShortMovies(allMovies) : allMovies;
        setMovies(filterByQuery(shortFiltered, query));
        props.setPreloader(false);
    }

    function handleShorts() {
        setIsShortsSelected(!isShortsSelected);
        localStorage.setItem('isShortsSelected', (!isShortsSelected).toString());
        if (isShortsSelected) {
            setMovies(selectShortMovies(movies));
        } else {
            const allMovies = localStorage.getItem('films');
            const query = localStorage.getItem('query');
            setMovies(filterByQuery(allMovies, query))
        }
    }

    useEffect(() => {
        setIsShortsSelected(localStorage.getItem('isShortsSelected') === 'true');
        let query = localStorage.getItem('query');
        if (!query) {
            query = ''
        }
        const movies = JSON.parse(localStorage.getItem('films'));
        if (isShortsSelected) {
            setMovies(filterByQuery(selectShortMovies(movies), query));
        } else {
            setMovies(filterByQuery(movies, query))
        }
    }, [isShortsSelected])

    return (
        <main className="movies">
            <SearchForm isShortsSelected={isShortsSelected} setIsShortsSelected={handleShorts} handleSearch={handleSearch}/>
            {movies.length > 0
                ? <MoviesCardList films={movies} handleAdd={props.handleAdd} handleDelete={props.handleDelete}/>
                : <span className="movies__no-results">Ничего не нашлось :(</span>
            }
        </main>
    )
}