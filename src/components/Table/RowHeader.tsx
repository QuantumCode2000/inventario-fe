import React from "react";

interface RowHeaderProps {
  data: string[];
}

const RowHeader: React.FC<RowHeaderProps> = ({ data }) => {
  return (
    <tr className="text-xs font-semibold w-1 text-left bg-black text-white">
      <th className="px-4 py-2">N°</th>
      {data.map((item, index) => (
        <th key={index} className="px-4 py-2">
          {item}
        </th>
      ))}
    </tr>
  );
};

export default RowHeader;
