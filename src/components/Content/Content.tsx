const Content = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-[90%] justify-center w-[100%] ">
      {children}
    </div>
  );
};

export default Content;
