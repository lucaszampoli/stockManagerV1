//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import axios from "axios";

//Create URL Back or Cria URL do Back
export const api = await axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

// Get all Orders or Pega todas as ordens
const getSalers = async () => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.get("/api/v1/salers");
    return response.data;
};

// Get a Order or Busca por ordem especifico
const getSaler = async (id) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.get("/api/v1/salers/"+id);
    console.log("passou aqui", response.data);
    return response.data;
};

// // Create New Product or Cria novo produto
// const createProduct = async (formData) => {
//   // Get token/Parse or Pega token e da parse
//   const token = await JSON.parse(localStorage.getItem("token"));

//     const response = await api.post("/api/v1/products", formData,{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }});
//     return response.data;
// };

// // Update Product or Atualiza produto
// const updateProduct = async (id, formData) => {
//   // Get token/Parse or Pega token e da parse
//   const token = await JSON.parse(localStorage.getItem("token"));

//     const response = await api.patch("/api/v1/products/"+id, formData,{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }});
//     return response.data;
// };

// // Delete a Product or Deleta produto
// const deleteProduct = async (id) => {
//   // Get token/Parse or Pega token e da parse
//   const token = await JSON.parse(localStorage.getItem("token"));

//     const response = await api.delete("/api/v1/products/"+id,{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }});
//     return response.data;
// };

const salerService = {
  //createProduct,
  getSalers,
  getSaler,
  // deleteProduct,
  // updateProduct,
};

export default salerService;
