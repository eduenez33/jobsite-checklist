import "./StatCard.css";

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h2 className="stat-card__title">{title}</h2>
      <p className="stat-card__value">{value}</p>
    </div>
  );
}

export default StatCard;
