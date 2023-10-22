//
// Created by Lucas V A Zampoli o 22/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getSaler } from "../../../redux/features/salers/salerSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./SalerDetail.scss";
import DOMPurify from "dompurify";

const SalerDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { saler, isLoading, isError, message } = useSelector(
    (state) => state.saler
  );


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSaler(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  console.log(saler);
  return (
    <div className="saler-detail">
      <h3 className="--mt">Detalhes da Venda</h3>
      <div className="table">
          {isLoading ? (
            <p>-- Nenhuma venda encontrada...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Nome do vendedor</th>
                  <th>Metodo de pagamento</th>
                  <th>Data da venda</th>
                  <th>Codigo do Produto</th>
                  <th>Produto</th>
                  <th>quantity</th>
                </tr>
              </thead>

              <tbody>
                {saler.map((salers, index) => {
                  const { id, name, payment_method, date_added, total } = salers;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{payment_method}</td>
                      <td>
                        {date_added}
                      </td>
                      <td>
                        {date_added}
                      </td>
                      <td>
                        {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )};
        </div>
    </div>
  );
};

export default SalerDetail;
