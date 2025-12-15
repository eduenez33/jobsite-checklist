import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import SitesContext from "../../contexts/SitesContext";
import MapDisplay from "../MapDisplay/MapDisplay";
import storageService from "../../utils/storageService";
import { MapPin, Calendar, X, SquarePlus, Pencil } from "lucide-react";
import "./SiteDetailView.css";

function SiteDetailView() {
  const { siteId } = useParams();

  const { sites, setSites, handleEditSiteClick } = useContext(SitesContext);

  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unit: "",
  });

  const site = sites.find((site) => site.id === parseInt(siteId));

  if (!site) {
    return <div className="site-detail__error">Site not found</div>;
  }

  const handleDeleteChecklistItem = async (siteId, itemId) => {
    try {
      const updatedSite = await storageService.deleteChecklistItem(
        siteId,
        itemId
      );

      setSites((prevSites) =>
        prevSites.map((site) => (site.id === siteId ? updatedSite : site))
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleToggleComplete = async (siteId, itemId, currentStatus) => {
    try {
      const updatedSite = await storageService.updateChecklistItem(
        siteId,
        itemId,
        { completed: !currentStatus }
      );
      setSites((prevSites) =>
        prevSites.map((s) => (s.id === siteId ? updatedSite : s))
      );
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemName.trim()) return;

    try {
      const updatedSite = await storageService.addChecklistItem(site.id, {
        text: formData.itemName,
        quantity: formData.quantity ? parseInt(formData.quantity) : 0,
        unit: formData.unit || "Units",
      });
      setSites((prevSites) =>
        prevSites.map((site) => (site.id === site.id ? updatedSite : site))
      );
      setFormData({ itemName: "", quantity: "", unit: "" });
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div className="site-detail">
      <div className="site-detail__header">
        <div className="site-detail__text">
          <div className="site-detail__title-section">
            <h2 className="site-detail__container-title">{site.name}</h2>
            <button
              className="site-detail__edit-button"
              onClick={() => handleEditSiteClick(site)}
              title="Edit site details"
            >
              <Pencil size={16} /> Edit Site Details
            </button>
          </div>
          <p className="site-detail__info-title">
            <MapPin size={14} /> Address
          </p>
          <p className="site-detail__info-text">{site.address}</p>
          <p className="site-detail__info-title">
            <Calendar size={14} /> Created
          </p>
          <p className="site-detail__info-text">
            {new Date(site.createdAt).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="site-detail__info-title">Notes</p>
          <p className="site-detail__info-text">{site.notes}</p>
          <span
            className={`site-detail__status site-detail__status--${site.status}`}
          >
            {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
          </span>
        </div>
        <div className="site-detail__map">
          <h2 className="site-detail__container-title">Location</h2>
          <MapDisplay
            address={site.address}
            coordinates={site.coordinates}
            height="300px"
          />
        </div>
      </div>
      <div className="site-detail__checklist">
        <div className="site-detail__checklist-header">
          <h2 className="site-detail__container-title">Supply Checklist</h2>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="site-detail__add-item-form"
        >
          <div className="site-detail__form-row">
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleFormChange}
              placeholder="Item name"
              className="site-detail__form-input"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              placeholder="Quantity"
              className="site-detail__form-input site-detail__form-input_type_number"
            />
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleFormChange}
              placeholder="Unit (e.g., kg, boxes)"
              className="site-detail__form-input"
            />
            <button
              type="submit"
              className="site-detail__checklist-button site-detail__checklist-button_type_add"
            >
              <SquarePlus size={16} /> Add Item
            </button>
          </div>
        </form>
        {site.checklist && site.checklist.length > 0 ? (
          <ul className="site-detail__items">
            {site.checklist.map((item) => (
              <li key={item.id} className="site-detail__item">
                <div className="site-detail__checklist-item-text-wrapper">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() =>
                      handleToggleComplete(site.id, item.id, item.completed)
                    }
                  />
                  <p className="site-detail__checklist-item-text">
                    {item.text}
                    {item.quantity > 0 && (
                      <span className="site-detail__checklist-quantity">
                        {item.quantity} {item.unit}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  className="site-detail__checklist-button"
                  onClick={() => handleDeleteChecklistItem(site.id, item.id)}
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="site-detail__empty">
            <p>No items yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SiteDetailView;
