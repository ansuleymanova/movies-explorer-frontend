import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MoviesCard (props) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);
    const saved = isSaved ? 'card__saved-icon card__saved-icon_saved' : 'card__saved-icon';

    function handleDelete () {
        props.handleDelete(props.card);
        setIsSaved(false);
    }

    function handleSwitch () {
        if (isSaved) {
            handleDelete()
        } else {
            props.handleAdd(props.card);
            setIsSaved(true);
        }
    }

    useEffect(() => {
        if (!props.movies.message) {
            const movies = JSON.parse(localStorage.getItem('savedMovies'));
            if (Array.isArray(movies)) {
                const search = movies.filter((film) => film.nameEN === props.card.nameEN)[0];
                setIsSaved(!!search);
            }
        }
    }, [])

    return (
        <div className="card">
            <div className="card__heading">
                <div className="card__info">
                    <h2 className="card__title">{props.card.nameRU}</h2>
                    <p className="card__duration">{props.card.duration} мин.</p>
                </div>
                {location.pathname === '/saved-movies'
                    ? <button type="button" className="card__delete-button" onClick={handleDelete}/>
                    : <button type="button" className={saved} onClick={handleSwitch}></button>
                }

            </div>
            <a href={props.card.trailerLink} target="_blank" rel="noreferrer">
                <img alt={props.card.nameRU} className="card__image" src={props.card.image.url ? `https://api.nomoreparties.co/${props.card.image.url}` : props.card.image}/>
            </a>
        </div>
    )
}