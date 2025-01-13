import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UsersProvider } from "./contexts/UsersContext/UsersContext.tsx";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.tsx";
import { InventarioProvider } from "./contexts/InventarioContext/InventarioContext.tsx";
import { EntradasProvider } from "./contexts/EntradasContext/EntradasContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <AuthProvider>
      <React.StrictMode>
        <InventarioProvider>
          <EntradasProvider>
            <App />
          </EntradasProvider>
        </InventarioProvider>
      </React.StrictMode>
    </AuthProvider>
  </UsersProvider>,
);
