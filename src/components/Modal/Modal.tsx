import React from "react";
import "./Modal.styles.css";

interface ModalProps {
  children: React.ReactNode; // Los hijos del modal pueden ser cualquier contenido válido de React.
  isOpen: boolean; // Determina si el modal está abierto o cerrado.
  onClose: () => void; // Función para cerrar el modal.
  title: string; // El título del modal.
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  return (
    <div
      className={`main-modal fixed w-full h-full inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-container bg-white rounded-lg shadow-lg mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/2 h-auto max-h-[90%] overflow-hidden">
        {/* Modal Header */}
        <div className="modal-header flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            className="modal-close p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body p-4 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer flex justify-end p-4 border-t">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
