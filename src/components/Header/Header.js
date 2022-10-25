import './Header.css';
import logo from '../../images/logo.svg';

export default function Header (props) {
    return (
        <header className="header">
            <a href="https://machinedynamo.nomoredomains.icu/" className="header__link">
                <img alt="Movie Explorer logo" className="header__logo" src={logo} />
            </a>
            <div className="header__authorization">
                <button className="header__button" type="button">Регистрация</button>
                <button className="header__button header__button_colored" type="button">Войти</button>
            </div>
        </header>
    )
}