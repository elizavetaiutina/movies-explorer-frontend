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
import Preloader from "../Preloader/Preloader";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [listSavedMovies, setListSavedMovies] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  const apiMain = new MainApi({
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
      /*console.log("проверяем token");*/
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
      Promise.all([apiMain.getInfoUser(), apiMain.getSavedMovies(), apiMovies.getAllMovies()])
        .then(([user, savedMovies, movies]) => {
          setCurrentUser(user);
          setListSavedMovies(savedMovies);
          setListMovies(movies);

          /* console.log(movies, savedMovies);*/

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        });
  }, [loggedIn]);

  /* ДОБАВИТЬ ФИЛЬМ В СОХРАНЁННЫЕ */
  function handleSaveFilm(film, isSavedFilm, infoSaveFilm) {
    console.log(film, isSavedFilm, infoSaveFilm);

    if (isSavedFilm) {
      handleUnsaveFilm(infoSaveFilm);
    } else {
      apiMain
        .saveNewFilm(film)
        .then((film) => {
          setListSavedMovies([film, ...listSavedMovies]);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  /* УДАЛИТЬ ФИЛЬМ ИЗ СОХРАНЁННЫХ */
  function handleUnsaveFilm(film) {
    apiMain
      .unSaveNewFilm(film._id)
      .then((film) => {
        setListSavedMovies((state) => state.filter((f) => (f._id === film._id ? "" : f)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }

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
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/" element={<Main />} />
              <Route
                path="/movies"
                element={
                  <Movies
                    movies={listMovies}
                    savedMovies={listSavedMovies}
                    onSaveFilm={handleSaveFilm}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={<SavedMovies movies={listSavedMovies} onUnsaveFilm={handleUnsaveFilm} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
        </main>
        {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" ? (
          <Footer />
        ) : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
