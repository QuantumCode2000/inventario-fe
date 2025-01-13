interface Entrada {
  id: string;
  item: string;
  codigo: string;
  cantidad: number;
  observaciones?: string;
  registradoPor?: string;
  abastecidoPor?: string;
  vehiculoEntrega?: string;
  chofer?: string;
  nroRemision?: string;
  motivo: string;
  unidadMedida?: string;
  tipoEntrada: "abastecimiento" | "devolución";
  createdAt: string;
  updatedAt: string;
}

interface EntradasContextProps {
  entradas: Entrada[];
  addEntrada: (entrada: Entrada) => void;
  removeEntrada: (id: string) => void;
  updateEntrada: (entrada: Entrada) => void;
}

export type { Entrada, EntradasContextProps };
