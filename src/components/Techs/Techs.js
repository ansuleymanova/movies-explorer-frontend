import './Techs.css';
export default function Techs () {
    return (
        <section id="techs" className="techs">
            <div className="techs__content">
                <div className="main__section-heading-area">
                    <h2 className="main__section-heading-text">
                        Технологии
                    </h2>
                </div>
                <h3 className="techs__heading">7 технологий</h3>
                <p className="techs__text">
                    На курсе веб-разработки мы освоили технологии, которые
                    применили в дипломном проекте.
                </p>
                <div className="techs__list">
                    <p className="techs__tech">HTML</p>
                    <p className="techs__tech">CSS</p>
                    <p className="techs__tech">JS</p>
                    <p className="techs__tech">React</p>
                    <p className="techs__tech">Git</p>
                    <p className="techs__tech">Express.js</p>
                    <p className="techs__tech">MongoDB</p>
                </div>

            </div>
        </section>
    )
}