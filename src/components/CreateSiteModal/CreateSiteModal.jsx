import Modal from "../Modal/Modal";
import "./CreateSiteModal.css";

function CreateSiteModal({
  isOpen,
  handleModalClose,
  onOverlayClick,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form data will be handled here later
    const formData = new FormData(e.target);
    const siteData = {
      name: formData.get("name"),
      address: formData.get("address"),
      status: formData.get("status"),
      notes: formData.get("notes"),
    };
    onSubmit(siteData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      onOverlayClick={onOverlayClick}
      title="Create New Site"
      onSubmit={handleSubmit}
      formName="create-site"
      buttonText="Create Site"
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
            className="modal__input"
            placeholder="Enter site address"
            required
          />
        </div>

        <div className="modal__field">
          <label htmlFor="site-status" className="modal__label">
            Status
          </label>
          <select
            id="site-status"
            name="status"
            className="modal__select"
            defaultValue="pending"
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
            className="modal__textarea"
            placeholder="Optional notes about the site"
            rows="3"
          />
        </div>
      </fieldset>
    </Modal>
  );
}

export default CreateSiteModal;
