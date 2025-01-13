import React from "react";

interface ContentProps {
  children: React.ReactNode; // Definir children como React.ReactNode, que puede ser cualquier tipo de contenido React.
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-[90%] justify-center w-[100%]">
      {children}
    </div>
  );
};

export default Content;
