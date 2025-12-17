import Modal from "../Modal/Modal";
import "./DeleteSiteModal.css";

function DeleteSiteModal({
  isOpen,
  handleModalClose,
  onOverlayClick,
  onConfirm,
  site,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      onOverlayClick={onOverlayClick}
      title="Delete Site"
      onSubmit={handleSubmit}
      formName="delete-site"
      buttonText="Delete"
      secondButtonText="Cancel"
      onSecondButtonClick={handleModalClose}
    >
      <div className="delete-modal__content">
        <p className="delete-modal__message">
          Are you sure you want to delete <strong>{site?.name}</strong>? This
          action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

export default DeleteSiteModal;
