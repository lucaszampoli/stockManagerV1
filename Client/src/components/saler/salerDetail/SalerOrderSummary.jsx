//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import "./SalerDetail.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Format Amount
export const formatNumbers = (x) => {
  return x.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const SalerOrderSummary = ({ orderProducts }) => {
  const dispatch = useDispatch();
console.log("olha o orderProduct", orderProducts);
  const { id } = useParams();
  return (
    <div className="product-summary">
      <h3 className="--mt">Pedido</h3>
      <div className="info-summary">
        Order : {id}
      </div>
    </div>
  );
};

export default SalerOrderSummary;
