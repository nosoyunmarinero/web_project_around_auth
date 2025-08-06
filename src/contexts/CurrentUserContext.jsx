import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener usuario actual');
      }

      const data = await response.json();
      setCurrentUser(data.data);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    } else {
      setIsLoading(false);
    }
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