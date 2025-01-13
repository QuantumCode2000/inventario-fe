import React from "react";

interface ButtonProps {
  onClick: () => void; // Define que onClick es una función requerida sin parámetros y sin retorno.
  text: string; // Define que text es una cadena de texto requerida.
  textStyle?: string; // Define que textStyle es una cadena opcional.
}

const Button: React.FC<ButtonProps> = ({ onClick, text, textStyle = "" }) => {
  return (
    <button
      type="button"
      className={`${textStyle} mx-4 py-2 px-5 mb-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
