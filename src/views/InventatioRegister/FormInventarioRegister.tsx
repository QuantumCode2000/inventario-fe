import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import type { Item } from "../../contexts/InventarioContext/interfaceInventario";

interface FormInventarioRegisterProps {
  formData: Item;
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
  const [localErrors, setLocalErrors] = useState<Partial<Item>>({});

  const validateForm = () => {
    const newErrors: Partial<Item> = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.codigo) newErrors.codigo = "El código es obligatorio.";
    if (!formData.categoria)
      newErrors.categoria = "La categoría es obligatoria.";
    if (!formData.unidadMedida)
      newErrors.unidadMedida = "La unidad de medida es obligatoria.";

    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      handleSubmit();
    } else {
      setLocalErrors(errors);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form className="grid grid-cols-1 gap-4">
        <Input
          id="nombre"
          label="Nombre del Item"
          placeholder="Ingrese el nombre del item"
          value={formData.nombre}
          onChange={handleChange}
          error={localErrors.nombre}
        />
        <Input
          id="descripcion"
          label="Descripción"
          placeholder="Ingrese la descripción"
          value={formData.descripcion || ""}
          onChange={handleChange}
          error={localErrors.descripcion}
        />
        <Input
          id="codigo"
          label="Código"
          placeholder="Ingrese el código"
          value={formData.codigo}
          onChange={handleChange}
          error={localErrors.codigo}
        />
        <Input
          type="number"
          id="cantidad"
          label="Cantidad"
          placeholder="Ingrese la cantidad inicial de este producto"
          value={formData.cantidad}
          onChange={handleChange}
          error={localErrors.cantidad}
        />

        <Input
          id="categoria"
          label="Categoría"
          placeholder="Ingrese la categoría"
          value={formData.categoria}
          onChange={handleChange}
          error={localErrors.categoria}
        />
        <Input
          id="observaciones"
          label="Observaciones"
          placeholder="Ingrese observaciones"
          value={formData.observaciones || ""}
          onChange={handleChange}
          error={localErrors.observaciones}
        />
        <Input
          id="unidadMedida"
          label="Unidad de Medida"
          placeholder="Ingrese la unidad de medida"
          value={formData.unidadMedida}
          onChange={handleChange}
          error={localErrors.unidadMedida}
        />

        <div className="flex justify-end mt-4">
          <Button text="Registrar" onClick={handleConfirm} />
        </div>
      </form>
    </div>
  );
};

export default FormInventarioRegister;
