import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
  import type { Pedido, PedidoContextProps } from "./interfacePedido";
  
  // Creación del contexto de pedidos
  const PedidosContext = createContext<PedidoContextProps | undefined>(undefined);
  
  // Proveedor del contexto de pedidos
  const PedidosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Estado para los pedidos
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
  
    // Función para obtener todos los pedidos del backend
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/pedidos");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error fetching pedidos:", error);
      }
    };
  
    // Cargar pedidos al montar el componente
    useEffect(() => {
      fetchPedidos();
    }, []);
  
    // Función para agregar un nuevo pedido
    const addPedido = async (pedido: Pedido) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/pedidos",
          pedido,
        );
        setPedidos((prevPedidos) => [...prevPedidos, response.data]);
      } catch (error) {
        console.error("Error adding pedido:", error);
        throw new Error("Error adding pedido");
      }
    };
  
    // Función para eliminar un pedido por ID
    const removePedido = async (id: string) => {
      try {
        const pedidoToRemove = pedidos.find((pedido) => pedido.inventarioId === id);
        if (!pedidoToRemove) {
          throw new Error("Pedido not found");
        }
        await axios.delete(`http://localhost:3000/api/v1/pedidos/${id}`);
        setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.inventarioId !== id));
      } catch (error) {
        console.error("Error removing pedido:", error);
        throw new Error("Error removing pedido");
      }
    };
  
    // Función para actualizar un pedido existente
    const updatePedido = async (updatedPedido: Partial<Pedido>) => {
      const { inventarioId: id, clienteNombre,...rest } = updatedPedido;
      if (clienteNombre === undefined) {
        throw new Error("clienteNombre is required");
      }
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/pedidos/${id}`,
          rest,
        );
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) => (pedido.inventarioId === id ? response.data : pedido)),
        );
      } catch (error) {
        console.error("Error updating pedido:", error);
        throw new Error("Error updating pedido");
      }
    };
  
    // Proveedor del contexto con el estado y funciones
    return (
      <PedidosContext.Provider value={{ pedidos,setPedidos, addPedido, removePedido, updatePedido }}>
        {children}
      </PedidosContext.Provider>
    );
  };
  
  // Hook para usar el contexto de pedidos
  const usePedidos = (): PedidoContextProps => {
    const context = useContext(PedidosContext);
    if (!context) {
      throw new Error("usePedidos must be used within a PedidosProvider");
    }
    return context;
  };
  
  export { PedidosProvider, usePedidos };
  export type { Pedido };
  