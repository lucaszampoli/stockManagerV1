//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const singOut = async () => {
    localStorage.clear();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };
  
  // const logout = async () => {
  //   await logoutUser();
  //   await dispatch(SET_LOGIN(false));
  //   navigate("/login");
  // };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Bem-vindo, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button onClick={singOut} className="--btn --btn-danger">
              Sair
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
