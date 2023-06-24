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
}

export default MainApi;
