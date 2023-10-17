//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { changePasswordLogged, validatePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return toast.error("A senha deve conter mais de 8 caracteres, incluido 1 letra maiuscula, 1 minuscula 1 numero e 1 caractere especial");
    }
    
    if (password !== password2) {
      return toast.error("As senhas não são compativeis");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePasswordLogged(formData);
    toast.success(data);
    navigate("/profile");
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Trocar Senha</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Senha antiga"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Nova senha"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirme a nova senha"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Alterar Senha
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
