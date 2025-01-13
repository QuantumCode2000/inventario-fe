import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  rol: string;
  nombre: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        return {
          email: decoded.email,
          rol: decoded.rol,
          nombre: decoded.nombre,
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://54.234.14.21:3000/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        const { token } = response.data.data;

        const decoded = jwtDecode<User>(token);

        setIsAuthenticated(true);
        setUser({
          email: decoded.email,
          rol: decoded.rol,
          nombre: decoded.nombre,
        });

        localStorage.setItem("token", token);
        return true;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during login:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
// eslint-disable-next-line react-refresh/only-export-components
export { useAuthContext };
