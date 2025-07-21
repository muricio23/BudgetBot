import React, { createContext, useState, useContext, useEffect } from 'react';
import defaultProfileImage from '../assets/perfil.jpg'; // <--- ¡IMPORTA TU IMAGEN AQUÍ!

// 1. Crea el contexto
const AuthContext = createContext(null);

// 2. Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn === 'true';
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    // Si hay un usuario guardado, pársalo. Si no, usa null.
    // Opcional: Podrías hacer que el avatar por defecto se cargue aquí también si el user no tiene uno específico.
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  const login = (username, password) => {
    if (username === 'test@example.com' && password === 'password123') {
      setIsLoggedIn(true);
      setUser({
        username: username,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: defaultProfileImage, // <--- ¡USA TU IMAGEN IMPORTADA AQUÍ!
      });
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    setIsLoggedIn(true);
    setUser({
      username: email,
      name: name,
      email: email,
      avatar: defaultProfileImage, // <--- ¡USA TU IMAGEN IMPORTADA AQUÍ!
    });
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedData }));
  };

  const authContextValue = {
    isLoggedIn,
    user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};