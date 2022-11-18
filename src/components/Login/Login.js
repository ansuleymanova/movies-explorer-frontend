import './Login.css';
import logo from "../../images/logo.svg";
import ValidatedForm from "../../utils/Validators";
import { useEffect } from "react";

export default function Login (props) {
    const { values, resetForm, handleFieldChange, errors, isValid } = ValidatedForm();

    function handleSubmit(e) {
        e.preventDefault();
        props.handleLogin(values.email, values.password)
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])

    return (
        <main className="login">
            <a href="/" className="login__main-link">
                <img alt="Movie Explorer logo" className="login__logo" src={logo} />
            </a>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__container" noValidate onSubmit={handleSubmit}>
                <div className="login__field">
                    <label className="login__label">E-mail</label>
                    <input type="email" name="email" className="login__input" id="email"
                           placeholder="E-mail" required value={values.email || ''} onChange={handleFieldChange}/>
                    <span className="login__error">{errors.email || ''}</span>
                </div>
                <div className="login__field">
                    <label className="login__label">Пароль</label>
                    <input type="password" name="password" className="login__input" id="password"
                           placeholder="Пароль" required value={values.password || ''} onChange={handleFieldChange}/>
                    <span className="login__error">{errors.password || ''}</span>
                </div>
                <div className="login__placeholder"></div>
                <button type="submit" disabled={!isValid} className="login__save-button">Войти</button>
            </form>
            <p className="login__caption">Еще не зарегистрированы? <a className="login__link" href="/signup">Регистрация</a></p>
        </main>
    )
}