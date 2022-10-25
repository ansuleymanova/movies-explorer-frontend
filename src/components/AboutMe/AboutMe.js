import './AboutMe.css';
import Portfolio from "../Portfolio/Portfolio";

export default function AboutMe () {
    return (
        <section id="about-me" className="about-me">
            <div className="main__section-heading-area">
                <h2 className="main__section-heading-text">
                    Студент
                </h2>
            </div>
            <div className="about-me__profile">
                <div className="about-me__info">
                    <h3 className="about-me__name">
                        Анна
                    </h3>
                    <p className="about-me__bio">
                        Фронтенд-разработчик, 29 лет
                    </p>
                    <p className="about-me__addition">
                        Живу в Москве, закончила факультет социологии НИУ ВШЭ и два курса Яндекс.Практикума:
                        по бэкенд- и фронтенд-разработке. Хочу создавать удобные и красивые приложения в
                        команде единомышленников. Свободно говорю по-английски, мечтаю собрать компьютер из транзисторов.
                    </p>
                    <div className="about-me__links">
                        <a href="https://www.linkedin.com/in/ansuleymanova/" target="_blank" rel="noreferrer" className="about-me__link">LinkedIn</a>
                        <a href="https://github.com/ansuleymanova" target="_blank" rel="noreferrer" className="about-me__link">GitHub</a>
                    </div>
                </div>
                <div className="about-me__picture"></div>
            </div>
            <Portfolio />
        </section>
    )
}