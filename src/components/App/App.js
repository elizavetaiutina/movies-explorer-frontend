import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import { urlMovies, urlMain } from "../../utils/constants";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [listSavedMovies, setListSavedMovies] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  const apiMain = new MainApi({
    baseUrl: urlMain,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  /*
  apiUser.getInfoUser().then((user) => {
    console.log(user);
    setCurrentUser(user);
  });*/

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
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setIsLoading(false);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [loggedIn]);

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

  /* ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ */
  function handleUpdateUserInfo(data) {
    setIsLoading(true);
    apiMain
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
  const onRegister = (email, name, password) => {
    auth
      .register(email, name, password)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        console.log("Регистрация", data);
      })
      .then(() => {
        //запрос успешен

        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log("Некорректно заполнено одно из полей");
      });
  };

  /* АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ */
  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        if (data) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          console.log("Вход", data);
          return data;
        }
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log("Неправильный логин или пароль");
      });
  };

  /* ВЫХОД ИЗ АККАУНТА ПОЛЬЗОВАТЕЛЯ */
  const onSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: true });
  };

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
              <Route path="/signup" element={<Register onRegister={onRegister} />} />
              <Route path="/signin" element={<Login onLogin={onLogin} />} />
              <Route path="/" element={<Main />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={Movies}
                    movies={listMovies}
                    savedMovies={listSavedMovies}
                    onSaveFilm={handleSaveFilm}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={SavedMovies}
                    movies={listSavedMovies}
                    onUnsaveFilm={handleUnsaveFilm}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={Profile}
                    onUpdateUserInfo={handleUpdateUserInfo}
                    onSignOut={onSignOut}
                  />
                }
              />
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
