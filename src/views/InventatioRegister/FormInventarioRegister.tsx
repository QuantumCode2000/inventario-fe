// // // import React, { useState, useEffect } from "react";
// // // import Input from "../../components/Input/Input";
// // // import Select from "../../components/Select/Select";
// // // import Modal from "../../components/Modal/Modal";
// // // import { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";
// // // import { jwtDecode } from "jwt-decode";

// // // // Opciones de estado para el producto
// // // const estados = ["Disponible", "No disponible"];

// // // interface FormInventarioRegisterProps {
// // //   formData: InventarioItem;
// // //   handleChange: (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
// // //   ) => void;
// // //   handleSubmit: () => void;
// // // }

// // // const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
// // //   formData,
// // //   handleChange,
// // //   handleSubmit,
// // // }) => {
// // //   const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
// // //   const [localErrors, setLocalErrors] = useState<Partial<InventarioItem>>({});

// // //   useEffect(() => {
// // //     // Obtiene el nombre del usuario del token almacenado
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       if (token) {
// // //         const decoded: { nombre: string } = jwtDecode(token);
// // //         formData.registradoPor = decoded.nombre;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error al decodificar el token:", error);
// // //     }
// // //   }, []);

// // //   // Validación del formulario
// // //   const validateForm = () => {
// // //     const newErrors: Partial<InventarioItem> = {};

// // //     if (!formData.codigoProducto)
// // //       newErrors.codigoProducto = "El código del producto es requerido";
// // //     if (!formData.descripcion)
// // //       newErrors.descripcion = "La descripción es requerida";
// // //     if (!formData.categoria) newErrors.categoria = "La categoría es requerida";
// // //     if (!formData.cantidadDisponible)
// // //       newErrors.cantidadDisponible = "La cantidad disponible es requerida";
// // //     if (!formData.precioUnitario)
// // //       newErrors.precioUnitario = "El precio unitario es requerido";
// // //     if (!formData.estado) newErrors.estado = "El estado es requerido";
// // //     if (!formData.nroNotaRemision)
// // //       newErrors.nroNotaRemision = "El número de nota de remisión es requerido";
// // //     if (!formData.detalle || formData.detalle.length < 1)
// // //       newErrors.detalle = "Los detalles adicionales son requeridos";

// // //     return newErrors;
// // //   };

// // //   // Maneja el evento de confirmación del formulario
// // //   const handleConfirm = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     const errors = validateForm();
// // //     if (Object.keys(errors).length === 0) {
// // //       setConfirmModalOpen(true);
// // //     } else {
// // //       setLocalErrors(errors);
// // //     }
// // //   };

// // //   // Maneja el envío final del formulario después de la confirmación
// // //   const handleConfirmSubmit = () => {
// // //     setConfirmModalOpen(false);
// // //     handleSubmit();
// // //   };

// // //   // Cierra el modal de confirmación
// // //   const handleCloseModal = () => {
// // //     setConfirmModalOpen(false);
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-6">
// // //       <form
// // //         onSubmit={handleConfirm}
// // //         className="grid grid-cols-1 md:grid-cols-2 gap-4"
// // //       >
// // //         <Input
// // //           id="codigoProducto"
// // //           label="Código de Producto"
// // //           placeholder="Ingrese el código del producto"
// // //           value={formData.codigoProducto}
// // //           onChange={handleChange}
// // //           error={localErrors.codigoProducto}
// // //         />
// // //         <Input
// // //           id="descripcion"
// // //           label="Descripción del Producto"
// // //           placeholder="Ingrese la descripción del producto"
// // //           value={formData.descripcion}
// // //           onChange={handleChange}
// // //           error={localErrors.descripcion}
// // //         />
// // //         <Input
// // //           id="categoria"
// // //           label="Categoría del Producto"
// // //           placeholder="Ingrese la categoría del producto"
// // //           value={formData.categoria}
// // //           onChange={handleChange}
// // //           error={localErrors.categoria}
// // //         />
// // //         <Input
// // //           id="cantidadDisponible"
// // //           label="Cantidad Disponible"
// // //           placeholder="Ingrese la cantidad disponible"
// // //           value={formData.cantidadDisponible}
// // //           onChange={handleChange}
// // //           error={localErrors.cantidadDisponible}
// // //           type="number"
// // //         />
// // //         <Input
// // //           id="precioUnitario"
// // //           label="Precio Unitario"
// // //           placeholder="Ingrese el precio unitario"
// // //           value={formData.precioUnitario}
// // //           onChange={handleChange}
// // //           error={localErrors.precioUnitario}
// // //           type="number"
// // //         />
// // //         <Select
// // //           id="estado"
// // //           label="Estado"
// // //           options={estados}
// // //           value={formData.estado}
// // //           onChange={handleChange}
// // //           error={localErrors.estado}
// // //         />

// // //         {/* Campo "Registrado Por", deshabilitado */}
// // //         <Input
// // //           id="registradoPor"
// // //           label="Registrado Por"
// // //           value={formData.registradoPor}
// // //           disabled={true}
// // //         />

// // //         <Input
// // //           id="nroNotaRemision"
// // //           label="Número de Nota de Remisión"
// // //           placeholder="Ingrese el número de la nota de remisión"
// // //           value={formData.nroNotaRemision}
// // //           onChange={handleChange}
// // //           error={localErrors.nroNotaRemision}
// // //         />

// // //         <Input
// // //           id="detalle"
// // //           label="Detalles Adicionales"
// // //           placeholder="Ingrese detalles adicionales sobre el producto"
// // //           value={formData.detalle}
// // //           onChange={handleChange}
// // //           error={localErrors.detalle}
// // //         />

// // //         <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
// // //           <button
// // //             type="submit"
// // //             className="bg-blue-500 text-white px-4 py-2 rounded"
// // //           >
// // //             Registrar
// // //           </button>
// // //         </div>
// // //       </form>

// // //       {isConfirmModalOpen && (
// // //         <Modal
// // //           title="Confirmación"
// // //           isOpen={isConfirmModalOpen}
// // //           onClose={handleCloseModal}
// // //         >
// // //           <p>¿Está seguro de que desea registrar este producto?</p>
// // //           <div className="flex justify-end mt-4">
// // //             <button
// // //               className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
// // //               onClick={handleCloseModal}
// // //             >
// // //               Cancelar
// // //             </button>
// // //             <button
// // //               className="bg-blue-500 text-white px-4 py-2 rounded"
// // //               onClick={handleConfirmSubmit}
// // //             >
// // //               Confirmar
// // //             </button>
// // //           </div>
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default FormInventarioRegister;
// // import React, { useState } from "react";
// // import Input from "../../components/Input/Input";
// // import Modal from "../../components/Modal/Modal";
// // import { CreateItemDto } from "../../contexts/InventarioContext/interfaceInventario";
// // import Button from "../../components/Button/Button";

// // interface FormInventarioRegisterProps {
// //   formData: CreateItemDto;
// //   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   handleSubmit: () => void;
// // }

// // const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
// //   formData,
// //   handleChange,
// //   handleSubmit,
// // }) => {
// //   const [localErrors, setLocalErrors] = useState<Partial<CreateItemDto>>({});

// //   const validateForm = () => {
// //     const newErrors: Partial<CreateItemDto> = {};

// //     if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
// //     if (!formData.codigo) newErrors.codigo = "El código es obligatorio.";
// //     if (!formData.categoria)
// //       newErrors.categoria = "La categoría es obligatoria.";
// //     if (!formData.unidadMedida)
// //       newErrors.unidadMedida = "La unidad de medida es obligatoria.";

// //     return newErrors;
// //   };

// //   const handleConfirm = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const errors = validateForm();
// //     if (Object.keys(errors).length === 0) {
// //       handleSubmit();
// //     } else {
// //       setLocalErrors(errors);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <form onSubmit={handleConfirm} className="grid grid-cols-1 gap-4">
// //         <Input
// //           id="nombre"
// //           label="Nombre del Item"
// //           placeholder="Ingrese el nombre del item"
// //           value={formData.nombre}
// //           onChange={handleChange}
// //           error={localErrors.nombre}
// //         />
// //         <Input
// //           id="descripcion"
// //           label="Descripción"
// //           placeholder="Ingrese la descripción"
// //           value={formData.descripcion || ""}
// //           onChange={handleChange}
// //           error={localErrors.descripcion}
// //         />
// //         <Input
// //           id="codigo"
// //           label="Código"
// //           placeholder="Ingrese el código"
// //           value={formData.codigo}
// //           onChange={handleChange}
// //           error={localErrors.codigo}
// //         />
// //         <Input
// //           id="categoria"
// //           label="Categoría"
// //           placeholder="Ingrese la categoría"
// //           value={formData.categoria}
// //           onChange={handleChange}
// //           error={localErrors.categoria}
// //         />
// //         <Input
// //           id="observaciones"
// //           label="Observaciones"
// //           placeholder="Ingrese observaciones"
// //           value={formData.observaciones || ""}
// //           onChange={handleChange}
// //           error={localErrors.observaciones}
// //         />
// //         <Input
// //           id="unidadMedida"
// //           label="Unidad de Medida"
// //           placeholder="Ingrese la unidad de medida"
// //           value={formData.unidadMedida}
// //           onChange={handleChange}
// //           error={localErrors.unidadMedida}
// //         />

// //         <div className="flex justify-end mt-4">
// //           <Button text="Registrar" type="submit" />
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default FormInventarioRegister;
// // FormInventarioRegister.js
// import React, { useState } from "react";
// import Input from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import { CreateItemDto } from "../../contexts/InventarioContext/interfaceInventario";

// interface FormInventarioRegisterProps {
//   formData: CreateItemDto;
//   handleChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => void;
//   handleSubmit: () => void;
// }

// const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
//   formData,
//   handleChange,
//   handleSubmit,
// }) => {
//   const [localErrors, setLocalErrors] = useState<Partial<CreateItemDto>>({});

//   const validateForm = () => {
//     const newErrors: Partial<CreateItemDto> = {};

//     if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
//     if (!formData.codigo) newErrors.codigo = "El código es obligatorio.";
//     if (!formData.categoria)
//       newErrors.categoria = "La categoría es obligatoria.";
//     if (!formData.unidadMedida)
//       newErrors.unidadMedida = "La unidad de medida es obligatoria.";

//     return newErrors;
//   };

//   const handleConfirm = (e: React.FormEvent) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length === 0) {
//       handleSubmit();
//     } else {
//       setLocalErrors(errors);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <form onSubmit={handleConfirm} className="grid grid-cols-1 gap-4">
//         <Input
//           id="nombre"
//           label="Nombre del Item"
//           placeholder="Ingrese el nombre del item"
//           value={formData.nombre}
//           onChange={handleChange}
//           error={localErrors.nombre}
//         />
//         <Input
//           id="descripcion"
//           label="Descripción"
//           placeholder="Ingrese la descripción"
//           value={formData.descripcion || ""}
//           onChange={handleChange}
//           error={localErrors.descripcion}
//         />
//         <Input
//           id="codigo"
//           label="Código"
//           placeholder="Ingrese el código"
//           value={formData.codigo}
//           onChange={handleChange}
//           error={localErrors.codigo}
//         />
//         <Input
//           id="categoria"
//           label="Categoría"
//           placeholder="Ingrese la categoría"
//           value={formData.categoria}
//           onChange={handleChange}
//           error={localErrors.categoria}
//         />
//         <Input
//           id="observaciones"
//           label="Observaciones"
//           placeholder="Ingrese observaciones"
//           value={formData.observaciones || ""}
//           onChange={handleChange}
//           error={localErrors.observaciones}
//         />
//         <Input
//           id="unidadMedida"
//           label="Unidad de Medida"
//           placeholder="Ingrese la unidad de medida"
//           value={formData.unidadMedida}
//           onChange={handleChange}
//           error={localErrors.unidadMedida}
//         />

//         <div className="flex justify-end mt-4">
//           <Button text="Registrar" type="submit" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormInventarioRegister;
// FormInventarioRegister.js
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

interface CreateItemDto {
  nombre: string;
  descripcion: string;
  codigo: string;
  categoria: string;
  observaciones: string;
  unidadMedida: string;
}

interface FormInventarioRegisterProps {
  formData: CreateItemDto;
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
  const [localErrors, setLocalErrors] = useState<Partial<CreateItemDto>>({});

  const validateForm = () => {
    const newErrors: Partial<CreateItemDto> = {};

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
