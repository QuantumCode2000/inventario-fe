import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import PrivateRoute from "./routers/PrivateRoute/PrivateRoute";
import PublicRoute from "./routers/PublicRoute/PublicRoute";
import Layout from "./layout/Layout";
import EntradasRegister from "./views/EntradasRegister/EntradasRegister";
import InventarioRegister from "./views/InventatioRegister/InventarioRegister";
import SalidasRegister from "./views/SalidasRegister/SalidasRegister";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "Reportes-KPI",
          element: (
            <PrivateRoute requiredRole="administrador">
              <p>404</p>
            </PrivateRoute>
          ),
        },
        {
          path: "parte-general",
          element: (
            <PrivateRoute requiredRole="administrador">
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "registro-personal",
          element: (
            <PrivateRoute requiredRole="administrador">
              <PersonalRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "reportes",
          element: (
            <PrivateRoute requiredRole="administrador">
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "cuadro-de-mando",
          element: (
            <PrivateRoute requiredRole="administrador">
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "reportes-novedades",
          element: (
            <PrivateRoute requiredRole="administrador">
              <p>q</p>
            </PrivateRoute>
          ),
        },

        {
          path: "inventario",
          element: (
            <PrivateRoute requiredRole="administrador">
              <InventarioRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "registrar-entradas",
          element: (
            <PrivateRoute requiredRole="administrador">
              <EntradasRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "registrar-salidas",
          element: (
            <PrivateRoute requiredRole="administrador">
              <SalidasRegister />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
    {
      path: "unauthorized",
      element: <div>No estás autorizado para ver esta página</div>,
    },
    {
      path: "*",
      element: <div>404 - Página no encontrada</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
