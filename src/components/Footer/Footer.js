import './Footer.css';
import {useLocation} from "react-router-dom";

export default function Footer () {
    const location = useLocation();
    const footerClass = location.pathname === '/signup' || location.pathname === '/not-found' || location.pathname === '/signin' || location.pathname === '/profile'
        ? 'footer footer_invisible' : 'footer';

    return (
        <footer className={footerClass}>
            <div className="footer__content">
                <div className="footer__info">
                    <p className="footer__text">Учебный проект Яндекс.Практикум x BeatFilm.</p>
                </div>
                <div className="footer__nav">
                    <p className="footer__copyright">© 2022</p>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                        <a href="https://github.com/ansuleymanova/movies-explorer-frontend" target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}