// interface RowData {
//   [key: string]: unknown;
// }

// interface RowsProps<T extends RowData> {
//   data: {
//     body: T[];
//     header: string[];
//   };
//   renderCell?: (item: T, key: string, rowIndex: number) => JSX.Element;
// }

// const Rows = <T extends RowData>({ data, renderCell }: RowsProps<T>) => {
//   const { body, header } = data;

//   return (
//     <>
//       {body.map((item, rowIndex) => (
//         <tr
//           key={rowIndex}
//           className={`text-xs text-gray-800 ${
//             rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
//           } hover:bg-gray-200 transition-colors`}
//         >
//           <td className="px-4 py-3 text-center border-b border-gray-300">
//             {rowIndex + 1}
//           </td>
//           {header.map((key, colIndex) => (
//             <td
//               key={colIndex}
//               className="px-4 py-3 text-center border-b border-gray-300"
//             >
//               {renderCell ? renderCell(item, key, rowIndex) : String(item[key])}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </>
//   );
// };

// export default Rows;
import React from "react";

interface RowData {
  [key: string]: string | number | boolean | null | undefined;
}

interface RowsProps<T extends RowData> {
  data: {
    body: T[];
    header: (keyof T | "acciones")[];
  };
  renderCell?: (
    item: T,
    key: keyof T | "acciones",
    rowIndex: number,
  ) => JSX.Element;
}

const Rows = <T extends RowData>({ data, renderCell }: RowsProps<T>) => {
  const { body, header } = data;

  return (
    <>
      {body.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className={`text-xs text-gray-800 ${
            rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-200 transition-colors`}
        >
          <td className="px-4 py-3 text-center border-b border-gray-300">
            {rowIndex + 1}
          </td>
          {header.map((key, colIndex) => (
            <td
              key={colIndex}
              className="px-4 py-3 text-center border-b border-gray-300"
            >
              {renderCell
                ? renderCell(item, key as keyof T | "acciones", rowIndex)
                : String(item[key])}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Rows;
