import React, { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

interface FormSalidasRegisterProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormSalidasRegister: React.FC<FormSalidasRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<any>>({});
  const [items, setItems] = useState<any[]>([]);

  // Llamar a los items desde la API
  const getItems = async () => {
    try {
      const response = await axios.get(
        "http://http://54.221.108.114/:3000/api/v1/inventarios",
      );
      setItems(response.data); // Guardamos los items completos
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getItems(); // Llamar a la API para obtener los items al montar el componente
  }, []);

  // Maneja el cambio de item, actualiza código y unidad de medida automáticamente
  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items.find((item) => item.item === e.target.value);
    if (selectedItem) {
      formData.codigo = selectedItem.codigo; // Actualiza el código
      formData.unidadMedida = selectedItem.unidadMedida; // Actualiza la unidad de medida
    }
    handleChange(e); // Actualiza el valor del select
  };

  const validateForm = () => {
    const newErrors: Partial<any> = {};

    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.item) newErrors.item = "Item es requerido";
    if (!formData.cantidad) newErrors.cantidad = "Cantidad es requerida";
    if (!formData.motivo) newErrors.motivo = "Motivo es requerido";
    if (!formData.sacadoPor) newErrors.sacadoPor = "Sacado por es requerido";
    if (!formData.destino) newErrors.destino = "Destino es requerido";
    if (!formData.entregadoPor)
      newErrors.entregadoPor = "Entregado por es requerido";
    if (!formData.unidadMedida)
      newErrors.unidadMedida = "Unidad de medida es requerida";

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
        {/* Select de item */}
        <Select
          id="item"
          label="Item"
          options={items.map((item) => item.item)}
          value={formData.item}
          onChange={handleItemChange}
          error={localErrors.item}
        />
        {/* Input de código (autocompletado) */}
        <Input
          id="codigo"
          label="Código"
          value={formData.codigo}
          onChange={handleChange}
          error={localErrors.codigo}
          disabled
        />
        <Input
          id="cantidad"
          label="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          error={localErrors.cantidad}
          type="number"
        />
        <Input
          id="observaciones"
          label="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          error={localErrors.observaciones}
        />
        <Input
          id="motivo"
          label="Motivo"
          value={formData.motivo}
          onChange={handleChange}
          error={localErrors.motivo}
        />
        <Input
          id="destino"
          label="Destino"
          value={formData.destino}
          onChange={handleChange}
          error={localErrors.destino}
        />
        <Input
          id="sacadoPor"
          label="Sacado Por"
          value={formData.sacadoPor}
          onChange={handleChange}
          error={localErrors.sacadoPor}
        />
        <Input
          id="entregadoPor"
          label="Entregado Por"
          value={formData.entregadoPor}
          onChange={handleChange}
          error={localErrors.entregadoPor}
        />
        {/* Input de unidad de medida (autocompletado) */}
        <Input
          id="unidadMedida"
          label="Unidad de Medida"
          value={formData.unidadMedida}
          onChange={handleChange}
          error={localErrors.unidadMedida}
          disabled
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
          <p>¿Está seguro de que desea registrar esta salida?</p>
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

export default FormSalidasRegister;
