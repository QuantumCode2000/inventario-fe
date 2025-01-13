interface Salida {
  id: string;
  item: string;
  codigo: string;
  cantidad: number;
  observaciones?: string;
  sacadoPor: string;
  motivo: string;
  destino: string;
  entregadoPor?: string;
  createdAt: string;
  updatedAt: string;
}

interface SalidasContextProps {
  salidas: Salida[];
  addSalida: (salida: Salida) => void;
  removeSalida: (id: string) => void;
  updateSalida: (salida: Salida) => void;
}

export type { Salida, SalidasContextProps };
