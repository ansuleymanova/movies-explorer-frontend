import './NotFound.css';
import {useNavigate} from "react-router-dom";

export default function NotFound () {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <h1 className="not-found__header">
                404
            </h1>
            <p className="not-found__text">
                Страница не найдена
            </p>
            <p className="not-found__back" onClick={() => navigate(-1)}>Назад</p>
        </main>
    )
}