import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import type { User, UsersContextProps } from "./interfaces";

// Creación del contexto de usuarios
const UsersContext = createContext<UsersContextProps | undefined>(undefined);

// Proveedor del contexto de usuarios
const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para los usuarios
  const [users, setUsers] = useState<User[]>([]);

  // Función para obtener todos los usuarios del backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un nuevo usuario
  const addUser = async (user: User) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/usuarios",
        user,
      );
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Error adding user");
    }
  };

  // Función para eliminar un usuario por CI
  const removeUser = async (ci: string) => {
    try {
      const userToRemove = users.find((user) => user.ci === ci);
      if (!userToRemove) {
        throw new Error("User not found");
      }
      await axios.delete(
        `http://localhost:3000/api/v1/usuarios/${userToRemove.id}`,
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.ci !== ci));
    } catch (error) {
      console.error("Error removing user:", error);
      throw new Error("Error removing user");
    }
  };

  // Función para actualizar un usuario existente
  const updateUser = async (updatedUser: Partial<User>) => {
    const { id, ...rest } = updatedUser;
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/usuarios/${id}`,
        rest,
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data : user)),
      );
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user");
    }
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook para usar el contexto de usuarios
const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
export type { User };
