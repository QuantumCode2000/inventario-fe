// import React from "react";

// // Define el tipo para cada columna
// interface Column {
//   key: string;
//   label: string;
// }

// // Define los tipos para las props del componente
// interface CustomFilterProps {
//   columns: Column[];
//   selectedColumn: string;
//   filterText: string;
//   onColumnChange: (columnKey: string) => void;
//   onFilterChange: (filterText: string) => void;
// }

// const CustomFilter: React.FC<CustomFilterProps> = ({
//   columns,
//   selectedColumn,
//   filterText,
//   onColumnChange,
//   onFilterChange,
// }) => {
//   return (
//     <div className="mb-4 flex flex-col space-y-4">
//       <div className="flex flex-wrap items-center space-x-2">
//         <label className="text-gray-800 mr-2">Realizar búsqueda:</label>
//         {columns.map((column) => (
//           <button
//             key={column.key}
//             onClick={() => onColumnChange(column.key)}
//             className={`px-3 py-1 rounded-lg border ${
//               selectedColumn === column.key
//                 ? "bg-blue-500 text-white border-blue-500"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {column.label}
//           </button>
//         ))}
//       </div>
//       {selectedColumn && (
//         <div className="mt-2">
//           <input
//             type="text"
//             placeholder="Valor"
//             value={filterText}
//             onChange={(e) => onFilterChange(e.target.value)}
//             className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomFilter;
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
  ignoredColumns: string[];
}

const CustomFilter: React.FC<CustomFilterProps> = ({
  columns,
  selectedColumn,
  filterText,
  onColumnChange,
  onFilterChange,
  ignoredColumns,
}) => {
  columns = columns.filter((column) => !ignoredColumns.includes(column.key));

  return (
    <div className="mb-6 flex flex-col space-y-4">
      <div className="flex flex-wrap items-center space-x-2">
        <label className="text-gray-900 font-medium mr-2">Buscar por:</label>
        {columns.map((column) => (
          <button
            key={column.key}
            onClick={() => onColumnChange(column.key)}
            className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
              selectedColumn === column.key
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {column.label}
          </button>
        ))}
      </div>

      {selectedColumn && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Escribe un valor para filtrar..."
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default CustomFilter;
