import './Profile.css';

export default function Profile (props) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, {props.name}!</h2>
            <div className="profile__field">
                <p className="profile__type">Имя</p>
                <p className="profile__value">{props.name}</p>
            </div>
            <div className="profile__field">
                <p className="profile__type">E-mail</p>
                <p className="profile__value">{props.email}</p>
            </div>
            <button type="button" className="profile__button">Редактировать</button>
            <button type="button" className="profile__button profile__button_red">Выйти из аккаунта</button>
        </div>
    )
}