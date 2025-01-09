import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ rol, nombre }) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // Redirigir al login después del logout
  };

  return (
    <header className="header bg-gray-800 shadow-md py-4 px-6">
      <div className="header-content flex items-center">
        <div className="flex ml-auto">
          <a className="flex flex-row items-center">
            <img
              src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
              alt="User Avatar"
              className="h-10 w-10 bg-gray-700 border border-gray-600 rounded-full"
            />
            <span className="flex flex-col ml-3">
              <span className="truncate w-20 h-4 font-semibold text-white leading-none">
                {nombre}
              </span>
              <span className="truncate w-20 h-4 text-gray-400 text-xs leading-none">
                {rol}
              </span>
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-300"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
