class Api {
    constructor(options) {
      this._options = options;
    }

    getInitialCards() {
      return fetch(`${this._options.baseUrl}/cards`, {
        headers: {
          authorization: this._options.headers.authorization,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => data.data) // ← Extraer data.data
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
      }).then((data) => data.data); // ← Extraer data.data
    }

    getUserInfo() {
      return fetch(`${this._options.baseUrl}/users/me`, {
        headers: {
          authorization: this._options.headers.authorization,
        },
      }).then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      }).then((data) => {
        console.log('API getUserInfo response:', data); // ← Debug
        return data.data; // ← Extraer data.data - AQUÍ ESTÁ LA CLAVE
      }).catch(err => {
        console.error('Error al obtener información del usuario:', err);
        throw err; // ← Relanzar error en lugar de retornar {}
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
        .then((data) => data.data) // ← Extraer data.data
    }

    setAvatar(newAvatarData) {
      return fetch(`${this._options.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._options.headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: newAvatarData.avatar, // ← Corregido: era avatarURL
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => data.data) // ← Extraer data.data
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
      }).then((data) => data.data); // ← Extraer data.data
    }

    //Funciones de carga
    renderTextLoading(isLoading, saveButtonElement) {
      if (isLoading) {
        saveButtonElement.textContent = "Guardando...";
      } else {
        saveButtonElement.textContent = "Guardar";
      }
    }
  }

  const api = new Api({
    baseUrl: "http://localhost:3000", // ← Cambiar a tu backend local
    headers: {
      authorization: "f8e114e3-b34d-4d8e-aa7c-184290d06607",
      "Content-Type": "application/json",
    },
  })

  export default api;