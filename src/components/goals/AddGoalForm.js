import React, { useState } from 'react';
import { useGoals } from '../../context/GoalsContext';
import './AddGoalForm.css'; // Estilos para el formulario de metas

function AddGoalForm({ onClose }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const { addGoal } = useGoals();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !targetAmount || !dueDate) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setError('El monto total debe ser un número positivo.');
      return;
    }

    addGoal(name, targetAmount, dueDate);
    onClose(); // Cierra el formulario después de agregar
  };

  return (
    <div className="add-goal-form-container">
      <h3>Agregar Nueva Meta</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goalName">Nombre de la Meta:</label>
          <input
            type="text"
            id="goalName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetAmount">Monto Total:</label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Fecha a Alcanzar:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="add-button">Agregar Meta</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddGoalForm;