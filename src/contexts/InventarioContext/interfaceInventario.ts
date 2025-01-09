interface InventarioItem {
  codigoProducto: string;
  descripcion: string;
  categoria: string;
  cantidadDisponible: string;
  precioUnitario: string;
  estado: string;
  registradoPor: string;
  chofer: string;
  camion: string;
  nroNotaRemision: string;
  detalle: string;
}
interface InventarioContextProps {
  Items: InventarioItem[];
  additem: (InventarioItem: InventarioItem) => void;
  updateitem: (InventarioItem: InventarioItem) => void;
  removeitem: (iDLamina: string) => void;
}
export type { InventarioItem, InventarioContextProps };
