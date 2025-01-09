import { CgNotes } from "react-icons/cg";
import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { BiSolidReport } from "react-icons/bi";

interface Option {
  to: string;
  icon: JSX.Element;
  text: string;
}

interface OptionGroup {
  text: string;
  options: Option[];
}

const optionsGeneration = (unidad: string): OptionGroup[] => {
  return [
    {
      text: "Ganado Bovino",
      options: [
        {
          to: `/inventario/bovino/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/bovino/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/bovino/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },

    {
      text: "Ganado Equino",
      options: [
        {
          to: `/inventario/equino/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/equino/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/equino/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
  ];
};

const optionsAdmin: OptionGroup[] = [
  {
    text: " Personal",
    options: [
      {
        to: "/registro-personal",
        icon: <RiUserSettingsFill />,
        text: "Registro Personal",
      },
    ],
  },
  {
    text: "Inventario",
    options: [
      {
        to: "/Inventario",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
    ],
  },
  {
    text: "Pedidos",
    options: [
      {
        to: "/Registrar-Pedidos",
        icon: <BiSolidReport />,
        text: "Registrar Pedidos",
      },
      {
        to: "/Pedidos",
        icon: <BiSolidReport />,
        text: "Pedidos",
      },
    ],
  },
];

export { optionsAdmin, optionsGeneration };
