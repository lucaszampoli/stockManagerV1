//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogInCircle } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME, SET_TOKEN } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import jwt from "jwt-decode";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Todos os campos são necessários");
    }

    if (!validateEmail(email)) {
      return toast.error("Por favor digite um e-mail valido");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      const nameAux = await jwt(data.token);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(nameAux.name));
      await dispatch(SET_TOKEN(data.token));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading }
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogInCircle size={75} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Entrar
            </button>
          </form>
          <Link to="/forgot">Recuperar senha</Link>

          {/* <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span> */}
        </div>
      </Card>
    </div>
  );
};

export default Login;
