const token = localStorage.getItem('jwt');

class Api {
    constructor(options) {
        this.url = options.url;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    register(name, email, password) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, password: password, email: email})
        })
            .then((res) => this._getResponseData(res))
            .then((res) => {
                return res;
            })
    }

    authorize (email, password) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, email})
        })
            .then((res) => this._getResponseData(res))
            .then((data) => {
                if (data) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }})
    }

    getSelf() {
        return fetch(`${this.url}/users/me`, {
            headers: this._headers,})
            .then((res) => this._getResponseData(res))
    }

    updateSelf({name, email}) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        }).then(res => this._getResponseData(res));
    }

    getSavedMovies() {
        return fetch(`${this.url}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }

    addMovie(data) {
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration.toString(),
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co/${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
        }).then(res => this._getResponseData(res))
    }

    deleteMovie(id) {
        return fetch(`${this.url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }
}

export const api = new Api({
    url:'https://api.dynamomachine.nomoredomains.icu',
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})