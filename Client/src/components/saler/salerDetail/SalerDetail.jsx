//
// Created by Lucas V A Zampoli o 17/10/23.
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

  return (
    <div className="saler-detail">
      <h3 className="--mt">Detalhes da Venda</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {saler && (
          <div className="detail">
            <Card cardClass="group">
            <p>
              <b>&rarr; N venda: </b> {saler.id}
            </p>
            </Card>
            <h4>Nome do vendedor: {saler.name}</h4>
            <hr />
            <h4>
              <span>Metodo de Pagemento: </span> &nbsp; {saler.payment_method}
            </h4>
            <p>
              <b>&rarr; data : </b> {saler.data_added}
            </p>
            <p>
              <b>&rarr; Total : </b> 
              {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(saler.total)}
            </p>
            
            
            <hr />
            <p>
              <b>&rarr; Descrição : </b> 
            </p>
            
          </div>
        )}
      </Card>
    </div>
  );
};

export default SalerDetail;
