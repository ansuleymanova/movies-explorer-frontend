import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
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

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [noResults, setNoResults] = useState('');
    const navigate = useNavigate();

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
            return true;
        }).catch((err) => console.log(err))
    }

    function handleAdd (movie) {
        const isInSaved = savedMovies.find((film) => movie.nameEN === film.nameEN);
        if (!isInSaved) {
            api.addMovie(movie).then((movie) => {
                setSavedMovies([movie, ...savedMovies]);
                localStorage.setItem('savedMovies', JSON.stringify([movie, ...savedMovies]));
                return true;
            }).catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            api.getSelf().then((userInfo) => {
                setLoggedIn(true);
                setCurrentUser(userInfo);
            }).catch((err) => {
                setLoggedIn(false)
                console.log(err);
            })
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            setIsPreloaderVisible(true);
            moviesApi.getFilms().then((movies) => {
                localStorage.setItem('films', JSON.stringify(movies));
            }).catch((err) => {
                console.log(err);
                setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => setIsPreloaderVisible(false));
            api.getSavedMovies().then((movies) => {
                if (Array.isArray(movies)) {
                    localStorage.setItem('savedMovies', JSON.stringify(movies));
                    setSavedMovies(movies);
                } else {
                    localStorage.setItem('savedMovies', JSON.stringify([]));
                    setSavedMovies([]);
                }
            }).catch((err) => {
                console.log(err);
                setNoResults('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => setIsPreloaderVisible(false));
        }
    }, [loggedIn])

  return (
          <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <div className="App">
                  <Header loggedIn={loggedIn}/>
                  <Preloader isVisible={isPreloaderVisible}/>
                  <Routes>
                      <Route path='/' element={<Main />}/>
                      <Route path='/movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/movies' element={<Movies noResults={noResults} setNoResults={setNoResults} handleDelete={handleDelete} handleAdd={handleAdd} setPreloader={setIsPreloaderVisible}/>} />
                      </Route>
                      <Route path='/saved-movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} noResults={noResults} setNoResults={setNoResults} handleDelete={handleDelete} handleAdd={handleAdd} setPreloader={setIsPreloaderVisible}/>} />
                      </Route>
                      <Route path='/signup' element={
                          <Register
                              handleRegister={handleRegister}/>}/>
                      <Route path='/signin' element={
                          <Login
                              handleLogin={handleLogin}/>}/>
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
