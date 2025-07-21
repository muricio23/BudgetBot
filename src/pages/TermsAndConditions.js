import React from 'react';
import './LegalPages.css'; // Crea un CSS para estas páginas legales

function TermsAndConditions() {
  return (
    <div className="legal-page-container">
      <h1>Términos y Condiciones</h1>
      <p>Bienvenido a Budget Bot. Al registrarte y usar nuestra aplicación, aceptas los siguientes términos y condiciones:</p>
      <h2>1. Aceptación de los Términos</h2>
      <p>Al acceder o usar el Servicio, usted acepta estar obligado por estos Términos. Si no está de acuerdo con alguna parte de los términos, entonces no podrá acceder al Servicio.</p>
      <h2>2. Privacidad</h2>
      <p>Su uso del Servicio también se rige por nuestra Política de Privacidad, que explica cómo recopilamos, usamos y divulgamos información sobre usted. Por favor, lea nuestra Política de Privacidad cuidadosamente.</p>
      {/* ... Añade todo tu contenido aquí ... */}
      <p>Última actualización: Julio 2025</p>
    </div>
  );
}

export default TermsAndConditions;