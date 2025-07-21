import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css'; // Estilos para el perfil
import defaultProfileImage from '../../assets/perfil.png'; // <--- ¡IMPORTA TU IMAGEN DE PERFIL AQUÍ!

function UserProfile() {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <h2>Mi Perfil</h2>
      <div className="profile-card">
        <div className="avatar-section">
          {/* Usa tu imagen importada como default si user.avatar no está disponible */}
          <img
            src={user?.avatar || defaultProfileImage} // <--- CAMBIO CLAVE AQUÍ
            alt="User Avatar"
            className="profile-avatar"
          />
          <p className="profile-username">@{user?.username || 'Invitado'}</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="profile-button save-button">Guardar Cambios</button>
            <button type="button" className="profile-button cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Nombre:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <button onClick={() => setIsEditing(true)} className="profile-button edit-button">Editar Perfil</button>
          </div>
        )}

        <button onClick={logout} className="profile-button logout-button">Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default UserProfile;