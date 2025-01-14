export interface User {
  ci: string;
  extension: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  password: string;
  cargo: string;
  rol: string;
  estado: string;

  // Index signature añadida
  [key: string]: string | number | boolean | undefined;
}

export interface UsersContextProps {
  users: User[];
  addUser: (user: User) => Promise<void>;
  removeUser: (ci: string) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}
