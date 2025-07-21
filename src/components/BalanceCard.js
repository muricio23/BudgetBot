import React from 'react';
import './BalanceCard.css';

function BalanceCard({ title, amount }) {
  // Asegúrate de que 'amount' sea un número antes de usar toFixed
  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : amount;

  return (
    <div className="balance-card">
      <span className="balance-card-title">{title}</span>
      <span className="balance-card-amount">${formattedAmount}</span>
    </div>
  );
}

export default BalanceCard;