import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-4xl",
  showCloseButton = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div
        className={`modal-box ${maxWidth} w-full relative max-h-[90vh] overflow-y-auto bg-base-200 shadow-2xl ${className}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            <FiX />
          </button>
        )}

        {title && <h3 className="font-bold text-xl md:text-2xl mb-6">{title}</h3>}

        {children}
      </div>

      <div
        className="modal-backdrop bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
    </div>
  );
};

export default Modal;
