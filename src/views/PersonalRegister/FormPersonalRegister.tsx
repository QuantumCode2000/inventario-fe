import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { User } from "../../contexts/UsersContext/interfaces";
import { departamentos } from "../../data/selectOptions";

interface FormPersonalRegisterProps {
  formData: User;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormPersonalRegister: React.FC<FormPersonalRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<User>>({});

  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!formData.ci) newErrors.ci = "CI es requerido";
    if (!formData.extension) newErrors.extension = "Extensión es requerida";
    if (!formData.email) newErrors.email = "Correo Electrónico es requerido";
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.apellidoPaterno)
      newErrors.apellidoPaterno = "Apellido Paterno es requerido";
    if (!formData.apellidoMaterno)
      newErrors.apellidoMaterno = "Apellido Materno es requerido";
    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setConfirmModalOpen(true);
    } else {
      setLocalErrors(errors);
    }
  };

  const handleConfirmSubmit = () => {
    setConfirmModalOpen(false);
    handleSubmit();
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleConfirm}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          id="ci"
          label="CI"
          placeholder="Cédula de Identidad"
          value={formData.ci}
          onChange={handleChange}
          error={localErrors.ci}
        />
        <Select
          id="extension"
          label="Extensión"
          options={departamentos}
          value={formData.extension}
          onChange={handleChange}
          error={localErrors.extension}
        />

        <Input
          id="email"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          error={localErrors.email}
        />

        <Input
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={localErrors.nombre}
        />
        <Input
          id="apellidoPaterno"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          error={localErrors.apellidoPaterno}
        />
        <Input
          id="apellidoMaterno"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          error={localErrors.apellidoMaterno}
        />
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registrar
          </button>
        </div>
      </form>

      {isConfirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea registrar esta información?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmSubmit}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FormPersonalRegister;
