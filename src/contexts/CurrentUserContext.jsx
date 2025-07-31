import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
  // Inicializar como null, no con datos hardcodeados
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener el usuario actual
  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/users/me');

      if (!response.ok) {
        throw new Error('Error al obtener usuario actual');
      }

      const data = await response.json();

      // La respuesta viene en data.data según tu backend
      setCurrentUser(data.data);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar usuario al montar el componente
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