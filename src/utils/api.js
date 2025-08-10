class Api {
    constructor(options) {
      this._options = options;
    }

    updateToken(token) {
      this._options.headers.authorization = `Bearer ${token}`;
    }

    getInitialCards() {
      return fetch(`${this._options.baseUrl}/cards`, {
        headers: {
          'Authorization': this._options.headers.authorization,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => data.data)
    }

    addNewCard(newCardData) {
      return fetch(`${this._options.baseUrl}/cards`, {
        method: "POST",
        headers: this._options.headers,
        body: JSON.stringify({
          name: newCardData.name,
          link: newCardData.link,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      }).then((data) => data.data);
    }

    getUserInfo() {

  const headers = {
    'Authorization': this._options.headers.authorization,
    'Content-Type': 'application/json',
  };

  return fetch(`${this._options.baseUrl}/users/me`, {
    headers: headers,
  }).then((res) => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  }).then((data) => {
    return data.data;
  }).catch(err => {
    console.error('❌ API getUserInfo - Error:', err);
    throw err;
  });
}

    setUserInfo(newUserData) {
      return fetch(`${this._options.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._options.headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUserData.name,
          about: newUserData.about,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => data.data)
    }

    setAvatar(newAvatarData) {
      return fetch(`${this._options.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._options.headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: newAvatarData.avatar
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => data.data)
    }

    deleteCard(clickedButtonID) {
      return fetch(`${this._options.baseUrl}/cards/${clickedButtonID}`, {
        method: "DELETE",
        headers: {
          authorization: this._options.headers.authorization,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then(() => {
          console.log("Tarjeta eliminada", clickedButtonID);
        })
        .catch((err) => console.log("Error al eliminar la tarjeta:", err));
    }

    changeLikeCardStatus(clickedButtonID, isLiked) {
      const method = isLiked ? "PUT" : "DELETE";
      const body = isLiked ? JSON.stringify({ isLiked: true }) : null;
      return fetch(`${this._options.baseUrl}/cards/${clickedButtonID}/likes`, {
        method,
        headers: {
          authorization: this._options.headers.authorization,
          "Content-Type": "application/json",
        },
        body,
      }).then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      }).then((data) => data.data);
    }

    renderTextLoading(isLoading, saveButtonElement) {
      if (isLoading) {
        saveButtonElement.textContent = "Guardando...";
      } else {
        saveButtonElement.textContent = "Guardar";
      }
    }
  }

  // AQUÍ ESTÁ EL CAMBIO PRINCIPAL:
  const api = new Api({
    baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Establecer el token si existe al inicializar
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    api.updateToken(savedToken);
  }

  export default api;