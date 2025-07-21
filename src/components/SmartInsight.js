import React from 'react';
import './SmartInsight.css';

// El componente ahora acepta una prop 'botIcon'
function SmartInsight({ message, botIcon }) {
  return (
    <div className="smart-insight-card">
      {botIcon && ( // Solo renderiza la imagen si la prop botIcon existe
        <img src={botIcon} alt="Bot Icon" className="smart-insight-icon" />
      )}
      <p className="smart-insight-message">{message}</p>
    </div>
  );
}

export default SmartInsight;