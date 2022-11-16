import './Header.css';
import logo from '../../images/logo.svg';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header () {
    const navigate = useNavigate();
    const location = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const menuholder = isBurgerOpen ? 'header__menuholder header__menuholder_open' : 'header__menuholder';
    const headerClass = ['/signup', '/not-found', '/signin'].includes(location.pathname)
        ? 'header header_invisible'
        : 'header';

    function handleBurgerMenu () {
        setIsBurgerOpen(!isBurgerOpen);
    }
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, [])

    return (
        <header className={headerClass}>
            <a href="/" className="header__link">
                <img alt="Movie Explorer logo" className="header__logo" src={logo} />
            </a>
            {(['/movies', '/saved-movies', '/profile'].includes(location.pathname) && width > 768)
                &&
                <div className="header__content">
                    <div className="header__navigation">
                        <a href="/movies" className={location.pathname === '/movies' ? 'header__link_active header__link' : 'header__link'}>Фильмы</a>
                        <a href="/saved-movies" className={location.pathname === '/saved-movies' ? 'header__link_active header__link' : 'header__link'}>Сохранённые фильмы</a>
                    </div>
                    <a href="/profile" className="header__profile-link" >Аккаунт</a>
                </div>
            }
            {(location.pathname === '/' && width > 768)
                && <div className="header__authorization">
                    <button type="button" className="header__button" onClick={() => navigate('/signup')}>Регистрация</button>
                    <button type="button" className="header__button header__button_colored" onClick={() => navigate('/signin')}>Войти</button>
                </div>
            }
            {(width <= 768 && !isBurgerOpen) &&
                <button type="button" className="header__burger" onClick={handleBurgerMenu}/>}
            <div className={menuholder}>
                <div className="burger-menu__overlay"></div>
                <div className="burger-menu">
                    <div className="burger-menu__close">
                        <button type="button" className="burger-menu__close-button" onClick={handleBurgerMenu}/>
                    </div>
                    <div className="burger-menu__menu">
                        <a href="/" className="burger-menu__link">Главная</a>
                        <a href="/" className={location.pathname === '/movies' ? "burger-menu__link burger-menu__link_active" : "burger-menu__link"}>Фильмы</a>
                        <a href="/" className={location.pathname === '/saved-movies' ? "burger-menu__link burger-menu__link_active" : "burger-menu__link"}>Сохранённые фильмы</a>
                    </div>
                    <a href="/profile" className="burger-menu__profile-link" >Аккаунт</a>
                </div>
            </div>
        </header>
    )
}