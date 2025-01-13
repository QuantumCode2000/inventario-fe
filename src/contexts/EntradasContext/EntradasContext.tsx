import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import type { Entrada, EntradasContextProps } from "./interfaces";

// Creación del contexto de entradas
const EntradasContext = createContext<EntradasContextProps | undefined>(
  undefined,
);

// Proveedor del contexto de entradas
const EntradasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para las entradas
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  // Función para obtener todas las entradas del backend
  const fetchEntradas = async () => {
    try {
      const response = await axios.get(
        "http://54.234.14.21:3000/api/v1/entradas",
      );
      setEntradas(response.data);
    } catch (error) {
      console.error("Error fetching entradas:", error);
    }
  };

  // Cargar entradas al montar el componente
  useEffect(() => {
    fetchEntradas();
  }, []);

  // Función para agregar una nueva entrada
  const addEntrada = async (entrada: Entrada) => {
    try {
      const response = await axios.post(
        "http://54.234.14.21:3000/api/v1/entradas",
        entrada,
      );
      setEntradas((prevEntradas) => [...prevEntradas, response.data]);
    } catch (error) {
      console.log("Error adding entrada:", error);
      throw new Error("Error adding entrada");
    }
  };

  // Función para eliminar una entrada por ID
  const removeEntrada = async (id: string) => {
    try {
      await axios.delete(`http://54.234.14.21:3000/api/v1/entradas/${id}`);
      setEntradas((prevEntradas) =>
        prevEntradas.filter((entrada) => entrada.id !== id),
      );
    } catch (error) {
      console.log("Error removing entrada:", error);
      throw new Error("Error removing entrada");
    }
  };

  // Función para actualizar una entrada existente
  const updateEntrada = async (updatedEntrada: Partial<Entrada>) => {
    const { id, ...rest } = updatedEntrada;
    try {
      const response = await axios.patch(
        `http://54.234.14.21:3000/api/v1/entradas/${id}`,
        rest,
      );
      setEntradas((prevEntradas) =>
        prevEntradas.map((entrada) =>
          entrada.id === id ? response.data : entrada,
        ),
      );
    } catch (error) {
      console.log("Error updating entrada:", error);
      throw new Error("Error updating entrada");
    }
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <EntradasContext.Provider
      value={{ entradas, addEntrada, removeEntrada, updateEntrada }}
    >
      {children}
    </EntradasContext.Provider>
  );
};

// Hook para usar el contexto de entradas
const useEntradas = (): EntradasContextProps => {
  const context = useContext(EntradasContext);
  if (!context) {
    throw new Error("useEntradas must be used within a EntradasProvider");
  }
  return context;
};

export { EntradasProvider, useEntradas };
export type { Entrada };
