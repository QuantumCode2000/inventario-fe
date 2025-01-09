// interfaces/interfacePedido.ts

interface Corte {
    //id: string; 
    longitud: string;
    ancho: string;
    cantidad: number;
  }
  
interface Pedido {
    //id: string;
    clienteNombre: string;
    descripcion: string;
    inventarioId: string;
    cortes: Corte[];
    fechaCreacion?: string;
  }

  interface PedidoContextProps {
    pedidos: Pedido[];
    setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>;
    addPedido: (pedido: Pedido) => void;
    updatePedido:(pedido: Pedido)=>void;
    removePedido: (pedidoId: string) => void;
  }
  
  export type { Pedido, Corte, PedidoContextProps };
  