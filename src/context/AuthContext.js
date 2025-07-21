import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crea el contexto
const AuthContext = createContext(null);

// 2. Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Estado para simular si el usuario está logeado
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Intenta leer el estado de localStorage al cargar
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn === 'true'; // Convierte la cadena a booleano
  });

  // Estado para los datos del usuario (simulados)
  const [user, setUser] = useState(() => {
    // Intenta leer los datos del usuario de localStorage al cargar
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guarda el estado de autenticación y los datos del usuario en localStorage
  // cada vez que cambian
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  // Función para simular el login
  const login = (username, password) => {
    // Aquí, en una app real, harías una llamada a la API
    // para autenticar al usuario y recibirías sus datos.
    if (username === 'test@example.com' && password === 'password123') {
      setIsLoggedIn(true);
      setUser({
        username: username,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150', // URL de un avatar de ejemplo
      });
      return true; // Éxito
    }
    return false; // Fallo
  };

  // Función para simular el registro
  const register = (name, email, password) => {
    // En una app real, enviarías esto a tu backend para crear el usuario.
    // Aquí simplemente asumimos que el registro es exitoso y logeamos al usuario.
    setIsLoggedIn(true);
    setUser({
      username: email, // Usamos el email como username para simplificar
      name: name,
      email: email,
      avatar: 'https://via.placeholder.com/150',
    });
    return true; // Éxito
  };

  // Función para simular el logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Función para actualizar el perfil (simulado)
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

// 3. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};