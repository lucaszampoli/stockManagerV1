//
// Created by Lucas V A Zampoli o 23/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import axios from "axios";

//Create URL Back or Cria URL do Back
export const api = await axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

// Get a Order or Busca por ordem especifico
const getOrderProductsSaler = async (id) => {
  // Get token/Parse or Pega token e da parse
  const token = await JSON.parse(localStorage.getItem("token"));

    const response = await api.get("/api/v1/salers/getOrderProductsSaler/"+id);
    return response.data;
};

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


const orderProductService = {
  getOrderProductsSaler
};

export default orderProductService;
