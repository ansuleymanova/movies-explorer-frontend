import './MoviesCard.css';
import {useLocation} from "react-router-dom";

export default function MoviesCard ({ card }) {
    const location = useLocation();
    const saved = card.isSaved ? 'card__saved-icon card__saved-icon_saved' : 'card__saved-icon';

    return (
        <div className="card">
            <div className="card__heading">
                <div className="card__info">
                    <h2 className="card__title">{card.title}</h2>
                    <p className="card__duration">{card.duration}</p>
                </div>
                {location.pathname === '/saved-movies'
                    ? <button type="button" className="card__delete-button" />
                    : <div className={saved}></div>
                }

            </div>
            <img alt="thumbnail" className="card__image" src={card.image}/>
        </div>
    )
}