import { X } from "lucide-react";

import "./Modal.css";

function Modal({
  isOpen,
  onClose,
  onOverlayClick,
  title,
  children,
  onSubmit,
  formName,
  buttonText,
  secondButtonText,
  onSecondButtonClick,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          <X />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} name={formName} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondButtonText && (
              <button
                type="button"
                className="modal__switch"
                onClick={onSecondButtonClick}
              >
                {secondButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
