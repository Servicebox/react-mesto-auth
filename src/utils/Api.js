class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //универсальный метод запрос с проверкой
  _request(path, method, data) {
    let body = data;
    if((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }
    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
    .then(this._getResponseData);
  }

  //получим информацию о пользователе
  getUserInfoApi() {
    return this._request(`/users/me`, 'GET')
  }

  //обновим информацию пользователя
  editUserInfo(data) {
    return this._request(`/users/me`, 'PATCH', data)
  }

  //обновим аватар пользователя
  editUserAvatar(data) {
    return this._request(`/users/me/avatar`, 'PATCH', data)
  }

  //получим карточки
  getInitialCards() {
    return this._request(`/cards`, 'GET')
  }

  //добавим новую карточку
  addCards(data) {
    return this._request(`/cards`, 'POST', data)
  }

  //удалим карточку
  removeCard(id) {
    return this._request(`/cards/${id}`, 'DELETE')
  }

  // поставим лайк карточке
  addCardLike(id) {
    return this._request(`/cards/${id}/likes`, 'PUT')
  }

  // удалим лайк с карточки
  removeCardLike(id) {
    return this._request(`/cards/${id}/likes`, 'DELETE')
  }

  toggleLikeCard(id, isCardLiked) {
    if (isCardLiked) {
      return this._request(`/cards/${id}/likes`, 'PUT');
    } else {
      return this._request(`/cards/${id}/likes`, 'DELETE');
    }
  }
}


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '5d9c5d74-2e9f-4bf3-bd3c-1563f1b38a12',
    'Content-Type': 'application/json',
  },
});

export { api };
