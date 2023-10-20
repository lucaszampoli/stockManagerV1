//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import Loader from "../../components/loader/Loader";
import UserForm from "../../components/user/userForm/UserForm";
import {
  createUser,
  selectIsLoading,
} from "../../redux/features/users/userSlice";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/authService";

const initialState = {
  name: "",
  email: "",
  profile: "",
  status: "",
};

const AddUser = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);

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

  const isLoading = useSelector(selectIsLoading);

  const { name, email, profile, status } = user;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !profile || !status) {
      return toast.error("Preencha todos os campos");
    }
    
    if (!validateEmail(email)) {
      return toast.error("Informe um e-mail valido, Por favor");
    }

    if (profile === 'Perfil') {
      return toast.error("Preencha o campo Perfil");
    }
    if (status === 'Status') {
      return toast.error("Preencha o campo Status");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("profile", profile);
    formData.append("status", status);
    
    console.log(...formData);

   await dispatch(createUser(formData));

    navigate("/users");
  };

  return (
    <div>
      {isLoading  }
      <h3 className="--mt">Adicionar novo Usuario</h3>
      <UserForm
        user={user}
        handleInputChange={handleInputChange}
        saveUser={saveUser}
      />
    </div>
  );
};

export default AddUser;
