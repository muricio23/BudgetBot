import React from 'react';
import './SmartInsight.css'; // Estilos para el Smart Insight

function SmartInsight({ message }) {
  return (
    <div className="smart-insight-card">
      <div className="smart-insight-title">Smart Insight</div>
      <p className="smart-insight-message">{message}</p>
    </div>
  );
}

export default SmartInsight;