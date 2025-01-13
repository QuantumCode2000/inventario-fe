// Definición de enums basados en el DTO del backend
export enum RolEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum EstadoEnum {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

// Interfaz para el usuario basado en el DTO
export interface User {
  id: string; // Supongo que `id` es un campo generado en el backend
  ci: string;
  extension: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  email: string;
  password: string;
  cargo: string;
  rol: RolEnum;
  estado: EstadoEnum;
}

// Props para el contexto de usuarios
export interface UsersContextProps {
  users: User[];
  addUser: (user: User) => Promise<void>;
  removeUser: (ci: string) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}
