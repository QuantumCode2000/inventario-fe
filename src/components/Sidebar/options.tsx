import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
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

export { optionsAdmin, optionsUsuario };
