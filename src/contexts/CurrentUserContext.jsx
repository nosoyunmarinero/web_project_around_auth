import { createContext, useState, useEffect } from "react";

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

      const response = await fetch('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('token');
        }
        throw new Error('Error al obtener usuario actual');
      }

      const data = await response.json();
      // Manejar ambos formatos de respuesta
      setCurrentUser(data.data || data);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      setCurrentUser(null);
      localStorage.removeItem('token');
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