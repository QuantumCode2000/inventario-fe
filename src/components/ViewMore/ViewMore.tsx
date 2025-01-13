import React from "react";

interface ViewMoreProps {
  titles: { [key: string]: string };
  data: { [key: string]: any };
}

const ViewMore: React.FC<ViewMoreProps> = ({ titles, data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
      {Object.keys(titles).map((key) => (
        <div key={key} className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {titles[key]}
          </span>
          <span className="text-gray-600 mt-1">
            {data[key] || "No disponible"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ViewMore;
