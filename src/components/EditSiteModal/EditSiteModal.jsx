import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { geocodeAddress } from "../../utils/googleMapsService";
import "./EditSiteModal.css";

function EditSiteModal({
  isOpen,
  handleModalClose,
  onOverlayClick,
  onSubmit,
  site,
}) {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    if (isOpen && site) {
      setFormValues({
        name: site.name || "",
        address: site.address || "",
        status: site.status || "pending",
        notes: site.notes || "",
      });
      setGeocodingError(null);
    }
  }, [isOpen, site]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsGeocoding(true);
    setGeocodingError(null);

    try {
      const result = await geocodeAddress(formValues.address);
      const updatedSiteData = {
        name: formValues.name,
        address: result.formattedAddress,
        coordinates: { lat: result.lat, lng: result.lng },
        status: formValues.status,
        notes: formValues.notes,
      };

      onSubmit(updatedSiteData);

      setIsGeocoding(false);
      handleModalClose();
    } catch (err) {
      setGeocodingError(err.message);
      setIsGeocoding(false);
      return;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      onOverlayClick={onOverlayClick}
      title="Edit Site"
      onSubmit={handleSubmit}
      formName="edit-site"
      buttonText={isGeocoding ? "Verifying address..." : "Update Site"}
      isDisabled={isGeocoding}
      errorMessage={geocodingError}
    >
      <fieldset className="modal__fieldset">
        <div className="modal__field">
          <label htmlFor="site-name" className="modal__label">
            Site Name *
          </label>
          <input
            type="text"
            id="site-name"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
            className="modal__input"
            placeholder="Enter site name"
            required
          />
        </div>

        <div className="modal__field">
          <label htmlFor="site-address" className="modal__label">
            Address *
          </label>
          <input
            type="text"
            id="site-address"
            name="address"
            value={formValues.address}
            onChange={handleFormChange}
            className="modal__input"
            placeholder="Enter site address"
            required
            onBlur={() => setGeocodingError(null)}
          />
        </div>

        <div className="modal__field">
          <label htmlFor="site-status" className="modal__label">
            Status
          </label>
          <select
            id="site-status"
            name="status"
            value={formValues.status}
            onChange={handleFormChange}
            className="modal__select"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="modal__field">
          <label htmlFor="site-notes" className="modal__label">
            Notes
          </label>
          <textarea
            id="site-notes"
            name="notes"
            value={formValues.notes}
            onChange={handleFormChange}
            className="modal__textarea"
            placeholder="Optional notes about the site"
            rows="3"
          />
        </div>
      </fieldset>
    </Modal>
  );
}

export default EditSiteModal;
