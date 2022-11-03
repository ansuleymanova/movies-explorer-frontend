import './Portfolio.css';
export default function Portfolio () {
    return (
        <section className="portfolio">
            <h3 className="portfolio__heading">
                Портфолио
            </h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a href="https://github.com/ansuleymanova/how-to-learn" className="portfolio_link" target="_blank"  rel="noreferrer">
                        <p className="portfolio__title">Статичный сайт</p>
                        <div className="portfolio__arrow"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://github.com/ansuleymanova/russian-travel" className="portfolio_link" target="_blank"  rel="noreferrer">
                        <p className="portfolio__title">Адаптивный сайт</p>
                        <div className="portfolio__arrow"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://github.com/ansuleymanova/react-mesto-api-full" className="portfolio_link" target="_blank"  rel="noreferrer">
                        <p className="portfolio__title">Одностраничное приложение</p>
                        <div className="portfolio__arrow"></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}