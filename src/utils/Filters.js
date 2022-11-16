export function selectShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
}

export function filterByQuery(movies, query) {
    return movies.filter((movie) => {
        const nameRU = movie.nameRU.toLowerCase();
        const nameEN = movie.nameEN.toLowerCase();
        const substring = query.toLowerCase();
        return nameEN.includes(substring) || nameRU.includes(substring)
    })
}