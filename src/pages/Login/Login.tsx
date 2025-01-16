import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import Fondo from "../../assets/images/fondo_login2.svg";
import Logo from "../../assets/images/logo_principal.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useAuthContext(); // Accede al contexto de autenticación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const success = await login(email, password); // Llamada al login desde el contexto
    if (success) {
      setSuccessMessage("Inicio de sesión exitoso.");
      setTimeout(() => {
        window.location.href = "/"; // Redirige a la página principal
      }, 2000);
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Fondo})` }}
      className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center items-center overflow-hidden py-6 sm:py-12 bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative py-3 sm:w-96 w-full mx-auto bg-opacity-90 bg-[#A1A4A6] shadow-lg rounded-lg text-left transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="flex justify-center mt-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-48 h-48 object-contain fill-[#212937]"
          />
        </div>
        <div className="mt-4 px-8 ">
          <span className="text-2xl block text-center mb-4 font-bold tracking-wide ">
            <span className="italic ">
              Cooperativa Minera Aurifera "Yani R.L."
            </span>
          </span>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleLogin} autoComplete="off">
            <label className="block font-semibold">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Correo"
              className="border w-full h-12 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-[#363a40] focus:ring-1 rounded-md"
              autoComplete="off"
            />
            <label className="block mt-3 font-semibold">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Contraseña"
                className="border w-full h-12 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-[#363a40] focus:ring-1 rounded-md"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 mt-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex justify-between items-baseline mt-4">
              <button
                type="submit"
                className="bg-[#363a40] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 ease-in-out"
              >
                Ingresar
              </button>
              {/* <a href="#" className="text-sm hover:underline">
                ¿Olvidaste la contraseña?
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
