import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";

interface FormInventarioEditProps {
  formData: InventarioItem;
  formDataEdit: InventarioItem;
  handleChangeEdit: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
  setModifiedData: (modifiedData: Partial<InventarioItem>) => void;
}

const FormInventarioEdit: React.FC<FormInventarioEditProps> = ({
  formData,
  formDataEdit,
  handleChangeEdit,
  handleSubmit,
  setModifiedData,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<InventarioItem>>({});
  const [noChangesError, setNoChangesError] = useState<string | null>(null); // Para manejar errores de no cambios

  const validateForm = () => {
    const newErrors: Partial<InventarioItem> = {};
    if (!formData.iDLamina) newErrors.iDLamina = "ID de lámina es requerido";
    if (!formData.tipoLamina) newErrors.tipoLamina = "Tipo de lámina es requerido";
    if (!formData.dimensionesLamina)
      newErrors.dimensionesLamina = "Dimensiones de la lámina son requeridas";
    if (!formData.cantidadDisponible)
      newErrors.cantidadDisponible = "Cantidad disponible es requerida";
    if (!formData.espesor) newErrors.espesor = "Espesor es requerido";
    if (!formData.color) newErrors.color = "Color es requerido";
    if (!formData.fechaIngreso) newErrors.fechaIngreso = "Fecha de ingreso es requerida";
    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    const modifiedFields = getModifiedFields(formData, formDataEdit);

    if (Object.keys(errors).length === 0) {
      if (Object.keys(modifiedFields).length === 0) {
        // Si no hay cambios
        setNoChangesError("No se ha modificado ningún campo.");
      } else {
        setConfirmModalOpen(true);
        setNoChangesError(null);
        setModifiedData({
          ...modifiedFields,
          id: formDataEdit.id,
        });
      }
    } else {
      setLocalErrors(errors);
    }
  };

  const getModifiedFields = (obj1: InventarioItem, obj2: InventarioItem) => {
    const modifiedFields: Partial<InventarioItem> = {};
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && obj2[key] !== obj1[key]) {
        modifiedFields[key] = obj2[key];
      }
    }
    return modifiedFields;
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
      <form onSubmit={handleConfirm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mostrar mensaje de error si no se realizaron cambios */}
        {noChangesError && (
          <div className="col-span-1 md:col-span-2 text-red-500 mb-4">
            {noChangesError}
          </div>
        )}

        {/* Campos de inventario */}
        <Input
          id="iDLamina"
          label="ID Lámina"
          placeholder="Ingrese el ID de la lámina"
          value={formData.iDLamina}
          onChange={handleChangeEdit}
          error={localErrors.iDLamina}
        />
        <Input
          id="tipoLamina"
          label="Tipo de Lámina"
          placeholder="Ingrese el tipo de lámina"
          value={formData.tipoLamina}
          onChange={handleChangeEdit}
          error={localErrors.tipoLamina}
        />
        <Input
          id="dimensionesLamina"
          label="Dimensiones de la Lámina"
          placeholder="Ingrese las dimensiones de la lámina"
          value={formData.dimensionesLamina}
          onChange={handleChangeEdit}
          error={localErrors.dimensionesLamina}
        />
        <Input
          id="cantidadDisponible"
          label="Cantidad Disponible"
          placeholder="Ingrese la cantidad disponible"
          value={formData.cantidadDisponible}
          onChange={handleChangeEdit}
          error={localErrors.cantidadDisponible}
        />
        <Input
          id="espesor"
          label="Espesor"
          placeholder="Ingrese el espesor"
          value={formData.espesor}
          onChange={handleChangeEdit}
          error={localErrors.espesor}
        />
        <Input
          id="color"
          label="Color"
          placeholder="Ingrese el color"
          value={formData.color}
          onChange={handleChangeEdit}
          error={localErrors.color}
        />
        <Input
          id="fechaIngreso"
          label="Fecha de Ingreso"
          placeholder="Ingrese la fecha de ingreso"
          value={formData.fechaIngreso}
          onChange={handleChangeEdit}
          error={localErrors.fechaIngreso}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChangeEdit}
        />

        {/* Botón para enviar */}
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
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

export default FormInventarioEdit;
