import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {api} from "../../utils/MainApi";
import {useEffect, useState} from "react";

export default function MoviesCard (props) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);
    const [apiId, setApiId] = useState('');
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    const saved = isSaved ? 'card__saved-icon card__saved-icon_saved' : 'card__saved-icon';

    function handleSave() {
        if (isSaved) {
            api.deleteMovie(apiId)
                .then(() => {
                    setIsSaved(false);
                    props.handleCardDelete();
                }).catch((err) => console.log(err));
        } else {
            api.addMovie(props.card).then(() => setIsSaved(true)).catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        if (movies.length !== 0) {
            const search = movies.find((film) => film.nameEN === props.card.nameEN);
            setIsSaved(!!search);
            setApiId(search ? search._id : '');
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
                    ? <button type="button" className="card__delete-button" onClick={handleSave}/>
                    : <button type="button" className={saved} onClick={handleSave}></button>
                }

            </div>
            <img alt={props.card.nameRU} className="card__image" src={props.card.image.url ? `https://api.nomoreparties.co/${props.card.image.url}` : props.card.image}/>
        </div>
    )
}