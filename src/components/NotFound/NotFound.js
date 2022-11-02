import './NotFound.css';

export default function NotFound () {
    return (
        <div className="not-found">
            <h1 className="not-found__header">
                404
            </h1>
            <p className="not-found__text">
                Страница не найдена
            </p>
            <a href='/' className="not-found__back">Назад</a>
        </div>
    )
}