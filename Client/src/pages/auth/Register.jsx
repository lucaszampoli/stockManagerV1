//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  profile: "",
  status: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, profile, status, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !profile || !status || !password) {
      return toast.error("Preencha todos os campos");
    }
    if (password.length < 6) {
      return toast.error("A senha deve conter mais de 6 caracteres, incluido 1 letra maiuscula, 1 minuscula e 1 caractere especial");
    }
    if (!validateEmail(email)) {
      return toast.error("Informe um e-mail valido, Por favor");
    }
    if (password !== password2) {
      return toast.error("Senhas incompativeis");
    }
    if (!profile) {
      return toast.error("Preencha o campo Perfil");
    }
    if (!status) {
      return toast.error("Preencha o campo Status");
    }

    const userData = {
      name,
      email,
      profile,
      status,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Cadastro de Usuario</h2>

          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Nome"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <select name="profile" value={profile} onChange={handleInputChange}>
            <option defaultValue>Perfil</option>
            <option value="1">Gerente</option>
            <option value="2">Vendedor</option>
            </select>
            <select name="status" value={status} onChange={handleInputChange}>
            <option defaultValue>Status</option>
            <option value="1">Ativo</option>
            <option value="2">Inativo</option>
            </select>
            <input
              type="password"
              placeholder="senha"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirme a senha"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Enviar
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/login">Retornar para a tela de Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
