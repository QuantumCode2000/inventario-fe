import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { optionsAdmin } from "../components/Sidebar/options";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext/AuthContext";

const Layout = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  useEffect(() => {
    const findSelectedTitle = (
      options:
        | {
            text: string;
            options: { to: string; icon: JSX.Element; text: string }[];
          }[]
        | null,
      path: string,
    ): string | null => {
      for (const option of options ?? []) {
        if (option.options) {
          const subOption = option.options.find((sub) => sub.to === path);
          if (subOption) {
            return subOption.text;
          }
        }
      }
      return null;
    };

    setSelectedTitle(
      findSelectedTitle(
        user?.rol === "administrador" ? optionsAdmin : null,
        location.pathname,
      ),
    );
  }, [location, user?.rol]);

  return (
    <div className="flex flex-grow min-h-screen bg-gray-100 text-gray-800">
      <Sidebar
        selectedTitle={selectedTitle}
        options={user?.rol === "administrador" ? optionsAdmin : null}
      />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        {user && <Navbar rol={user.rol} nombre={user.nombre} />}
        <div className="main-content flex flex-col flex-grow p-6">
          <h1 className="font-bold  text-gray-700 mb-6 text-xs">
            /{selectedTitle}
          </h1>
          <div className="flex flex-col flex-grow border border-gray-300 bg-white rounded-lg p-6 shadow-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
