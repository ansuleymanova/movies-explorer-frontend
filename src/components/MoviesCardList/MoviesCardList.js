import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useWindowWidth from "../../utils/useWindowWidth";

export default function MoviesCardList (props) {
    const [cardList, setCardList] = useState([]);
    const [parameters, setParameters] = useState({total: 0, add: 0});
    const location = useLocation();
    const width = useWindowWidth();

    function handleMoreClick() {
        const start = cardList.length;
        const finish = start + parameters.add;

        if (props.films.length - start > 0) {
            const newCards = props.films.slice(start, finish);
            setCardList([...cardList, ...newCards]);
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            if (width >= 900) {
                setParameters({total: 12, add: 3})
            } else if (width < 900 && width >= 500){
                setParameters({total: 8, add: 2})
            } else {
                setParameters({total: 5, add: 2})
            }
        }
    }, [width, location.pathname])

   useEffect(() => {
       if (props.films.length > 0) {
           if (location.pathname === '/movies') {
               const displayMovies = props.films.filter((film, index) => index < parameters.total);
               setCardList(displayMovies);
           } else {
               setCardList(props.films);
           }
       }
   }, [props.films, parameters])

    return (
        <>
            <ul className="movie-list">
                {cardList.map((card) =>
                    <li key={card.id ? card.id : card._id}>
                        <MoviesCard card={card} movies={props.films} handleAdd={props.handleAdd} handleDelete={props.handleDelete}/>
                    </li>
                )}
            </ul>
            {(location.pathname === '/movies' && cardList.length < props.films.length) &&
                <button className="movie-list__more-button" onClick={handleMoreClick}>Ещё</button>
            }
        </>
    )
}

