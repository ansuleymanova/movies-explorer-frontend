import './SearchForm.css';
import {useEffect, useState} from "react";
import ValidatedForm from "../../utils/Validators";

export default function SearchForm (props) {
    const {values, handleFieldChange, isValid, setIsValid } = ValidatedForm();
    const [error, setError] = useState('');

    function handleSubmit (e) {
        e.preventDefault();
        isValid ? props.handleSearch(values.query) : setError('Должно быть, вы забыли ввести запрос');
        localStorage.setItem('query', values.query);
    }

    useEffect(() => {
        setError('');
    }, [isValid])

    useEffect(() => {
        const query = localStorage.getItem('query');
        if (query) {
            values.query = query;
            setIsValid(true);
        } else {
            setIsValid(false);
            setError('Должно быть, вы забыли ввести запрос');
        }
    }, [])

    return (
        <section className="search-form">
            <form className="search-form__search-area" noValidate onSubmit={handleSubmit}>
                <div className="search-form__input-area">
                    <div className="search-form__icon"></div>
                    <input
                        type="text"
                        name="query"
                        value={values.query || ''}
                        onChange={handleFieldChange}
                        className="search-form__input"
                        placeholder="Фильм"
                        required/>
                    <span className="search-form__error">{error}</span>
                    <button type="submit" className="search-form__button"/>
                </div>
                <div className="search-form__options">
                    <label className="search-form__toggle">
                        <input
                            type="checkbox"
                            checked={!!props.isShortsSelected}
                            onChange={props.setIsShortsSelected}
                            className="search-form__checkbox"/>
                        <div className="search-form__pseudo"></div>
                    </label>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}