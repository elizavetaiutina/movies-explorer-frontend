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

  const [listSavedMovies, setListSavedMovies] = useState([]); // Сохранённые фильмы
  const [listMovies, setListMovies] = useState([]); // Фильмы, c beatfilm-movies

  const apiMain = new MainApi({
    baseUrl: urlMain,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const apiMovies = new MoviesApi({
    baseUrl: urlMovies,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
          onSignOut();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    loggedIn &&
      Promise.all([apiMain.getInfoUser(), apiMovies.getAllMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setListMovies(movies);

          /* console.log(user,movies, savedMovies);*/
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);

  useEffect(() => {
    loggedIn &&
      apiMain
        .getSavedMovies()
        .then((savedMovies) => {
          setListSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
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
        .finally(() => setIsLoading(false));
    }
  }

  /* УДАЛИТЬ ФИЛЬМ ИЗ СОХРАНЁННЫХ */
  function handleUnsaveFilm(film) {
    setIsLoading(true);

    apiMain
      .unSaveNewFilm(film._id)
      .then((film) => {
        const newSavedMovies = listSavedMovies.filter((f) => (f._id === film._id ? "" : f));
        setListSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
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
      .finally(() => setIsLoading(false));
  }

  /* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
  const onRegister = (email, name, password) => {
    setIsLoading(true);
    auth
      .register(email, name, password)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        onLogin(password, email);
        //setLoggedIn(true);
        setCurrentUser(data);
        console.log("Регистрация", data);
        console.log("currentUser", currentUser);
      })
      .then((data) => {
        //запрос успешен
        //navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log("Некорректно заполнено одно из полей");
      })
      .finally(() => setIsLoading(false));
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
    console.log("Выходим !");
    setLoggedIn(false);
    navigate("/", { replace: true });

    localStorage.removeItem("token");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("queryForSearch");
    localStorage.removeItem("stateCheckBox");
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header isLogged={loggedIn} />
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
                    onUnsaveFilm={handleUnsaveFilm}
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
                    apiMain={apiMain}
                    setListSavedMovies={setListSavedMovies}
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
