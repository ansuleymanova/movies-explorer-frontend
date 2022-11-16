import './Register.css';
import logo from "../../images/logo.svg";
import ValidatedForm from "../../utils/Validators";
import {useEffect} from "react";

export default function Register (props) {
    const { values, resetForm, handleFieldChange, errors, isValid } = ValidatedForm();

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(values.name, values.email, values.password);
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])


    return (
        <main className="register">
            <a href="/" className="register__main-link">
                <img alt="Movie Explorer logo" className="register__logo" src={logo} />
            </a>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__container" onSubmit={handleSubmit}>
                <div className="register__field">
                    <label className="register__label">Имя</label>
                    <input
                        type="text"
                        name="name"
                        className="register__input"
                        placeholder="Имя"
                        required
                        value={values.name || ''}
                        onChange={handleFieldChange}
                        minLength="2"
                        maxLength="30"/>
                    <span className="register__error register__error-name">{errors.name || ''}</span>
                </div>
                <div className="register__field">
                    <label className="register__label">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        className="register__input"
                        placeholder="E-mail"
                        required
                        value={values.email || ''}
                        onChange={handleFieldChange}/>
                    <span className="register__error register__error-email">{errors.email || ''}</span>
                </div>
                <div className="register__field">
                    <label className="register__label">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        className="register__input"
                        placeholder="Пароль"
                        required
                        value={values.password || ''}
                        onChange={handleFieldChange}/>
                    <span className="register__error register__error-password">{errors.password || ''}</span>
                </div>
                <button type="submit" disabled={!isValid} className="register__save-button">Зарегистрироваться</button>
            </form>
            <p className="register__caption">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
        </main>
    )
}