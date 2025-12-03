import "./SiteCard.css";

function SiteCard({ site, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "site-card__status--active";
      case "completed":
        return "site-card__status--completed";
      case "pending":
      default:
        return "site-card__status--pending";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="site-card">
      <div className="site-card__header">
        <h3 className="site-card__title">{site.name}</h3>
        <span className={`site-card__status ${getStatusColor(site.status)}`}>
          {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
        </span>
      </div>

      <div className="site-card__content">
        <p className="site-card__address">{site.address}</p>

        {site.notes && <p className="site-card__notes">{site.notes}</p>}

        <p className="site-card__date">Created: {formatDate(site.createdAt)}</p>
      </div>

      <div className="site-card__actions">
        <button
          className="site-card__button site-card__button--edit"
          onClick={() => onEdit(site)}
          type="button"
        >
          Edit
        </button>
        <button
          className="site-card__button site-card__button--delete"
          onClick={() => onDelete(site)}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default SiteCard;
