import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {api} from "../../utils/MainApi";
import {useEffect, useState} from "react";

export default function MoviesCard ({ card }) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);
    const [apiId, setApiId] = useState('');
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    const saved = isSaved ? 'card__saved-icon card__saved-icon_saved' : 'card__saved-icon';

    function handleSave() {
        if (isSaved) {
            api.deleteMovie(apiId)
                .then(() => {setIsSaved(false)}).catch((err) => console.log(err));
        } else {
            api.addMovie(card).then(() => setIsSaved(true)).catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        const search = movies.find((film) => film.nameEN === card.nameEN);
        setIsSaved(!!search);
        setApiId(search ? search._id : '');
    }, [])

    return (
        <div className="card">
            <div className="card__heading">
                <div className="card__info">
                    <h2 className="card__title">{card.nameRU}</h2>
                    <p className="card__duration">{card.duration} мин.</p>
                </div>
                {location.pathname === '/saved-movies'
                    ? <button type="button" className="card__delete-button" />
                    : <button type="button" className={saved} onClick={handleSave}></button>
                }

            </div>
            <img alt={card.nameRU} className="card__image" src={card.image.url ? `https://api.nomoreparties.co/${card.image.url}` : card.image}/>
        </div>
    )
}