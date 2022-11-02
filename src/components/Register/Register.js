import './Register.css';
import logo from "../../images/logo.svg";

export default function Register (props) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="register">
            <a href="https://machinedynamo.nomoredomains.icu/" className="register__main-link">
                <img alt="Movie Explorer logo" className="register__logo" src={logo} />
            </a>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__container" onSubmit={handleSubmit}>
                <div className="register__field">
                    <label className="register__label">Имя</label>
                    <input type="text" name="name" className="register__input" id="name"
                           placeholder="Имя" required value={props.name} onChange={props.onNameChange}  minLength="2" maxLength="30"/>
                </div>
                <div className="register__field">
                    <label className="register__label">E-mail</label>
                    <input type="email" name="email" className="register__input" id="email"
                           placeholder="E-mail" required value={props.email} onChange={props.onEmailChange}/>
                    <span className="email-error"></span>
                </div>
                <div className="register__field">
                    <label className="register__label">Пароль</label>
                    <input type="password" name="password" className="register__input" id="password"
                           placeholder="Пароль" required value={props.password} onChange={props.onPasswordChange}/>
                    <span className="password-error"></span>
                </div>
                <button type="submit" className="register__save-button">Зарегистрироваться</button>
            </form>
            <p className="register__caption">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
        </div>
    )
}