//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderProductService from "./orderProductService";
import { toast } from "react-toastify";

const initialState = {
  orderProduct: null,
  orderProducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalSalerValue: 0,
  //outOfStock: 0,
  name: [],
};

// Get orderProduct or Pega/busca produtos do pedido
export const getOrderProductsSaler = createAsyncThunk(
  "orderProducts/getOrderProductsSaler",
  async (id, thunkAPI) => {
    try {
      return await orderProductService.getOrderProductsSaler(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// // Update product
// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       return await productService.updateProduct(id, formData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const orderProductSlice = createSlice({
  name: "orderProduct",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderProductsSaler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderProductsSaler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderProducts = action.payload;
      })
      .addCase(getOrderProductsSaler.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // .addCase(updateProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isError = false;
      //   toast.success("Produto atualizado com sucesso");
      // })
      // .addCase(updateProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   toast.error(action.payload);
      // });
  },
});



export const selectIsLoading = (state) => state.orderProduct.isLoading;
export const selectOrderProduct = (state) => state.orderProduct.orderProduct;

export default orderProductSlice.reducer;
