//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SalerProductList from "./SalerProductList";
import SalerOrderSummary from "./SalerOrderSummary";
import useRedirectLoggedOutUser from "../../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getOrderProductsSaler } from "../../../redux/features/orderProduct/orderProductSlice";

const SalerDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { orderProducts, isLoading, isError, message } = useSelector(
    (state) => state.orderProduct
  );
console.log("este esta no detail", orderProducts);
  useEffect(()  => {
    if (isLoggedIn === true && id != null) {
      dispatch(getOrderProductsSaler(id));
      console.log("entrou no if");
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <SalerOrderSummary orderProducts={orderProducts} />
      <SalerProductList orderProducts={orderProducts} isLoading={isLoading} />
    </div>
  );
};

export default SalerDetail;
