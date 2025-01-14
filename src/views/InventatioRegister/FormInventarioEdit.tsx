import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";
import { getModifiedFields } from "../../services/getModifiedFields";
interface FormInventarioEditProps {
  formData: InventarioItem;
  formDataEdit: InventarioItem;
  handleChangeEdit: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
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
  const [noChangesError, setNoChangesError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<InventarioItem> = {};
    if (!formData.descripcion)
      newErrors.descripcion = "Descripción es requerida";
    if (!formData.cantidad) newErrors.cantidad = 0;
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
        {noChangesError && (
          <div className="col-span-1 md:col-span-2 text-red-500 mb-4">
            {noChangesError}
          </div>
        )}

        <Input
          type="number"
          id="cantidad"
          label="Cantidad Disponible"
          placeholder="Ingrese la cantidad disponible"
          value={formDataEdit.cantidad}
          onChange={handleChangeEdit}
          error={localErrors.cantidad}
        />
        <Input
          id="descripcion"
          label="Descripcion"
          placeholder="Ingrese el espesor"
          value={formDataEdit.descripcion}
          onChange={handleChangeEdit}
          error={localErrors.descripcion}
        />

        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>

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
