//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalerList from "../../components/saler/salerList/SalerList";
import SalerSummary from "../../components/saler/salerSummary/SalerSummary";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getSalers } from "../../redux/features/salers/salerSlice";

const Saler = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { salers, isLoading, isError, message } = useSelector(
    (state) => state.saler
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSalers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <SalerSummary salers={salers} />
      <SalerList salers={salers} isLoading={isLoading} />
    </div>
  );
};

export default Saler;
