import { URL_MAIN } from "./constants";

class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Статус ошибки: ${response.status}`);
    });
  }

  register(email, name, password) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: `${password}`, email: `${email}`, name: `${name}` }),
    });
  }

  authorize(password, email) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: `${password}`, email: `${email}` }),
    });
  }

  getContent = (token) => {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

const auth = new Auth({
  baseUrl: URL_MAIN,
});

export default auth;
