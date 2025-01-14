import { useState } from "react";
import Rows from "./Rows";
import RowHeader from "./RowHeader";
import CustomFilter from "../CustomFilter/CustomFilter";
import Pagination from "./Pagination";

interface Column {
  key: string;
  label: string;
}

interface RowData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TableProps<T extends Record<string, unknown>> {
  header: { [key: string]: string };
  body: T[];
  renderCell: (
    item: T | Record<string, unknown>,
    key: keyof T | string,
    rowIndex: number,
  ) => JSX.Element;
}

const Table = <T extends RowData>({
  header,
  body,
  renderCell,
}: TableProps<T>) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(
    Object.keys(header)[0],
  );
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const headerValues = Object.values(header);
  const headerKeys = Object.keys(header) as (keyof T | "acciones")[];

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

  const columns: Column[] = headerKeys.map((key) => ({
    key: key.toString(),
    label: header[key as string],
  }));

  return (
    <div className="font-sans w-[90%] mx-auto my-8">
      <CustomFilter
        columns={columns}
        selectedColumn={selectedColumn}
        filterText={filterText}
        onColumnChange={handleColumnChange}
        onFilterChange={handleFilterChange}
        ignoredColumns={["id", "acciones"]}
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
