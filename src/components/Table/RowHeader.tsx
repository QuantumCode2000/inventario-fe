import React from "react";

interface RowHeaderProps {
  data: string[];
}

const RowHeader: React.FC<RowHeaderProps> = ({ data }) => {
  return (
    <tr className="text-xs font-bold text-left bg-gray-800 text-white">
      <th className="px-4 py-3 text-center">#</th>
      {data.map((item, index) => (
        <th
          key={index}
          className="px-4 py-3 text-center border-l border-gray-700"
        >
          {item}
        </th>
      ))}
    </tr>
  );
};

export default RowHeader;
