import Api from "./api";

class MainApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  getInfoUser() {
    return super._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return super._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      headers: this._headers,
    });
  }

  saveNewFilm(movie) {
    return this._request(`${this._url}/movies`, {
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      headers: this._headers,
    });
  }

  unSaveNewFilm(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

export default MainApi;
