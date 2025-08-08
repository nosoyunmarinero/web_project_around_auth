import { createContext, useState, useEffect } from "react";
import api from "../utils/api.js"; // Importar la instancia de API

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        setCurrentUser(null);
        return;
      }

      // Asegurarse de que API tenga el token actualizado
      api.updateToken(token);

      // Usar la instancia de API en lugar de fetch directo
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      setCurrentUser(null);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      setCurrentUser,
      isLoading,
      refreshUser: getCurrentUser
    }}>
      {children}
    </CurrentUserContext.Provider>
  )
}