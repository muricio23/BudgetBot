import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import UserProfile from '../components/UserProfile/UserProfile';
import { useAuth } from '../context/AuthContext';
import './Profile.css'; // Para estilos generales de la página de perfil

function Profile() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(true); // Controla si mostrar login o registro

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="profile-page">
      {isLoggedIn ? (
        <UserProfile />
      ) : (
        <div className="auth-forms-wrapper">
          {showLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm onToggleLogin={toggleForm} />
          )}
          {!showLogin && (
            <p className="toggle-form-prompt">
              ¿Ya tienes una cuenta? <span onClick={toggleForm}>Iniciar Sesión</span>
            </p>
          )}
          {showLogin && (
            <p className="toggle-form-prompt">
              ¿No tienes una cuenta? <span onClick={toggleForm}>Regístrate aquí</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;