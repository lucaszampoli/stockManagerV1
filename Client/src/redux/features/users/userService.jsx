//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import axios from "axios";

//Create URL Back or Cria URL do Back
export const api = await axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

// Get all Users or Pega todos usuarios
const getUsers = async () => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.get("/api/v1/users",{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
};

// Get a User or Busca por usuario especifico
const getUser = async (id) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.get("/api/v1/users/"+id,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
};

// Create New User or Cria novo usuario
const createUser = async (formData) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.post("/api/v1/users/new/user/communication", formData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
};

// Update User or Atualiza usuario
const updateUser = async (id, formData) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.patch("/api/v1/users/updateUserRegister/"+id, formData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
};

// Delete a User or Deleta usuario
const deleteUser = async (id) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.delete("/api/v1/users/"+id,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response.data;
};

const userService = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default userService;
