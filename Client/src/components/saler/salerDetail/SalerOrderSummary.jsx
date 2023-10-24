//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import "./SalerDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSaler } from "../../../redux/features/salers/salerSlice";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../loader/Loader";

// Format Amount
export const formatNumbers = (x) => {
  return x.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const formatDate = (x) => {
  let dateString = x.slice(0,19).replace('T', ' ').replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
  //let dateString = aux.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
  return dateString;
};

const SalerOrderSummary = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { saler, isLoading, isError, message } = useSelector(
    (state) => state.saler
  );
  console.log("Este é o salerrrrr", saler);
  
  
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSaler(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Resumo do Pedido</h3>
      {isLoading && <SpinnerImg />}

      <div className="info-summary">
      {saler && (
          <div className="detail"> 
            <h4>Nº Pedido : {saler[0].id}</h4>
            <h4>
              <span>Total : {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(saler[0].total)}</span>
            </h4>
            <p>
              <b>&rarr; Metodo de Pagamento : </b> {saler[0].payment_method}
            </p>
            <p>
              <b>&rarr; Data : </b> {`${formatDate(saler[0].date_added)}  `}
            </p>
            <p>
              <b>&rarr; Vendedor : </b> {saler[0].name}
            </p>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalerOrderSummary;
