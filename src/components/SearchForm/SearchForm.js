import './SearchForm.css';

export default function SearchForm () {
    return (
        <section className="search-form">
            <form className="search-form__search-area">
                <div className="search-form__input-area">
                    <div className="search-form__icon"></div>
                    <input type="text" className="search-form__input" placeholder="Фильм" required/>
                    <button type="submit" className="search-form__button"/>
                </div>
                <div className="search-form__options">
                    <label className="search-form__toggle">
                        <input type="checkbox" className="search-form__checkbox"/>
                        <div className="search-form__pseudo"></div>
                    </label>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}