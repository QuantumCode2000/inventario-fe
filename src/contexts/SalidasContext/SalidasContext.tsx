import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import type { Salida, SalidasContextProps } from "./interfaces";

// Creación del contexto de salidas
const SalidasContext = createContext<SalidasContextProps | undefined>(
  undefined,
);

// Proveedor del contexto de salidas
const SalidasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para las salidas
  const [salidas, setSalidas] = useState<Salida[]>([]);

  // Función para obtener todas las salidas del backend
  const fetchSalidas = async () => {
    try {
      const response = await axios.get(
        "http://54.221.108.114:3000/api/v1/salidas",
      );
      setSalidas(response.data);
    } catch (error) {
      console.error("Error fetching salidas:", error);
    }
  };

  // Cargar salidas al montar el componente
  useEffect(() => {
    fetchSalidas();
  }, []);

  // Función para agregar una nueva salida
  const addSalida = async (salida: Salida) => {
    try {
      const response = await axios.post(
        "http://54.221.108.114:3000/api/v1/salidas",
        salida,
      );
      setSalidas((prevSalidas) => [...prevSalidas, response.data]);
    } catch (error) {
      console.log("Error adding salida:", error);
      throw new Error("Error adding salida");
    }
  };

  // Función para eliminar una salida por ID
  const removeSalida = async (id: string) => {
    try {
      await axios.delete(`http://54.221.108.114:3000/api/v1/salidas/${id}`);
      setSalidas((prevSalidas) =>
        prevSalidas.filter((salida) => salida.id !== id),
      );
    } catch (error) {
      console.log("Error removing salida:", error);
      throw new Error("Error removing salida");
    }
  };

  // Función para actualizar una salida existente
  const updateSalida = async (updatedSalida: Partial<Salida>) => {
    const { id, ...rest } = updatedSalida;
    try {
      const response = await axios.patch(
        `http://54.221.108.114:3000/api/v1/salidas/${id}`,
        rest,
      );
      setSalidas((prevSalidas) =>
        prevSalidas.map((salida) =>
          salida.id === id ? response.data : salida,
        ),
      );
    } catch (error) {
      console.log("Error updating salida:", error);
      throw new Error("Error updating salida");
    }
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <SalidasContext.Provider
      value={{ salidas, addSalida, removeSalida, updateSalida }}
    >
      {children}
    </SalidasContext.Provider>
  );
};

// Hook para usar el contexto de salidas
const useSalidas = (): SalidasContextProps => {
  const context = useContext(SalidasContext);
  if (!context) {
    throw new Error("useSalidas must be used within a SalidasProvider");
  }
  return context;
};

export { SalidasProvider, useSalidas };
export type { Salida };
