import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import type { Pedido } from "../../contexts/PedidoContext/interfacePedido";
import { parse } from "date-fns";

interface FormPedidoEditProps {
  formData: Pedido; // Datos actuales del pedido (estado original)
  formDataEdit: Pedido; // Datos actualizados en el formulario
  setModifiedData: React.Dispatch<React.SetStateAction<Partial<Pedido>>>;
  handleChangeEdit: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: () => void;
}

const FormPedidoEdit: React.FC<FormPedidoEditProps> = ({
  formData,
  formDataEdit,
  setModifiedData,
  handleChangeEdit,
  handleSubmit,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    handleChangeEdit(e); // Actualiza los datos del formulario
    setModifiedData((prev) => ({ ...prev, [id]: value })); // Marca los datos modificados
  };

  return (
    <form className="space-y-4">
      {/* Cliente */}
      <Input
        id="cliente"
        label="Cliente"
        value={formDataEdit.cliente}
        onChange={handleInputChange}
        placeholder="Nombre del cliente"
        type="text"
        required
      />

      {/* Descripción */}
      <Input
        id="descripcion"
        label="Descripción"
        value={formDataEdit.descripcion}
        onChange={handleInputChange}
        placeholder="Descripción del pedido"
        type="text"
        required
      />

      {/* Fecha */}
      <Input
        id="fecha"
        label="Fecha"
        value={formDataEdit.fecha}
        onChange={handleInputChange}
        placeholder="Fecha del pedido"
        type="date"
        required
      />

      {/* Estado */}
      <Select
        id="estado"
        label="Estado"
        value={formDataEdit.estado}
        onChange={handleInputChange}
        options={[
          { value: "Pendiente", label: "Pendiente" },
          { value: "Completado", label: "Completado" },
          { value: "Cancelado", label: "Cancelado" },
        ]}
        required
      />

      {/* Lista de cortes */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Cortes</label>
        <ul className="space-y-2">
          {formDataEdit.cortes.map((corte, index) => (
            <li key={index} className="flex space-x-4">
              <Input
                id={`cortes[${index}].ancho`}
                label="Ancho"
                value={corte.ancho}
                onChange={(e) => {
                  const updatedCortes = [...formDataEdit.cortes];
                  updatedCortes[index] = {
                    ...updatedCortes[index],
                    ancho: e.target.value,
                  };
                  setModifiedData((prev) => ({ ...prev, cortes: updatedCortes }));
                }}
                placeholder="Ancho"
                type="number"
              />
              <Input
                id={`cortes[${index}].largo`}
                label="Largo"
                value={corte.longitud}
                onChange={(e) => {
                  const updatedCortes = [...formDataEdit.cortes];
                  updatedCortes[index] = {
                    ...updatedCortes[index],
                    longitud: (e.target.value),
                  };
                  setModifiedData((prev) => ({ ...prev, cortes: updatedCortes }));
                }}
                placeholder="Largo"
                type="number"
              />
              <Input
                id={`cortes[${index}].cantidad`}
                label="Cantidad"
                value={corte.cantidad}
                onChange={(e) => {
                  const updatedCortes = [...formDataEdit.cortes];
                  updatedCortes[index] = {
                    ...updatedCortes[index],
                    cantidad: parseInt(e.target.value),
                  };
                  setModifiedData((prev) => ({ ...prev, cortes: updatedCortes }));
                }}
                placeholder="Cantidad"
                type="number"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Botón de enviar */}
      <div className="flex justify-end">
        <Button
        textStyle={"bg-blue-600 hover:bg-blue-700"}
          text="Guardar Cambios"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default FormPedidoEdit;
