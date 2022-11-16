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

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [currentUser, setCurrentUser] = useState({});
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const navigate = useNavigate();

    function handleRegister(name, email, password) {
        if (!email || !password || !name) {
            return;
        }
        setIsPreloaderVisible(true);
        api.register(name, email, password).then((res) => {
            navigate('/signin');
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

  return (
          <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <div className="App">
                  <Header/>
                  <Preloader isVisible={isPreloaderVisible}/>
                  <Routes>
                      <Route path='/' element={<Main />}/>
                      <Route path='/movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/movies' element={<Movies setPreloader={setIsPreloaderVisible}/>} />
                      </Route>
                      <Route path='/saved-movies' element={<ProtectedRoute isLoggedIn={loggedIn}/>}>
                          <Route path='/saved-movies' element={<SavedMovies setPreloader={setIsPreloaderVisible}/>} />
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
