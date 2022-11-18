import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

export default function ValidatedForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleFieldChange = (e) => {
        const input = e.target;
        const { value, name } = input;

        if (name === 'name' && value.length === 0) {
            input.setCustomValidity('Имя не может быть пустым');
            console.log(input.error);
        } else if (name === 'name' && value.length < 2) {
            input.setCustomValidity('Имя должно быть длиннее одного символа');
        } else {
            input.setCustomValidity('');
        }

        if (name === 'password' && value.length === 0) {
            input.setCustomValidity('Не забудьте ввести пароль');
        } else {
            input.setCustomValidity('');
        }

        if (name === 'email') {
            if (!isEmail(value)) {
                input.setCustomValidity('Проверьте правильность почтового адреса');
            } else {
                input.setCustomValidity('');
            }
        }

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: input.validationMessage });
        setIsValid(input.closest('form').checkValidity());
    };
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, errors, isValid, setIsValid, handleFieldChange, resetForm };
}