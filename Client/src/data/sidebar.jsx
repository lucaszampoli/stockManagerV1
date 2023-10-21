//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { FaTh } from "react-icons/fa";
import { BiSolidPlusSquare, BiUserCircle, BiUserPlus, BiSolidPurchaseTag } from "react-icons/bi";


const menu = [
  {
    title: "Painel",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Produto",
    icon: <BiSolidPlusSquare />,
    path: "/add-product",
  },
  {
    title: "Add Usuarios",
    icon: <BiUserPlus />,
    path: "/users",
  },
  {
    title: "Vendas",
    icon: <BiSolidPurchaseTag />,
    path: "/orders",
  },
  {
    title: "Perfil",
    icon: <BiUserCircle />,
    childrens: [
          {
            title: "Perfil",
            path: "/profile",
          },
          {
            title: "Editar Perfil",
            path: "/edit-profile",
          },
        ],
  },
];

export default menu;
