import './App.css';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from "../NotFound/NotFound";
import { api } from '../../utils/MainApi';
import {useEffect, useState} from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from "../Preloader/Preloader";
import {moviesApi} from "../../utils/MoviesApi";
import ToolTip from "../ToolTip/ToolTip";

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [noResults, setNoResults] = useState('');
    const [isToolTipVisible, setIsToolTipVisible] = useState(false);
    const navigate = useNavigate();

    function closeToolTip () {
        setIsToolTipVisible(false);
    }

    function handleRegister(name, email, password) {
        if (!email || !password || !name) {
            return;
        }
        setIsPreloaderVisible(true);
        api.register(name, email, password).then((res) => {
            if (res._id) {
                handleLogin(email, password);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsPreloaderVisible(false);
        })
    }
    function handleLogin(email, password) {
        if (!email || !password) {
            return;
        }
        setIsPreloaderVisible(true);
        api.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    navigate('/movies');
                }
            }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsPreloaderVisible(false);
        });
    }

    function handleLogout() {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        navigate('/');
    }

    function handleUpdateUser({ name, email }) {
        setIsPreloaderVisible(true);
        if (!name || !email) {
            return;
        }
        setIsPreloaderVisible(true);
        api.updateSelf({ name, email }).then((res) => {
            setCurrentUser(res);
            setIsToolTipVisible(true);
        }).catch((err) => console.log(err)).finally(() => {
            setIsPreloaderVisible(false);
        }).finally(() => setIsPreloaderVisible(false));
    }

    function handleDelete (movie) {
        const savedMovie = savedMovies.find((film) => movie.nameEN === film.nameEN);
        let id;
        if (savedMovie) {
            id = savedMovie._id
        } else {
            id = movie.id
        }
        api.deleteMovie(savedMovie._id).then(() => {
            const updatedSavedMovies = savedMovies.filter((film) => film._id !== id);
            localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
            setSavedMovies(updatedSavedMovies);
        }).catch((err) => {
            if (err === 'Ошибка: 401') {handleLogout()}
            console.log(err);
            }
        )
    }

    function handleAdd (movie) {
        const isInSaved = savedMovies.find((film) => movie.nameEN === film.nameEN);
        if (!isInSaved) {
            api.addMovie(movie).then((movie) => {
                setSavedMovies([movie, ...savedMovies]);
                localStorage.setItem('savedMovies', JSON.stringify([movie, ...savedMovies]));
            }).catch((err) => {
                console.log(err);
                if (err === 'Ошибка: 401') {handleLogout()}
            })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            api.getSelf().then((userInfo) => {
                setLoggedIn(true);
                setCurrentUser(userInfo);
            }).catch((err) => {
                if (err === 'Ошибка: 401') {handleLogout()}
                console.log(err);
            })
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            setIsPreloaderVisible(true);
            if (localStorage.getItem('films') === null) {
                moviesApi.getFilms().then((movies) => {
                    localStorage.setItem('films', JSON.stringify(movies));
                }).catch((err) => {
                    console.log(err);
                    setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
            }
            api.getSavedMovies()
                .then((movies) => {
                if (Array.isArray(movies)) {
                    localStorage.setItem('savedMovies', JSON.stringify(movies));
                    setSavedMovies(movies);
                } else {
                    localStorage.setItem('savedMovies', JSON.stringify([]));
                    setSavedMovies([]);
                }})
                .catch((err) => {
                    if (err === 'Ошибка: 401') {handleLogout()}
                    console.log(err);
                    setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')})
                .finally(() => setIsPreloaderVisible(false));
        }
    }, [loggedIn])

  return (
          <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <div className="App">
                  <Header loggedIn={loggedIn}/>
                  <Preloader isVisible={isPreloaderVisible}/>
                  <ToolTip isVisible={isToolTipVisible} closeToolTip={closeToolTip}/>
                  <Routes>
                      <Route path='/' element={<Main />}/>
                      <Route path='/movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/movies' element={<Movies noResults={noResults} setNoResults={setNoResults} handleDelete={handleDelete} handleAdd={handleAdd} setPreloader={setIsPreloaderVisible}/>} />
                      </Route>
                      <Route path='/saved-movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} noResults={noResults} setNoResults={setNoResults} handleDelete={handleDelete} handleAdd={handleAdd} setPreloader={setIsPreloaderVisible}/>} />
                      </Route>
                      <Route path='/signup' element={
                          loggedIn
                              ? <Navigate to='/' />
                              : <Register handleRegister={handleRegister}/>}
                      />
                      <Route path='/signin' element={
                          loggedIn
                              ? <Navigate to='/' />
                              : <Login handleLogin={handleLogin}/>}
                      />
                      <Route path='/profile' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/profile' element={
                              <Profile
                                  handleUpdateUser={handleUpdateUser}
                                  handleLogout={handleLogout}/>} />
                      </Route>
                      <Route path='*' element={<NotFound />}/>
                  </Routes>
                  <Footer />
              </div>
          </div>
          </CurrentUserContext.Provider>
  );
}

export default App;
