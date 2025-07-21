import './GoalCard.css'; // Estilos para la tarjeta de meta

function GoalCard({ name, current, target, emoji }) {
  const percentage = (current / target) * 100;

  return (
    <div className="goal-card">
      <div className="goal-header">
        <span className="goal-name">{name}</span>
        <span className="goal-emoji">{emoji}</span>
      </div>
      <div className="goal-progress-text">
        ${current} / ${target}
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default GoalCard;