class MoviesApi {

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getFilms() {
        return fetch('https://api.nomoreparties.co/beatfilm-movies', {
            headers: {"Content-type": "application/json"}})
            .then((res) => this._getResponseData(res))
            .catch((err) => console.log(err))
    }
}

export const moviesApi = new MoviesApi();