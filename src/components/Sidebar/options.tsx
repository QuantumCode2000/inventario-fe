import { CgNotes } from "react-icons/cg";
import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { FaCashRegister } from "react-icons/fa";

interface Option {
  to: string;
  icon: JSX.Element;
  text: string;
}

interface OptionGroup {
  text: string;
  options: Option[];
}

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
    text: "Registros",
    options: [
      {
        to: "/registrar-salidas",
        icon: <FaCashRegister />,
        text: "Salidas",
      },
      {
        to: "/registrar-entradas",
        icon: <FaCashRegister />,
        text: "Entradas",
      },
    ],
  },
];

const optionsUsuario: OptionGroup[] = [
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
    text: "Registros",
    options: [
      {
        to: "/registrar-salidas",
        icon: <FaCashRegister />,
        text: "Salidas",
      },
      {
        to: "/registrar-entradas",
        icon: <FaCashRegister />,
        text: "Entradas",
      },
    ],
  },
];

export { optionsAdmin, optionsUsuario };
