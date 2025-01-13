import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";

// import { headersInventario } from "../../data/headersInventatio";
import { useEntradas } from "../../contexts/EntradasContext/EntradasContext";
import { headersEntradas } from "../../data/headersEntradas";
import Modal from "../../components/Modal/Modal";
// import FormInventarioRegister from "./FormInventarioRegister";
// import FormInventarioEdit from "./FormInventarioEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { Entrada } from "../../contexts/EntradasContext/interfaces";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
// import { parseFecha } from "../../services/parseFecha";
import { FaCheckCircle } from "react-icons/fa";
import FormEntradasRegister from "./FormEntradasRegister";

// @ts-expect-error
const firstState: Entrada = {
  item: "",
  codigo: "",
  cantidad: 0,
  observaciones: "",
  registradoPor: "",
  abastecidoPor: "",
  vehiculoEntrega: "No Asignad",
  chofer: "No Asignado",
  nroRemision: "",
  motivo: "",
  unidadMedida: "",
  tipoEntrada: "abastecimiento",
};

const EntradasRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Entrada>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<Entrada>(firstState);
  const [selectedItem, setSelectedItem] = useState<Entrada | null>(null);
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const { entradas, addEntrada, updateEntrada } = useEntradas();
  const [modifiedData, setModifiedData] = useState<Partial<Entrada>>({});

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
    const entradaSeleccionada = entradas.find(
      (entrada: Entrada) => entrada.id === id,
    );
    if (entradaSeleccionada) {
      setSelectedItem(entradaSeleccionada);
      setViewMoreOpen(true);
    }
  };

  // const handleChangeEdit = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { id, value } = e.target;
  //   setFormDataEdit((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  // const handleEdit = (id: string) => {
  //   const InventarioItem = Items.find(
  //     (InventarioItem) => InventarioItem.id === id,
  //   );
  //   if (InventarioItem) {
  //     setFormData(InventarioItem);
  //     setFormDataEdit(InventarioItem);
  //     setIsEdit(true);
  //     setOpenModal(true);
  //   }
  // };

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
        await updateEntrada(modifiedData as Entrada);
      } else {
        console.log("erroror ");
        formData.cantidad = parseInt(formData.cantidad.toString());

        await addEntrada(formData);
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

  const renderCell = (Entrada: Entrada, key: keyof Entrada) => {
    switch (key) {
      // case "createdAt":
      //   return parseFecha(InventarioItem[key]);

      default:
        return Entrada[key];
    }
  };

  return (
    <>
      <Content>
        <Table
          header={{
            ...headersEntradas.tabla,
            acciones: "Acciones",
          }}
          body={entradas}
          renderCell={(Entrada: Entrada, key: keyof Entrada | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(Entrada, key as keyof Entrada)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(Entrada.id)}
                    textTooltip={"Ver más"}
                  />
                  {/* <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(Entrada.id)}
                    textTooltip={"Editar"}
                  /> */}
                </div>
              )}
            </div>
          )}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button text={"Registrar Entrada"} onClick={openModal} textStyle={""} />
      </div>
      <Modal
        title={isEdit ? "Editar Entrada" : "Registrar Entrada"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        {isEdit ? null : (
          <FormEntradasRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
      {selectedItem && (
        <Modal
          title="Detalles del Inventario"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersEntradas.verMas} data={selectedItem} />
        </Modal>
      )}
    </>
  );
};

export default EntradasRegister;
