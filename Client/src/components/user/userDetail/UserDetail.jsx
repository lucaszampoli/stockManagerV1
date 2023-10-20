//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getUser } from "../../../redux/features/users/userSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./UserDetail.scss";
import DOMPurify from "dompurify";

const UserDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getUser(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="user-detail">
      <h3 className="--mt">Detalhes do Usuario</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {user && (
          <div className="detail">
            <h4>
              <span>Nome: </span> &nbsp; {user.name}
            </h4>
            <p>
              <b>&rarr; Email : </b> {user.email}
            </p>
            <p>
              <b>&rarr; Perfil : </b> {user.profile === '1' ? 'Gerente' : 'Vendedor'}
            </p>
            <p>
              <b>&rarr; Status : </b> {user.status === '1' ? 'Ativo' : 'Inativo'}
            </p>
            <hr />
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserDetail;
