import React, { useState } from "react";
import Rows from "./Rows";
import RowHeader from "./RowHeader";
import CustomFilter from "../CustomFilter/CustomFilter";
import Pagination from "./Pagination";

interface TableProps {
  header: { [key: string]: string }; // header es un objeto con claves y etiquetas de columnas

  body: Array<{ [key: string]: any }>; // body es un array de objetos que representan las filas
  data: { [key: string]: string }[];
  renderCell: (value: any, key: string, rowIndex: number) => JSX.Element; // Función para renderizar celdas
}

const Table: React.FC<TableProps> = ({ header, body, renderCell }) => {
  const [selectedColumn, setSelectedColumn] = useState(Object.keys(header)[0]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headerValues = Object.values(header);
  const headerKeys = Object.keys(header);

  const handleFilterChange = (text: string) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  const handleColumnChange = (column: string) => {
    setSelectedColumn(column);
    setCurrentPage(1);
  };

  const filteredBody = body.filter(
    (item) =>
      item[selectedColumn] != null &&
      item[selectedColumn]
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredBody.length / itemsPerPage);
  const currentBody = filteredBody.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = headerKeys.map((key) => ({
    key,
    label: header[key],
  }));

  return (
    <div className="font-sans w-[90%] mx-auto my-8">
      <CustomFilter
        columns={columns}
        selectedColumn={selectedColumn}
        filterText={filterText}
        onColumnChange={handleColumnChange}
        onFilterChange={handleFilterChange}
      />
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-auto max-h-96">
          <table className="min-w-full table-auto border-collapse border border-gray-700">
            <thead>
              <RowHeader data={headerValues} />
            </thead>
            <tbody className="bg-gray-900 text-white">
              <Rows
                data={{ body: currentBody, header: headerKeys }}
                renderCell={renderCell}
              />
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredBody.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Table;
