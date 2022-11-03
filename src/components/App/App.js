import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from "../NotFound/NotFound";

function App() {
  return (
      <BrowserRouter>
          <div className="page">
              <div className="App">
                  <Header />
                  <Routes>
                      <Route path='/' element={<Main />}/>
                      <Route path='/movies' element={<Movies />}/>
                      <Route path='/saved-movies' element={<SavedMovies />}/>
                      <Route path='/signup' element={<Register />}/>
                      <Route path='/signin' element={<Login />}/>
                      <Route path='/profile' element={<Profile name="Анна" email="suleymanova@hse.ru"/>}/>
                      <Route path='/not-found' element={<NotFound />}/>
                  </Routes>
                  <Footer />
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
