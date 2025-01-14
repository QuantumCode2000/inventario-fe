// import React, { useState, useEffect } from "react";
// import Input from "../../components/Input/Input";
// import Select from "../../components/Select/Select";
// import Modal from "../../components/Modal/Modal";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// interface FormEntradasRegisterProps {
//   formData: any;
//   handleChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => void;
//   handleSubmit: () => void;
// }

// const FormEntradasRegister: React.FC<FormEntradasRegisterProps> = ({
//   formData,
//   handleChange,
//   handleSubmit,
// }) => {
//   const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [localErrors, setLocalErrors] = useState<Partial<any>>({});
//   const [tipoEntrada, setTipoEntrada] = useState("abastecimiento"); // Por defecto, tipo de entrada 'abastecimiento'
//   const [items, setItems] = useState<any[]>([]);

//   // Llamar items de la base de datos desde la ruta http://54.221.108.114:3000/api/v1/items GET
//   const getItems = async () => {
//     try {
//       const response = await axios.get("http://54.221.108.114:3000/api/v1/items");
//       setItems(response.data); // Guardamos los items completos
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   const token = localStorage.getItem("token");
//   const currentUserName = jwtDecode(token as string).nombre;

//   useEffect(() => {
//     getItems(); // Llamar a la API para obtener los items al montar el componente
//     formData.registradoPor = currentUserName;
//   }, [formData]);

//   // Maneja el cambio de item, actualiza código y unidad de medida automáticamente
//   const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedItem = items.find((item) => item.nombre === e.target.value); // Buscar el item por su nombre
//     if (selectedItem) {
//       formData.codigo = selectedItem.codigo; // Actualiza el código
//       formData.unidadMedida = selectedItem.unidadMedida; // Actualiza la unidad de medida
//     }
//     handleChange(e); // Actualiza el valor del select
//   };

//   const validateForm = () => {
//     const newErrors: Partial<any> = {};

//     if (!formData.codigo) newErrors.codigo = "Código es requerido";
//     if (!formData.item) newErrors.item = "Item es requerido";
//     if (!formData.cantidad) newErrors.cantidad = "Cantidad es requerida";
//     if (!formData.motivo) newErrors.motivo = "Motivo es requerido";
//     if (!formData.tipoEntrada)
//       newErrors.tipoEntrada = "Tipo de entrada es requerido";
//     if (!formData.registradoPor)
//       newErrors.registradoPor = "Registrado por es requerido";
//     if (tipoEntrada === "abastecimiento" && !formData.nroRemision)
//       newErrors.nroRemision = "Número de remisión es requerido"; // Solo requerido para abastecimiento
//     if (!formData.unidadMedida)
//       newErrors.unidadMedida = "Unidad de medida es requerida";

//     // Validaciones específicas según el tipo de entrada
//     if (tipoEntrada === "abastecimiento") {
//       if (!formData.abastecidoPor)
//         newErrors.abastecidoPor = "Abastecido por es requerido";
//     } else if (tipoEntrada === "devolución") {
//       if (!formData.recibidoPor)
//         newErrors.recibidoPor = "Recibido por es requerido";
//       if (!formData.entregadoPor)
//         newErrors.entregadoPor = "Entregado por es requerido";
//     }

//     return newErrors;
//   };

//   const handleConfirm = (e: React.FormEvent) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length === 0) {
//       setConfirmModalOpen(true);
//     } else {
//       setLocalErrors(errors);
//     }
//   };

//   const handleConfirmSubmit = () => {
//     setConfirmModalOpen(false);
//     handleSubmit();
//   };

//   const handleCloseModal = () => {
//     setConfirmModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <form
//         onSubmit={handleConfirm}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {/* Select de item */}
//         <Select
//           id="item"
//           label="Item"
//           options={items.map((item) => item.nombre)} // Muestra solo los nombres de los items
//           value={formData.item}
//           onChange={handleItemChange}
//           error={localErrors.item}
//         />
//         {/* Input de código (autocompletado) */}
//         <Input
//           id="codigo"
//           label="Código"
//           value={formData.codigo}
//           onChange={handleChange}
//           error={localErrors.codigo}
//           disabled // Deshabilitado ya que se completa automáticamente
//         />
//         <Input
//           id="cantidad"
//           label="Cantidad"
//           value={formData.cantidad}
//           onChange={handleChange}
//           error={localErrors.cantidad}
//           type="number"
//         />
//         <Input
//           id="observaciones"
//           label="Observaciones"
//           value={formData.observaciones}
//           onChange={handleChange}
//           error={localErrors.observaciones}
//         />
//         <Select
//           id="motivo"
//           label="Motivo"
//           options={["Reabastecimiento", "Devolución"]}
//           value={formData.motivo}
//           onChange={handleChange}
//         />
//         <Select
//           id="tipoEntrada"
//           label="Tipo de Entrada"
//           options={["abastecimiento", "devolución"]}
//           value={formData.tipoEntrada}
//           onChange={(e) => {
//             setTipoEntrada(e.target.value);
//             handleChange(e);
//           }}
//         />

//         {/* Campos adicionales dependiendo del tipo de entrada */}
//         {tipoEntrada === "abastecimiento" ? (
//           <>
//             <Input
//               id="abastecidoPor"
//               label="Abastecido Por"
//               value={formData.abastecidoPor}
//               onChange={handleChange}
//               error={localErrors.abastecidoPor}
//             />
//             <Input
//               id="nroRemision"
//               label="Número de Remisión"
//               value={formData.nroRemision}
//               onChange={handleChange}
//               error={localErrors.nroRemision}
//             />
//           </>
//         ) : (
//           <>
//             <Input
//               id="recibidoPor"
//               label="Recibido Por"
//               value={formData.recibidoPor}
//               onChange={handleChange}
//               error={localErrors.recibidoPor}
//             />
//             <Input
//               id="entregadoPor"
//               label="Entregado Por"
//               value={formData.entregadoPor}
//               onChange={handleChange}
//               error={localErrors.entregadoPor}
//             />
//           </>
//         )}

//         <Input
//           id="unidadMedida"
//           label="Unidad de Medida"
//           value={formData.unidadMedida}
//           onChange={handleChange}
//           error={localErrors.unidadMedida}
//           disabled // Deshabilitado ya que se completa automáticamente
//         />

//         <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Registrar
//           </button>
//         </div>
//       </form>

//       {isConfirmModalOpen && (
//         <Modal
//           title="Confirmación"
//           isOpen={isConfirmModalOpen}
//           onClose={handleCloseModal}
//         >
//           <p>¿Está seguro de que desea registrar esta entrada?</p>
//           <div className="flex justify-end mt-4">
//             <button
//               className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
//               onClick={handleCloseModal}
//             >
//               Cancelar
//             </button>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//               onClick={handleConfirmSubmit}
//             >
//               Confirmar
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default FormEntradasRegister;
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";

interface FormEntradasRegisterProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormEntradasRegister: React.FC<FormEntradasRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<any>>({});
  const [tipoEntrada, setTipoEntrada] = useState("abastecimiento"); // Por defecto, tipo de entrada 'abastecimiento'

  const validateForm = () => {
    const newErrors: Partial<any> = {};

    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.item) newErrors.item = "Item es requerido";
    if (!formData.cantidad) newErrors.cantidad = "Cantidad es requerida";
    if (!formData.motivo) newErrors.motivo = "Motivo es requerido";
    if (!formData.tipoEntrada)
      newErrors.tipoEntrada = "Tipo de entrada es requerido";
    if (!formData.unidadMedida)
      newErrors.unidadMedida = "Unidad de medida es requerida";

    // Validaciones específicas según el tipo de entrada
    if (tipoEntrada === "abastecimiento") {
      if (!formData.abastecidoPor)
        newErrors.abastecidoPor = "Abastecido por es requerido";
      if (!formData.nroRemision)
        newErrors.nroRemision = "Número de remisión es requerido";
    } else if (tipoEntrada === "devolución") {
      if (!formData.recibidoPor)
        newErrors.recibidoPor = "Recibido por es requerido";
      if (!formData.entregadoPor)
        newErrors.entregadoPor = "Entregado por es requerido";
    }

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
        {/* Input de item */}
        <Input
          id="item"
          label="Item"
          value={formData.item}
          onChange={handleChange}
          error={localErrors.item}
        />
        {/* Input de código */}
        <Input
          id="codigo"
          label="Código"
          value={formData.codigo}
          onChange={handleChange}
          error={localErrors.codigo}
        />
        {/* Input de cantidad */}
        <Input
          id="cantidad"
          label="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          error={localErrors.cantidad}
          type="number"
        />
        {/* Input de motivo */}
        <Input
          id="motivo"
          label="Motivo"
          value={formData.motivo}
          onChange={handleChange}
          error={localErrors.motivo}
        />
        {/* Select de tipo de entrada */}
        <Input
          id="tipoEntrada"
          label="Tipo de Entrada"
          value={formData.tipoEntrada}
          onChange={(e) => {
            setTipoEntrada(e.target.value);
            handleChange(e);
          }}
        />

        {/* Campos adicionales dependiendo del tipo de entrada */}
        {tipoEntrada === "abastecimiento" ? (
          <>
            <Input
              id="abastecidoPor"
              label="Abastecido Por"
              value={formData.abastecidoPor}
              onChange={handleChange}
              error={localErrors.abastecidoPor}
            />
            <Input
              id="nroRemision"
              label="Número de Remisión"
              value={formData.nroRemision}
              onChange={handleChange}
              error={localErrors.nroRemision}
            />
          </>
        ) : (
          <>
            <Input
              id="recibidoPor"
              label="Recibido Por"
              value={formData.recibidoPor}
              onChange={handleChange}
              error={localErrors.recibidoPor}
            />
            <Input
              id="entregadoPor"
              label="Entregado Por"
              value={formData.entregadoPor}
              onChange={handleChange}
              error={localErrors.entregadoPor}
            />
          </>
        )}

        {/* Input de unidad de medida */}
        <Input
          id="unidadMedida"
          label="Unidad de Medida"
          value={formData.unidadMedida}
          onChange={handleChange}
          error={localErrors.unidadMedida}
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
          <p>¿Está seguro de que desea registrar esta entrada?</p>
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

export default FormEntradasRegister;
