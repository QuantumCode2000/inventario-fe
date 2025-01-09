import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import {
  departamentos,
} from "../../data/selectOptions";
import { User } from "../../contexts/UsersContext/interfaces";

const roles = ["Administrador", "Encargado", "Personal"];
const estados = ["Activo", "Inactivo"];
const inSystemPermissions = ["Sí", "No"];

interface FormPersonalEditProps {
  formData: User;
  handleChangeEdit: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
  handlePasswordChange: (newPassword: string) => void;
  formDataEdit: User;
}

const FormPersonalEdit: React.FC<FormPersonalEditProps> = ({
  formData,
  formDataEdit,
  handleChangeEdit,
  handleSubmit,
  setModifiedData,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<User>>({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noChangesError, setNoChangesError] = useState<string | null>(null); // Para manejar errores de no cambios

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

    if (showPasswordFields) {
      if (!password) newErrors.password = "Nueva contraseña es requerida";
      if (!confirmPassword)
        newErrors.confirmPassword = "Confirmar contraseña es requerido";
      if (password !== confirmPassword)
        newErrors.passwordMismatch = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    const modifiedFields = getModifiedFields(formData, formDataEdit);

    if (Object.keys(errors).length === 0) {
      if (Object.keys(modifiedFields).length === 0 && !showPasswordFields) {
        // Si no hay cambios y no se está modificando la contraseña
        setNoChangesError("No se ha modificado ningún campo.");
      } else {
        setConfirmModalOpen(true);
        setNoChangesError(null);
        setModifiedData(
          password !== ""
            ? {
                password,
                ...modifiedFields,
                id: formDataEdit.id,
              }
            : {
                ...modifiedFields,
                id: formDataEdit.id,
              },
        );
      }
    } else {
      setLocalErrors(errors);
    }
  };

  function getModifiedFields(obj1, obj2) {
    const modifiedFields = {};

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (obj2[key] !== obj1[key]) {
          modifiedFields[key] = obj2[key];
        }
      }
    }

    return modifiedFields;
  }

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
        {/* Mostrar mensaje de error si no se realizaron cambios */}
        {noChangesError && (
          <div className="col-span-1 md:col-span-2 text-red-500 mb-4">
            {noChangesError}
          </div>
        )}

        {/* Los campos de información personal */}
        <Input
          id="ci"
          label="CI"
          placeholder="Cédula de Identidad"
          value={formDataEdit.ci}
          onChange={handleChangeEdit}
          error={localErrors.ci}
        />
        <Select
          id="extension"
          label="Extensión"
          options={departamentos}
          value={formDataEdit.extension}
          onChange={handleChangeEdit}
          error={localErrors.extension}
        />
        <Input
          id="correo"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={formDataEdit.email}
          onChange={handleChangeEdit}
          error={localErrors.email}
        />

       
        <Input
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={formDataEdit.nombre}
          onChange={handleChangeEdit}
          error={localErrors.nombre}
        />
        <Input
          id="apellidoPaterno"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          value={formDataEdit.apellidoPaterno}
          onChange={handleChangeEdit}
          error={localErrors.apellidoPaterno}
        />
        <Input
          id="apellidoMaterno"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          value={formDataEdit.apellidoMaterno}
          onChange={handleChangeEdit}
          error={localErrors.apellidoMaterno}
        />
        <Select
          id="inSystemPermissions"
          label="Permiso en Sistema"
          options={inSystemPermissions}
          value={formDataEdit.inSystemPermissions}
          onChange={handleChangeEdit}
        />
        <Select
          id="rol"
          label="Rol"
          options={roles}
          value={formDataEdit.rol}
          onChange={handleChangeEdit}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formDataEdit.estado}
          onChange={handleChangeEdit}
        />

        {/* Botón para mostrar/ocultar los campos de contraseña */}
        <div className="flex justify-end col-span-1 md:col-span-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
          >
            {showPasswordFields ? "Cancelar" : "Modificar Contraseña"}
          </button>
        </div>

        {/* Campos para cambiar la contraseña */}
        {showPasswordFields && (
          <>
            <Input
              id="password"
              label="Nueva Contraseña"
              placeholder="Nueva Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={localErrors.password}
            />
            <Input
              id="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={localErrors.confirmPassword}
            />
            {localErrors.passwordMismatch && (
              <p className="text-red-500 col-span-1 md:col-span-2">
                {localErrors.passwordMismatch}
              </p>
            )}
          </>
        )}

        {/* Botón para enviar el formulario */}
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      {isConfirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea actualizar esta información?</p>
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

export default FormPersonalEdit;
