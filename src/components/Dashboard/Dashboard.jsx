import "./Dashboard.css";
import { useContext } from "react";
import SitesContext from "../../contexts/SitesContext";
import StatCard from "../StatCard/StatCard";
import SiteCard from "../SiteCard/SiteCard";

function Dashboard() {
  const { sites, handleEditSiteClick, handleDeleteSiteClick } =
    useContext(SitesContext);

  // Calculate stats from sites array
  const total = sites.length;
  const active = sites.filter((site) => site.status === "active").length;
  const completed = sites.filter((site) => site.status === "completed").length;

  return (
    <main className="dashboard">
      <section className="dashboard__stats">
        <StatCard title="Total Sites" value={total} />
        <StatCard title="Active Sites" value={active} />
        <StatCard title="Completed Sites" value={completed} />
      </section>
      <section className="dashboard__sites">
        {sites.length === 0 ? (
          <p className="dashboard__empty-state">
            No job sites yet. Create your first one to get started!
          </p>
        ) : (
          <div className="dashboard__sites-container">
            {sites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                onEdit={handleEditSiteClick}
                onDelete={handleDeleteSiteClick}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
