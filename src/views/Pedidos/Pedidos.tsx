import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { usePedidos } from "../../contexts/PedidoContext/PedidoContext";
import { headersPedidos } from "../../data/headersPedidos";
import Modal from "../../components/Modal/Modal";
import PedidosRegister from "./PedidosRegister";
import FormPedidoEdit from "./FormPedidoEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { Pedido } from "../../contexts/PedidoContext/interfacePedido";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";

const firstState: Pedido = {
  clienteNombre: "",
  descripcion: "",
  inventarioId: "",
  fechaCreacion: "",
  cortes: [],
};

const Pedidos: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Pedido>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<Pedido>(firstState);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pedidos, addPedido, removePedido, updatePedido } = usePedidos();
  const [modifiedData, setModifiedData] = useState<Partial<Pedido>>({});

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedPedido(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstState);
  };

  const handleViewMore = (inventarioId: string) => {
    const pedido = pedidos.find((pedido: Pedido) => pedido.inventarioId === inventarioId);
    if (pedido) {
      setSelectedPedido(pedido);
      setViewMoreOpen(true);
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = (inventarioId: string) => {
    const pedido = pedidos.find((pedido: Pedido) => pedido.inventarioId === inventarioId);
    if (pedido) {
      setFormData(pedido);
      setFormDataEdit(pedido);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updatePedido(modifiedData);
      } else {
        await addPedido(formData);
      }
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const renderCell = (item: Pedido, key: keyof Pedido) => {
    if (key === "cortes" && Array.isArray(item[key])) {
      return (
        <ul>
          {item[key].map((corte, index) => (
            <li key={index}>
              Longitud: {corte.longitud}, Ancho: {corte.ancho}, Cantidad: {corte.cantidad}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{item[key]}</span>;
  };

  return (
    <>
      <Content>
        <Table
          header={{ ...headersPedidos.tabla, acciones: "Acciones" }}
          body={pedidos}
          renderCell={(item: Pedido, key: keyof Pedido | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(item, key as keyof Pedido)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(item.inventarioId)}
                    textTooltip={"Ver más"}
                  />
                  <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(item.inventarioId)}
                    textTooltip={"Editar"}
                  />
                </div>
              )}
            </div>
          )}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button 
        text={"Registrar Pedido"} 
        onClick={openModal} 
        textStyle={"" } 
        />
      </div>
      <Modal
        title={isEdit ? "Editar Pedido" : "Registrar Pedido"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>}
        {isEdit ? (
          <FormPedidoEdit
            formData={formData}
            formDataEdit={formDataEdit}
            setModifiedData={setModifiedData}
            handleChangeEdit={handleChangeEdit}
            handleSubmit={handleSubmit}
          />
        ) : (
          <PedidosRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
      {selectedPedido && (
        <Modal
          title="Detalles del Pedido"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersPedidos.verMas} data={selectedPedido} />
        </Modal>
      )}
    </>
  );
};

export default Pedidos;
