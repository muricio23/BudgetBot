import React from 'react';
import BalanceCard from '../components/BalanceCard';
import GoalCard from '../components/GoalCard';
import SmartInsight from '../components/SmartInsight';
import { useGoals } from '../context/GoalsContext';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../context/TransactionsContext';
import './Home.css';
import defaultAvatar from '../assets/perfil.png'; // <--- IMPORTA TU LOGO AQUÍ COMO AVATAR PREDETERMINADO (AJUSTA LA RUTA)
import botImage from '../assets/bot.png'; // <--- IMPORTA LA IMAGEN DEL BOT AQUÍ (AJUSTA LA RUTA) 

function Home() {
  const { goals } = useGoals();
  const { user, isLoggedIn } = useAuth();
  const { transactions } = useTransactions();

  // --- Lógica para calcular balances (mantener igual) ---
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const savingsTransactions = transactions
    .filter(t => t.category === 'Ahorro' || t.category === 'Savings');

  const totalSavingsIncome = savingsTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavingsExpense = savingsTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const initialSavingsBalance = 0;
  const currentSavingsBalance = initialSavingsBalance + totalSavingsIncome - totalSavingsExpense;
  const currentCheckingBalance = netBalance - currentSavingsBalance;
  // --- Fin lógica de balances ---


  // --- Lógica para generar el mensaje de Smart Insight (mantener igual) ---
  const generateSmartInsightMessage = () => {
    if (transactions.length === 0) {
      return "¡Parece que eres nuevo por aquí! Empieza registrando tus ingresos y gastos. 🚀";
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
    });

    const currentMonthIncome = currentMonthTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpense = currentMonthTransactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthNet = currentMonthIncome - currentMonthExpense;

    if (currentMonthNet > 0) {
      if (currentMonthIncome > 0 && currentMonthExpense === 0) {
        return `¡Estupendo! Este mes solo has tenido ingresos. Sigue así y tus finanzas crecerán. ✨`;
      }
      return `¡Vas por buen camino! Este mes has ahorrado $${currentMonthNet.toFixed(2)}. ¡Tu futuro financiero lo agradecerá! 💰`;
    } else if (currentMonthNet < 0) {
      if (currentMonthExpense > currentMonthIncome * 2) {
        return `¡Ánimo! Este mes los gastos han superado los ingresos. Revisa tus reportes para encontrar oportunidades de mejora. 💪`;
      }
      return `Este mes tus gastos superan tus ingresos en $${Math.abs(currentMonthNet).toFixed(2)}. ¡Es una oportunidad para ajustar tu presupuesto! 💡`;
    } else {
      return "¡Balance perfecto este mes! Cada centavo cuenta. 🎉";
    }
  };

  const smartInsightMessage = generateSmartInsightMessage();
  // --- Fin lógica de Smart Insight ---


  const topGoals = goals.slice(0, 2);

  const displayUserName = isLoggedIn && user ? user.name || user.username : 'Invitado';

  // Usa el user.avatar si existe y el usuario está logeado, de lo contrario, usa el logo predeterminado
  const displayUserAvatar = isLoggedIn && user && user.avatar
    ? user.avatar
    : defaultAvatar; // <--- USA EL LOGO IMPORTADO AQUÍ


  return (
    <div className="home-page">
      <div className="welcome-header">
        {/* El div user-avatar ahora usará la imagen que definimos */}
        <div className="user-avatar" style={{ backgroundImage: `url(${displayUserAvatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <h1>Bienvenido de nuevo, {displayUserName}</h1>
        <button className="add-button">+</button>
      </div>

      <div className="total-balance-section">
        <p className="section-label">Total Balance</p>
        <p className="total-amount">${netBalance.toFixed(2)}</p>
        <div className="balance-cards-container">
          <BalanceCard title="Checking" amount={currentCheckingBalance.toFixed(2)} />
          <BalanceCard title="Savings" amount={currentSavingsBalance.toFixed(2)} />
        </div>
      </div>

      <div className="goals-section">
        <p className="section-label">Tus Metas</p>
        {topGoals.length === 0 ? (
          <p className="no-goals-home-message">No hay metas para mostrar aquí. Ve a la sección 'Metas' para añadir algunas. 🏆</p>
        ) : (
          topGoals.map(goal => (
            <GoalCard
              key={goal.id}
              name={goal.name}
              current={goal.currentAmount}
              target={goal.targetAmount}
              emoji={goal.emoji}
            />
          ))
        )}
      </div>

      <SmartInsight message={smartInsightMessage} botIcon={botImage} />
    </div>
  );
}

export default Home;