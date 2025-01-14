import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useInventario } from "../../contexts/InventarioContext/InventarioContext";
import { headersInventario } from "../../data/headersInventatio";
import Modal from "../../components/Modal/Modal";
import FormInventarioRegister from "./FormInventarioRegister";
import FormInventarioEdit from "./FormInventarioEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type {
  InventarioItem,
  Item,
} from "../../contexts/InventarioContext/interfaceInventario";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import axios from "axios";

const initialStateItem: Item = {
  nombre: "",
  descripcion: "",
  codigo: "",
  categoria: "",
  observaciones: "",
  unidadMedida: "",
};

const firstStateInvetario: InventarioItem = {
  item: "",
  codigo: "",
  cantidad: 0,
  localizacion: "",
  ubicacion: "",
  descripcion: "",
  unidadMedida: "",
};

const InventarioRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [newItemData, setNewItemData] = useState<Item>(initialStateItem);
  const [formData, setFormData] = useState<InventarioItem>(firstStateInvetario);

  const [formDataEdit, setFormDataEdit] =
    useState<InventarioItem>(firstStateInvetario);
  const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const { Items, additem, updateitem } = useInventario();
  const [modifiedData, setModifiedData] = useState<Partial<InventarioItem>>({});
  const [items, setItems] = useState<InventarioItem[]>([]);
  const { Item } = useInventario();

  const generateCode = () => {
    const codeTag = "ITEM";
    const currentQuantity = Items.length + 1;
    const code = `${codeTag}${currentQuantity}`;
    return code;
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/inventarios",
      );
      setItems(response.data);
      console.log("Items de inventario", response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstStateInvetario);
    setNewItemData(initialStateItem);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedItem(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstStateInvetario);
    setNewItemData(initialStateItem);
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
    setNewItemData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateitem(modifiedData as InventarioItem);
        fetchItems();
      } else {
        console.log("erroror ");
        await additem(newItemData);
        fetchItems();
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
          body={items}
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
        {/* <Button text={"Registrar Item"} onClick={openModal} textStyle={""} /> */}
        <Button text={"Registrar Item"} onClick={openModal} textStyle={""} />
      </div>
      <Modal
        title={isEdit ? "Editar Inventario" : "Registrar Items"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        {isEdit ? (
          <FormInventarioEdit
            formData={formData}
            formDataEdit={formDataEdit}
            setModifiedData={setModifiedData}
            handleChangeEdit={handleChangeEdit}
            handleSubmit={handleSubmit}
          />
        ) : (
          <FormInventarioRegister
            formData={
              {
                ...newItemData,
                codigo: generateCode(),
              } as Item
            }
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
          <ViewMore titles={headersInventario.verMas} data={selectedItem} />
        </Modal>
      )}
    </>
  );
};

export default InventarioRegister;
