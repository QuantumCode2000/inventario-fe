const Button = ({ onClick, text, textStyle }) => {
  return (
    <button
      type="button"
      className={`${textStyle} mx-4 py-2 px-5 mb-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border  hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
