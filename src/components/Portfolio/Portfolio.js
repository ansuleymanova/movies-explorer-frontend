import './Portfolio.css';
export default function Portfolio () {
    return (
        <section className="portfolio">
            <h3 className="portfolio__heading">
                Портфолио
            </h3>
            <a href="https://github.com/ansuleymanova" className="portfolio_link">
                <p className="portfolio__title">Статичный сайт</p>
                <div className="portfolio__arrow"></div>
            </a>
            <a href="https://github.com/ansuleymanova" className="portfolio_link">
                <p className="portfolio__title">Адаптивный сайт</p>
                <div className="portfolio__arrow"></div>
            </a>
            <a href="https://github.com/ansuleymanova" className="portfolio_link">
                <p className="portfolio__title">Одностраничное приложение</p>
                <div className="portfolio__arrow"></div>
            </a>
        </section>
    )
}