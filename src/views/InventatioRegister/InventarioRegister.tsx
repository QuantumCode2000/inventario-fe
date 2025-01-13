import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useInventario } from "../../contexts/InventarioContext/InventarioContext";
import { headersInventario } from "../../data/headersInventatio";
import Modal from "../../components/Modal/Modal";
import FormInventarioRegister from "./FormInventarioRegister";
import FormInventarioEdit from "./FormInventarioEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
// import { parseFecha } from "../../services/parseFecha";
import { FaCheckCircle } from "react-icons/fa";

const firstState: InventarioItem = {
  codigoProducto: "",
  descripcion: "",
  categoria: "",
  cantidadDisponible: "",
  precioUnitario: "",
  estado: "",
  registradoPor: "",
  chofer: "No Asignado",
  camion: "No Asignado",
  nroNotaRemision: "",
  detalle: "",
};

const InventarioRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<InventarioItem>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<InventarioItem>(firstState);
  const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const { Items, additem, updateitem } = useInventario();
  const [modifiedData, setModifiedData] = useState<Partial<InventarioItem>>({});

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedItem(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstState);
  };

  const handleViewMore = (id: string) => {
    const InventarioItem = Items.find(
      (InventarioItem) => InventarioItem.id === id,
    );
    if (InventarioItem) {
      setSelectedItem(InventarioItem);
      setViewMoreOpen(true);
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = (id: string) => {
    const InventarioItem = Items.find(
      (InventarioItem) => InventarioItem.id === id,
    );
    if (InventarioItem) {
      setFormData(InventarioItem);
      setFormDataEdit(InventarioItem);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Datos enviados al servidor:", formData); // Verifica los datos enviados
    try {
      if (isEdit) {
        await updateitem(modifiedData as InventarioItem);
      } else {
        console.log("erroror ");
        await additem(formData);
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

  const renderCell = (
    InventarioItem: InventarioItem,
    key: keyof InventarioItem,
  ) => {
    switch (key) {
      // case "createdAt":
      //   return parseFecha(InventarioItem[key]);
      case "transporte":
        return `${InventarioItem.chofer} - ${InventarioItem.camion}`;
      case "estado":
        return (
          <FaCheckCircle
            style={{
              color: InventarioItem[key] === "Disponible" ? "green" : "red",
            }}
          />
        );
      default:
        return InventarioItem[key];
    }
  };

  return (
    <>
      <Content>
        <Table
          header={{
            ...headersInventario.tabla,
            acciones: "Acciones",
            createdAt: "Fecha de Registro",
          }}
          body={Items}
          renderCell={(
            InventarioItem: InventarioItem,
            key: keyof InventarioItem | "acciones",
          ) => (
            <div>
              {key !== "acciones" &&
                renderCell(InventarioItem, key as keyof InventarioItem)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(InventarioItem.id)}
                    textTooltip={"Ver más"}
                  />
                  <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(InventarioItem.id)}
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
          text={"Obtener Documentos"}
          onClick={openModal}
          textStyle={""}
        />
      </div>
      <Modal
        title={isEdit ? "Editar Inventario" : "Obtener Documentos"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        {isEdit ? // <FormInventarioEdit
        //   formData={formData}
        //   formDataEdit={formDataEdit}
        //   setModifiedData={setModifiedData}
        //   handleChangeEdit={handleChangeEdit}
        //   handleSubmit={handleSubmit}
        // />
        null : (
          // <FormInventarioRegister
          //   formData={formData}
          //   handleChange={handleChange}
          //   handleSubmit={handleSubmit}
          // />
          <div>
            Obtencion de Documentos no disponibles Regrese cuando se tenga la
            informacion
          </div>
        )}
      </Modal>
      {selectedItem && (
        <Modal
          title="Detalles del Inventario"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersInventario.verMas} data={selectedItem} />
        </Modal>
      )}
    </>
  );
};

export default InventarioRegister;
