import './Profile.css';
import ValidatedForm from "../../utils/Validators";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function Profile (props) {
    const user = useContext(CurrentUserContext);
    const { values, handleFieldChange, resetForm, errors, isValid } = ValidatedForm();

    function handleSubmit (e) {
        e.preventDefault();
        if (values.name !== user.name || values.email !== user.email) {
            props.handleUpdateUser({name: values.name, email: values.email});
        }
    }

    useEffect(() => {
        if (user) {
            resetForm(user, {}, true);
        }
    }, [user, resetForm]);

    return (
        <form name="profile" noValidate onSubmit={handleSubmit} className="profile">
            <h2 className="profile__title">Привет, {user.name}!</h2>
            <label className="profile__field">
                <p className="profile__type">Имя</p>
                <input
                    name="name"
                    className="profile__value"
                    onChange={handleFieldChange}
                    value={values.name || ''}
                    type="text"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="profile__error profile__error-name">{errors.name || ''}</span>
            </label>
            <label className="profile__field">
                <p className="profile__type">E-mail</p>
                <input
                    name="email"
                    type="email"
                    className="profile__value"
                    onChange={handleFieldChange}
                    value={values.email || ''}
                    required
                />
                <span className="profile__error profile__error-email">{errors.email || ''}</span>
            </label>
            <button type="submit" disabled={!isValid || (values.name === user.name && values.email === user.email)} className="profile__button">Редактировать</button>
            <button type="button" className="profile__button profile__button_red" onClick={props.handleLogout}>Выйти из аккаунта</button>
        </form>
    )
}