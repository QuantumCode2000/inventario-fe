import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import type {
  InventarioItem,
  InventarioContextProps,
} from "./interfaceInventario";

const InventarioContext = createContext<InventarioContextProps | undefined>(
  undefined,
);

const InventarioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<InventarioItem[]>([]);

  // Función para obtener los ítems del backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://54.221.108.114:3000/api/v1/inventarios",
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Función para agregar un nuevo ítem al inventario
  const additem = async (InventarioItem: InventarioItem) => {
    try {
      console.log("Datos enviados al servidor:", InventarioItem);
      const response = await axios.post(
        "http://54.221.108.114:3000/api/v1/inventarios",
        InventarioItem,
      );
      setItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status Code:", error.response?.status);
        console.error("Headers:", error.response?.headers);
        console.error("Data:", error.response?.data);
      } else {
        console.error("Error inesperado:", error);
      }
      throw error.response?.data.message;
      //console.error("Error adding inventory item:", error);
      // throw new Error("Error adding inventory item");
    }
  };

  // Función para eliminar un ítem del inventario por `iDLamina`
  const removeitem = async (iDLamina: string) => {
    try {
      const itemToRemove = items.find(
        (InventarioItem) => InventarioItem.iDLamina === iDLamina,
      );
      if (!itemToRemove) {
        throw new Error("Item no encontrado");
      }
      await axios.delete(
        `http://54.221.108.114:3000/api/v1/inventarios/${itemToRemove.id}`,
      );
      setItems((prevItems) =>
        prevItems.filter(
          (InventarioItem) => InventarioItem.iDLamina !== iDLamina,
        ),
      );
    } catch (error) {
      console.error("Error removing inventory item:", error);
      throw new Error("Error removing inventory item");
    }
  };

  // Función para actualizar un ítem del inventario
  const updateitem = async (updatedItem: Partial<InventarioItem>) => {
    const { id, ...rest } = updatedItem;
    try {
      const response = await axios.patch(
        `http://54.221.108.114:3000/api/v1/inventarios/${id}`,
        rest,
      );
      setItems((prevItems) =>
        prevItems.map((InventarioItem) =>
          InventarioItem.id === id ? response.data : InventarioItem,
        ),
      );
    } catch (error) {
      console.error("Error updating inventory item:", error);
      throw new Error("Error updating inventory item");
    }
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <InventarioContext.Provider
      value={{ Items: items, additem, removeitem, updateitem }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

// Hook para usar el contexto de inventario
const useInventario = (): InventarioContextProps => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error(
      "useInventario debe ser usado dentro de un InventarioProvider",
    );
  }
  return context;
};

export { InventarioProvider, useInventario };
