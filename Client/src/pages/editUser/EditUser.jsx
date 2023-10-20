//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import Loader from "../../components/loader/Loader";
import UserForm from "../../components/user/userForm/UserForm";
import {
  getUser,
  getUsers,
  selectIsLoading,
  selectUser,
  updateUser,
} from "../../redux/features/users/userSlice";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const userEdit = useSelector(selectUser);
  const [user, setUser] = useState(userEdit);

  //tratamento status login
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isError, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    setUser(userEdit);
   
  }, [userEdit]);

  useEffect(() => {
  const aux = id ? 'disabled' : '';
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const saveUser = async (e) => {
    e.preventDefault();
    
    if (!user?.name) {
      return toast.error("Preencha o campo nome");
    }

    if (user?.profile === 'Perfil') {
      return toast.error("Preencha o campo Perfil");
    }
    if (user?.status === 'Status') {
      return toast.error("Preencha o campo Status");
    }
    
    const formData = new FormData();
    formData.append("name", user?.name);
    //formData.append("email", user?.email);
    formData.append("profile", user?.profile);
    formData.append("status", user?.status);

    console.log(...formData);

    await dispatch(updateUser({ id, formData }));
    await dispatch(getUsers());
    navigate("/users");
  };

  return (
    <div>
      {isLoading }
      <h3 className="--mt">Editar Usuario</h3>
      <UserForm
        user={user}
        handleInputChange={handleInputChange}
        saveUser={saveUser}
      />
    </div>
  );
};

export default EditUser;
