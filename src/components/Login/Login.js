import './Login.css';
import logo from "../../images/logo.svg";

export default function Login (props) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="login">
            <a href="https://machinedynamo.nomoredomains.icu/" className="login__main-link">
                <img alt="Movie Explorer logo" className="login__logo" src={logo} />
            </a>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__container" onSubmit={handleSubmit}>
                <div className="login__field">
                    <label className="login__label">E-mail</label>
                    <input type="email" name="email" className="login__input" id="email"
                           placeholder="E-mail" required value={props.email} onChange={props.onEmailChange}/>
                    <span className="email-error"></span>
                </div>
                <div className="login__field">
                    <label className="login__label">Пароль</label>
                    <input type="password" name="password" className="login__input" id="password"
                           placeholder="Пароль" required value={props.password} onChange={props.onPasswordChange}/>
                    <span className="password-error"></span>
                </div>
                <div className="login__placeholder"></div>
                <button type="submit" className="login__save-button">Войти</button>
            </form>
            <p className="login__caption">Еще не зарегистрированы? <a className="login__link" href="/signup">Регистрация</a></p>
        </div>
    )
}