import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import { urlMovies, urlMain, token } from "../../utils/constants";

import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [listMovies, setListMovies] = useState([]);

  const apiUser = new MainApi({
    baseUrl: urlMain,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  /*
  apiUser.getInfoUser().then((user) => {
    console.log(user);
    setCurrentUser(user);
  });*/
  /*
  function handleUpdateUser(data) {
    setIsLoading(true);
    apiUser
      .editUserInfo(data)
      .then((data) => {
        console.log("data", data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }*/

  const apiMovies = new MoviesApi({
    baseUrl: urlMovies,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /* Получаем фильмы с сервиса beatfilm-movies*/
  /*useEffect(() => {
    apiMovies.getAllMovies().then((movies) => {
      setListMovies(movies);
      console.log(movies);
      console.log(listMovies);
    });
  }, []);*/
  useEffect(() => {
    if (loggedIn) {
      console.log("проверяем token");
      tokenCheck();
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    /* const token = localStorage.getItem("token");*/
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loggedIn &&
      Promise.all([apiUser.getInfoUser(), apiMovies.getAllMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setListMovies(movies);
          console.log(listMovies);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        });
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header />
        ) : null}
        <main>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<Movies movies={listMovies} />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" ? (
          <Footer />
        ) : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
