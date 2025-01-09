import "./Modal.styles.css";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <div
      className={`main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated ${
        isOpen ? "fadeIn" : "fadeOut"
      }`}
      style={{
        background: "rgba(0,0,0,0.5)",
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className="modal-container mx-auto w-11/12 md:w-3/4 lg:w-1/2 h-3/4">
        <div className="modal-content flex flex-col h-full">
          <div className="modal-header flex justify-between items-center p-4 border-b">
            <p className="text-xl font-semibold text-gray-800">{title}</p>
            <div className="modal-close cursor-pointer" onClick={onClose}>
              <svg
                className="fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="modal-body flex-grow overflow-y-auto p-4">
            {children}
          </div>
          <div className="modal-footer flex justify-end p-4 border-t">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
