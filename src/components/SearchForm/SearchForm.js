import './SearchForm.css';

export default function SearchForm (props) {
    return (
        <section className="search-form">
            <div className="search-form__search-area">
                <div className="search-form__input-area">
                    <div className="search-form__icon"></div>
                    <input type="text" className="search-form__input" placeholder="Фильм"/>
                    <button type="submit" className="search-form__button"/>
                </div>
                <div className="search-form__options">
                    <button type="button" className="search-form__toggle">
                        <div className="search-form__toggly-circle"></div>
                    </button>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </div>
        </section>
    )
}