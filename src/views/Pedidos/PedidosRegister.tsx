import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePedidos } from '../../contexts/PedidoContext/PedidoContext';
import { useInventario } from '../../contexts/InventarioContext/InventarioContext';
import { Pedido, Corte } from '../../contexts/PedidoContext/interfacePedido';
import { InventarioItem } from '../../contexts/InventarioContext/interfaceInventario';
import Input from '../../components/Input/Input';
import SelectPedido from '../../components/Select/SelectPedido';
import Button from '../../components/Button/Button';

interface FormPedidosRegisterProps {
  formData: Pedido;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
}

const PedidosRegister: React.FC<FormPedidosRegisterProps> = () => {
  const navigate = useNavigate();
  const { addPedido } = usePedidos();
  const { Items } = useInventario();

  const [formData, setFormData] = useState<Pedido>({
    clienteNombre: '',
    descripcion: '',
    inventarioId: '',
    cortes: [{ longitud: '', ancho: '', cantidad: 1 }],
  });

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Pedido>>({});

  const validateForm = () => {
    const newErrors: Partial<Pedido> = {};
    if (!formData.clienteNombre) newErrors.clienteNombre = "Nombre del cliente es requerido";
    if (!formData.descripcion) newErrors.descripcion = "Descripción es requerida";
    if (!formData.inventarioId) newErrors.inventarioId = "Lámina de inventario es requerida";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCorte = () => {
    setFormData({
      ...formData,
      cortes: [...formData.cortes, { longitud: '', ancho: '', cantidad: 1 }],
    });
  };

  const handleRemoveCorte = (index: number) => {
    const newCortes = formData.cortes.filter((_, i) => i !== index);
    setFormData({ ...formData, cortes: newCortes });
  };

  const handleCorteChange = (index: number, field: string, value: string) => {
    const newCortes = [...formData.cortes];
    newCortes[index] = { ...newCortes[index], [field]: value };
    setFormData({ ...formData, cortes: newCortes });
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

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Enviar los datos del pedido al backend
      const pedidoData = {
        ...formData,
        cortes: formData.cortes.map((corte) => ({
          longitud: (corte.longitud),  // Asegurarse de que los valores sean numéricos
          ancho: (corte.ancho),        // Asegurarse de que los valores sean numéricos
          cantidad: parseInt(corte.cantidad.toString(), 10), // Convertir a número entero
        })),
      };

      await addPedido(pedidoData); // Llamar a la función que guarda el pedido
      setFormData({
        clienteNombre: '',
        descripcion: '',
        inventarioId: '',
        cortes: [{ longitud: '', ancho: '', cantidad: 1 }],
      });
      navigate('/pedidos'); // Redirigir a la página de pedidos
    } else {
      setLocalErrors(errors);
    }
  };

  return (
    <div className="pedido-register-container p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Registro Pedido de Corte de Lámina de Vidrio</h2>
      <form onSubmit={handleConfirm} className="space-y-4">
        <Input
          id="clienteNombre"
          label="Nombre del Cliente"
          name="clienteNombre"
          value={formData.clienteNombre}
          onChange={handleChange}
          required
        />
        {localErrors.clienteNombre && <div className="text-red-500">{localErrors.clienteNombre}</div>}

        <Input
          id="descripcion"
          label="Descripción"
          name="descripcion"
          type="textarea"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        {localErrors.descripcion && <div className="text-red-500">{localErrors.descripcion}</div>}

        <SelectPedido
          id="inventarioId"
          label="Seleccionar Lámina de Inventario"
          //name="inventarioId"
          value={formData.inventarioId}
          onChange={(e) => setFormData({ ...formData, inventarioId: e.target.value })}
          options={[
            { label: 'Seleccione una lámina', value: '' },
            ...Items.map((item: InventarioItem) => ({
              label: `${item.tipoLamina} - ${item.dimensionesLamina}`,
              value: item.iDLamina,
            })),
          ]}
          required
        />
        {localErrors.inventarioId && <div className="text-red-500">{localErrors.inventarioId}</div>}

        <div>
          <h3 className="text-xl font-semibold mb-2">Cortes</h3>
          {formData.cortes.map((corte, index) => (
            <div key={index} className="corte-item p-4 mb-4 border rounded-md flex items-center gap-4">
              <Input
                id={`longitud-${index}`}
                label="Longitud"
                name="longitud"
                type="number"
                value={corte.longitud}
                onChange={(e) => handleCorteChange(index, 'longitud', e.target.value)}
                required
              />
              <Input
                id={`ancho-${index}`}
                label="Ancho"
                name="ancho"
                type="number"
                value={corte.ancho.toString()}
                onChange={(e) => handleCorteChange(index, 'ancho', e.target.value)}
                required
              />
              <Input
                id={`cantidad-${index}`}
                label="Cantidad"
                name="cantidad"
                type="number"
                value={corte.cantidad.toString()}
                onChange={(e) => handleCorteChange(index, 'cantidad', e.target.value)}
                required
                min="1"
              />
              <Button
                onClick={() => handleRemoveCorte(index)}
                text="Eliminar"
                textStyle="bg-red-600 hover:bg-red-700"
              />
            </div>
          ))}
          <Button
            onClick={handleAddCorte}
            text="Agregar Corte"
            textStyle="bg-blue-600 hover:bg-blue-700"
          />
        </div>

        <Button
          onClick={handleConfirm}
          text="Registrar Pedido"
          textStyle="bg-green-600 hover:bg-green-700"
        />
      </form>

      {isConfirmModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmar Pedido</h3>
            <p>¿Estás seguro de que deseas registrar este pedido?</p>
            <Button onClick={handleConfirmSubmit} text="Confirmar" textStyle="bg-green-600 hover:bg-green-700" />
            <Button onClick={handleCloseModal} text="Cancelar" textStyle="bg-gray-600 hover:bg-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosRegister;
