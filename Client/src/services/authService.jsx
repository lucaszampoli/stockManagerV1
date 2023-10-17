//
// AuthService.jsx
//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import axios from "axios";
import { toast } from "react-toastify";

//Create URL Back or Cria URL do Back
export const api = await axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

// Validate Email Formate or Valida formato de email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Validate Email Formate or Valida formato de email
export const validatePassword = (password) => {
  return password.match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  );
};

// Register User or Cria usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/v1/users", userData);
    if (response.statusText === "OK") {
      toast.success("Usuario Registrado com sucesso");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Login User or Login de usuario
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/login", userData);
    if (response.statusText === "OK") {
      toast.success("Login com Sucesso...");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password or Recuperação de senha
export const forgotPassword = async (userData) => {
  try {
    const response = await api.post("/api/v1/communication", userData);
    if (response.data === '') {
      toast.error("Usuario não encontrado...");
    }
    if(response.data === true){
      toast.success("Sua senha foi recuperada, olhe seu e-mail...");
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get User Profile or Pega usuario logado
export const getUserLogged = async () => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));
  
  try {
    const response = await api.get("/api/auth/get/user/logged",{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
      
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Update Profile logged or Atualiza usuario logado
export const updateUserLogged = async (formData) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));
  try {
    const response = await api.patch("/api/auth/alter/user/data", formData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Update Password or Troca senha de usuario
export const changePasswordLogged = async (formData) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));
  try {
    const response = await api.patch("/api/auth/change/password", formData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
      
        if (response.data === '') {
          toast.error("Senha Antiga Incompatível!");
        }
        if(response.data === true){
          toast.success("Sua senha foi alterada com sucesso...");
        }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};