interface InventarioItem {
  id?: string;
  item: string;
  codigo: string;
  cantidad: number;
  localizacion: string;
  ubicacion?: string;
  descripcion?: string;
  unidadMedida: string;

  [key: string]: string | number | boolean | undefined;
}

interface Item {
  nombre: string;
  descripcion: string;
  codigo: string;
  categoria: string;
  observaciones: string;
  unidadMedida: string;

  [key: string]: string | number | boolean | undefined;
}
interface InventarioContextProps {
  Items: InventarioItem[];
  additem: (item: Item) => void;
  updateitem: (InventarioItem: InventarioItem) => void;
  removeitem: (iDLamina: string) => void;
}
export type { InventarioItem, InventarioContextProps, Item };
