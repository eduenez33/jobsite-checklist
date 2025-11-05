import "./Dashboard.css";
import StatCard from "../StatCard/StatCard";

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard__stats">
        <StatCard title="Total Sites" value="1" />
        <StatCard title="Active Sites" value="2" />
        <StatCard title="Completed Sites" value="3" />
      </div>
      <div className="dashboard__sites">
        <p className="dashboard__placeholder">
          No job sites yet. Create your first one to get started!
        </p>
      </div>
    </main>
  );
}

export default Dashboard;
