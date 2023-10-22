//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import "./SalerSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  // CALC_CATEGORY,
  // CALC_OUTOFSTOCK,
  CALC_SALER_VALUE,
  // selectCategory,
  // selectOutOfStock,
  selectTotalSalerValue,
} from "../../../redux/features/salers/salerSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const salerIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const SalerSummary = ({ salers }) => {
  const dispatch = useDispatch();
  const totalSalerValue = useSelector(selectTotalSalerValue);
  // const outOfStock = useSelector(selectOutOfStock);
  // const category = useSelector(selectCategory);
  

  useEffect(() => {
    dispatch(CALC_SALER_VALUE(salers));
    // dispatch(CALC_OUTOFSTOCK(products));
    // dispatch(CALC_CATEGORY(products));
  }, [dispatch, salers]);

  return (
    <div className="saler-summary">
      <h3 className="--mt">Sumario de Vendas</h3>
      <div className="info-summary">
        <InfoBox
          icon={salerIcon}
          title={"Total de vendas"}
          count={salers.length}
          bgColor="card4"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total R$"}
          count={`R$${formatNumbers(totalSalerValue)}  `}
          bgColor="card2"
        />
        {/* <InfoBox
          icon={outOfStockIcon}
          title={"Produtos Sem Estoque"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Qtd de Categorias"}
          count={category.length}
          bgColor="card1"
        /> */}
      </div>
    </div>
  );
};

export default SalerSummary;
