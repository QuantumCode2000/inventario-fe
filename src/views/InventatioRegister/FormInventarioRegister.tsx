import React, { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";
import { jwtDecode } from "jwt-decode";

// Opciones de estado para el producto
const estados = ["disponible", "No disponible"];

interface FormInventarioRegisterProps {
  formData: InventarioItem;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<InventarioItem>>({});

  const token = localStorage.getItem("token");
  const currentUserName = jwtDecode(token as string).nombre;
  console.log(currentUserName);

  useEffect(() => {
    formData.registradoPor = currentUserName;
  }, [formData]);

  const validateForm = () => {
    const newErrors: Partial<InventarioItem> = {};

    if (!formData.codigoProducto)
      newErrors.codigoProducto = "Código de producto es requerido";
    if (!formData.descripcion)
      newErrors.descripcion = "Descripción del producto es requerida";
    if (!formData.categoria)
      newErrors.categoria = "Categoría del producto es requerida";
    if (!formData.cantidadDisponible)
      newErrors.cantidadDisponible = "Cantidad disponible es requerida";
    if (!formData.precioUnitario)
      newErrors.precioUnitario = "Precio unitario es requerido";
    if (!formData.estado) newErrors.estado = "Estado del producto es requerido";
    if (!formData.registradoPor)
      newErrors.registradoPor = "Registrado por es requerido";
    if (!formData.nroNotaRemision)
      newErrors.nroNotaRemision = "Número de nota de remisión es requerido";
    if (!formData.detalle || formData.detalle.length < 1)
      newErrors.detalle =
        "Detalles adicionales sobre el producto son requeridos";

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
          id="codigoProducto"
          label="Código de Producto"
          placeholder="Ingrese el código del producto"
          value={formData.codigoProducto}
          onChange={handleChange}
          error={localErrors.codigoProducto}
        />
        <Input
          id="descripcion"
          label="Descripción del Producto"
          placeholder="Ingrese la descripción del producto"
          value={formData.descripcion}
          onChange={handleChange}
          error={localErrors.descripcion}
        />
        <Input
          id="categoria"
          label="Categoría del Producto"
          placeholder="Ingrese la categoría del producto"
          value={formData.categoria}
          onChange={handleChange}
          error={localErrors.categoria}
        />
        <Input
          id="cantidadDisponible"
          label="Cantidad Disponible"
          placeholder="Ingrese la cantidad disponible"
          value={formData.cantidadDisponible}
          onChange={handleChange}
          error={localErrors.cantidadDisponible}
          type="number"
        />
        <Input
          id="precioUnitario"
          label="Precio Unitario"
          placeholder="Ingrese el precio unitario"
          value={formData.precioUnitario}
          onChange={handleChange}
          error={localErrors.precioUnitario}
          type="number"
        />
        <Input
          id="estado"
          label="Estado"
          placeholder="Ingrese el estado del producto"
          value={formData.estado}
          onChange={handleChange}
          error={localErrors.estado}
        />

        {/* Campo "Registrado Por", deshabilitado */}
        <Input
          id="registradoPor"
          label="Registrado Por"
          value={formData.registradoPor}
          disabled={true}
        />

        <Input
          id="nroNotaRemision"
          label="Número de Nota de Remisión"
          placeholder="Ingrese el número de la nota de remisión"
          value={formData.nroNotaRemision}
          onChange={handleChange}
          error={localErrors.nroNotaRemision}
        />

        <Input
          id="detalle"
          label="Detalles Adicionales"
          placeholder="Ingrese detalles adicionales sobre el producto"
          value={formData.detalle}
          onChange={handleChange}
          error={localErrors.detalle}
        />

        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
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
          <p>¿Está seguro de que desea registrar este producto?</p>
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

export default FormInventarioRegister;
