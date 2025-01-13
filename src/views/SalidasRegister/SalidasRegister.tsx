import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useSalidas } from "../../contexts/SalidasContext/SalidasContext";
import Modal from "../../components/Modal/Modal";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { Salida } from "../../contexts/SalidasContext/interfaces";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import FormSalidasRegister from "./FormSalidasRegister";
import { headersSalidas } from "../../data/headersSalidas";

const firstState: Salida = {
  item: "",
  codigo: "",
  cantidad: 0,
  observaciones: "",
  sacadoPor: "",
  motivo: "",
  destino: "",
  entregadoPor: "",
};

const SalidasRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Salida>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<Salida>(firstState);
  const [selectedItem, setSelectedItem] = useState<Salida | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { salidas, addSalida, updateSalida } = useSalidas();
  const [modifiedData, setModifiedData] = useState<Partial<Salida>>({});

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
    const salidaSeleccionada = salidas.find(
      (salida: Salida) => salida.id === id,
    );
    if (salidaSeleccionada) {
      setSelectedItem(salidaSeleccionada);
      setViewMoreOpen(true);
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
    console.log("Datos enviados al servidor:", formData);
    try {
      if (isEdit) {
        await updateSalida(modifiedData as Salida);
      } else {
        formData.cantidad = parseInt(formData.cantidad.toString());
        await addSalida(formData);
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

  const renderCell = (salida: Salida, key: keyof Salida) => {
    return salida[key];
  };

  return (
    <>
      <Content>
        <Table
          header={{
            ...headersSalidas.tabla,
            acciones: "Acciones",
          }}
          body={salidas}
          renderCell={(salida: Salida, key: keyof Salida | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(salida, key as keyof Salida)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(salida.id)}
                    textTooltip={"Ver más"}
                  />
                  {/* Puedes habilitar la edición si es necesario */}
                  {/* <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(salida.id)}
                    textTooltip={"Editar"}
                  /> */}
                </div>
              )}
            </div>
          )}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button text={"Registrar Salida"} onClick={openModal} textStyle={""} />
      </div>
      <Modal
        title={isEdit ? "Editar Salida" : "Registrar Salida"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>}
        {isEdit ? null : (
          <FormSalidasRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
      {selectedItem && (
        <Modal
          title="Detalles de la Salida"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersSalidas.verMas} data={selectedItem} />
        </Modal>
      )}
    </>
  );
};

export default SalidasRegister;
