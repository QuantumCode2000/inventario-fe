import React from "react";

// Define el tipo para cada columna
interface Column {
  key: string;
  label: string;
}

// Define los tipos para las props del componente
interface CustomFilterProps {
  columns: Column[];
  selectedColumn: string;
  filterText: string;
  onColumnChange: (columnKey: string) => void;
  onFilterChange: (filterText: string) => void;
}

const CustomFilter: React.FC<CustomFilterProps> = ({
  columns,
  selectedColumn,
  filterText,
  onColumnChange,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-4">
      <div className="flex flex-wrap items-center space-x-2">
        <label className="text-gray-800 mr-2">Realizar búsqueda:</label>
        {columns.map((column) => (
          <button
            key={column.key}
            onClick={() => onColumnChange(column.key)}
            className={`px-3 py-1 rounded-lg border ${
              selectedColumn === column.key
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {column.label}
          </button>
        ))}
      </div>
      {selectedColumn && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Valor"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default CustomFilter;
