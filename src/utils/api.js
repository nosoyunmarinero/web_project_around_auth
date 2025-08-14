class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.registerUrl = options.registerUrl;
    this._options = options;
  }

  updateToken(token) {
    this._options.headers.authorization = `Bearer ${token}`;
  }

  _getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': "6d7a4746-c967-4ae3-8600-489d4d9a2274"
  };
}

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._getHeaders()
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
  }

  addNewCard(newCardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
  }

  getUserInfo() {
    console.log(this._getHeaders());
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._getHeaders({ "Content-Type": "application/json" }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .catch(err => {
        console.error(" API getUserInfo - Error:", err);
        throw err;
      });
  }

  setUserInfo(newUserData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
  }

  setAvatar(newAvatarData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        avatar: newAvatarData.avatar
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
  }

  deleteCard(clickedButtonID) {
    return fetch(`${this.baseUrl}/cards/${clickedButtonID}`, {
      method: "DELETE",
      headers: this._getHeaders()
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        console.log("Tarjeta eliminada", clickedButtonID);
      })
      .catch(err => console.log("Error al eliminar la tarjeta:", err));
  }

  changeLikeCardStatus(clickedButtonID, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const body = isLiked ? JSON.stringify({ isLiked: true }) : null;
    return fetch(`${this.baseUrl}/cards/${clickedButtonID}/likes`, {
      method,
      headers: this._getHeaders({ "Content-Type": "application/json" }),
      body
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
  }

  renderTextLoading(isLoading, saveButtonElement) {
    saveButtonElement.textContent = isLoading ? "Guardando..." : "Guardar";
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  registerUrl: "https://se-register-api.en.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Establecer el token si existe al inicializar
const savedToken = localStorage.getItem("token");
if (savedToken) {
  api.updateToken(savedToken);
}

export default api;
