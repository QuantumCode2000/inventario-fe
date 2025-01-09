import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  const renderPaginationButtons = (): JSX.Element[] => {
    const pageButtons: JSX.Element[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-600 hover:bg-gray-100 ${
              currentPage === i ? "font-semibold text-blue-600" : ""
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      pageButtons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-600 hover:bg-gray-100 ${
            currentPage === 1 ? "font-semibold text-blue-600" : ""
          }`}
        >
          1
        </button>,
      );

      if (currentPage > 3) {
        pageButtons.push(
          <span key="start-ellipsis" className="px-3 py-2">
            ...
          </span>,
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-600 hover:bg-gray-100 ${
              currentPage === i ? "font-semibold text-blue-600" : ""
            }`}
          >
            {i}
          </button>,
        );
      }

      if (currentPage < totalPages - 2) {
        pageButtons.push(
          <span key="end-ellipsis" className="px-3 py-2">
            ...
          </span>,
        );
      }

      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-600 hover:bg-gray-100 ${
            currentPage === totalPages ? "font-semibold text-blue-600" : ""
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-700">
        Viendo <span className="font-semibold">{startItem}</span> a{" "}
        <span className="font-semibold">{endItem}</span> de{" "}
        <span className="font-semibold">{totalItems}</span> resultados
      </p>
      <nav className="inline-flex shadow-sm">
        <button
          onClick={handlePreviousPage}
          className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {renderPaginationButtons()}
        <button
          onClick={handleNextPage}
          className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
