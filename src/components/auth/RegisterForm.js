import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthForm.css'; // Assuming this CSS file styles your auth forms

function RegisterForm() { // onToggleLogin ya no es necesario si el mensaje se maneja externamente
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State for terms
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (!acceptedTerms) {
      setError('Debes aceptar los Términos y Condiciones para registrarte.');
      return;
    }

    const success = register(name, email, password);
    if (!success) {
      setError('Error al registrar. Inténtalo de nuevo.');
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

        <div className="terms-checkbox-group">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="acceptTerms">
            Acepto los <a href="/terms" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a> y la <a href="/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
      {/* --- ELIMINA ESTE PÁRRAFO DE AQUÍ --- */}
      {/* <p className="toggle-auth">
        ¿Ya tienes una cuenta? <span onClick={onToggleLogin}>Iniciar Sesión</span>
      </p> */}
    </div>
  );
}

export default RegisterForm;