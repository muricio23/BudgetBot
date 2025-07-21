import React, { useState } from 'react';
import { useGoals } from '../context/GoalsContext';
import AddGoalForm from '../components/goals/AddGoalForm';
import GoalCard from '../components/GoalCard'; // Reutilizamos el GoalCard de Home
import './Goals.css'; // Estilos específicos para la página Goals

function Goals() {
  const { goals, updateGoal, deleteGoal } = useGoals();
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);

  // Función para simular añadir progreso a una meta
  const handleAddProgress = (goalId, amountToAdd) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      const newCurrentAmount = Math.min(goal.currentAmount + parseFloat(amountToAdd), goal.targetAmount);
      updateGoal(goalId, { currentAmount: newCurrentAmount });
    }
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>Tus Metas de Ahorro</h2>
        <button className="add-goal-button" onClick={() => setShowAddGoalForm(true)}>+ Añadir Meta</button>
      </div>

      {showAddGoalForm && (
        <div className="modal-overlay">
          <AddGoalForm onClose={() => setShowAddGoalForm(false)} />
        </div>
      )}

      <div className="goals-list">
        {goals.length === 0 ? (
          <p className="no-goals-message">¡No tienes metas establecidas aún! Añade una para empezar a ahorrar. 🚀</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="goal-item-container">
              <GoalCard
                name={goal.name}
                current={goal.currentAmount}
                target={goal.targetAmount}
                emoji={goal.emoji}
              />
              <div className="goal-actions">
                {/* Puedes añadir un formulario simple para agregar progreso aquí o en un modal */}
                <button
                  className="action-button add-progress-button"
                  onClick={() => {
                    const amount = prompt('¿Cuánto quieres añadir a esta meta?');
                    if (amount && !isNaN(parseFloat(amount))) {
                      handleAddProgress(goal.id, amount);
                    }
                  }}
                >
                  Añadir Progreso
                </button>
                <button className="action-button delete-button" onClick={() => deleteGoal(goal.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Goals;