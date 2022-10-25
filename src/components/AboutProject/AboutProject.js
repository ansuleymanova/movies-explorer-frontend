import './AboutProject.css';

export default function AboutProject () {
    return (
        <section id="about-project" className="about-project">
            <div className="about-project__content">
                <div className="main__section-heading-area">
                    <h2 className="main__section-heading-text">
                        О проекте
                    </h2>
                </div>
                <div className="about-project__info">
                    <div className="about-project__column">
                        <h3 className="about-project__heading">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about-project__text">
                            Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className="about-project__column">
                        <h3 className="about-project__heading">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about-project__text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые
                            нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
                <div className="about-project__progress">
                    <div className="about-project__backend">1 неделя</div>
                    <div className="about-project__frontend">4 недели</div>
                </div>
                <div className="about-project__progress">
                    <div className="about-project__backend about-project__backend_transparent">Back-end</div>
                    <div className="about-project__frontend about-project__frontend_transparent">Front-end</div>
                </div>
            </div>

        </section>
    )
}