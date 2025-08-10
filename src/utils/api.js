class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl; // CAMBIO: guardamos baseUrl directo
    this.registerUrl = options.registerUrl; // CAMBIO: guardamos registerUrl directo
    this._options = options;
  }

  updateToken(token) {
    this._options.headers.authorization = `Bearer ${token}`;
  }

  _getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
}

  getInitialCards() {
    return fetch(`${this.baseUrl}/users/me/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': savedToken,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data);
  }

  addNewCard(newCardData) {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      headers: this._getHeaders({ "Content-Type": "application/json" }), // CAMBIO
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data);
  }

  getUserInfo() {
    return fetch(`${this.registerUrl}/users/me`, { // CAMBIO: uso this.registerUrl
      headers: this._getHeaders({ "Content-Type": "application/json" }) // CAMBIO
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data)
      .catch(err => {
        console.error("❌ API getUserInfo - Error:", err);
        throw err;
      });
  }

  setUserInfo(newUserData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders({ "Content-Type": "application/json" }), // CAMBIO
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data);
  }

  setAvatar(newAvatarData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders({ "Content-Type": "application/json" }), // CAMBIO
      body: JSON.stringify({
        avatar: newAvatarData.avatar
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data);
  }

  deleteCard(clickedButtonID) {
    return fetch(`${this.baseUrl}/cards/${clickedButtonID}`, {
      method: "DELETE",
      headers: this._getHeaders() // CAMBIO
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
      headers: this._getHeaders({ "Content-Type": "application/json" }), // CAMBIO
      body
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => data.data);
  }

  renderTextLoading(isLoading, saveButtonElement) {
    saveButtonElement.textContent = isLoading ? "Guardando..." : "Guardar";
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  registerUrl: "https://se-register-api.en.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

// Establecer el token si existe al inicializar
const savedToken = localStorage.getItem("token");
if (savedToken) {
  api.updateToken(savedToken);
}

export default api;
