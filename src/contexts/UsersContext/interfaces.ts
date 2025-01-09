interface User {
  id?: string;
  ci: string;
  extension: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  inSystemPermissions: string;
  rol: string;
  estado: string;
  password: string;
}

interface UsersContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (ci: string) => void;
  updateUser: (user: User) => void;
}

export type { User, UsersContextProps };
