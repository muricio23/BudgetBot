import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthForm.css';

function RegisterForm({ onToggleLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Validaciones básicas
    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const success = register(name, email, password);
    if (!success) {
      setError('Error al registrar. Inténtalo de nuevo.'); // Simulación, en real sería un mensaje de backend
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
      <p className="toggle-auth">
        ¿Ya tienes una cuenta? <span onClick={onToggleLogin}>Iniciar Sesión</span>
      </p>
    </div>
  );
}

export default RegisterForm;