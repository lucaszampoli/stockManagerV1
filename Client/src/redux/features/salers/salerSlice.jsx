//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import salerService from "./salerService";
import { toast } from "react-toastify";

const initialState = {
  saler: null,
  salers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalSalerValue: 0,
  //outOfStock: 0,
  name: [],
};

// Get all orders
export const getSalers = createAsyncThunk(
  "salers/getAll",
  async (_, thunkAPI) => {
    try {
      return await salerService.getSalers();
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

// Get a saler
export const getSaler = createAsyncThunk(
  "salers/getSaler",
  async (id, thunkAPI) => {
    try {
      console.log("se liga", await salerService.getSaler(id));
      return await salerService.getSaler(id);
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

// // Create New Product
// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (formData, thunkAPI) => {
//     try {
//       return await productService.createProduct(formData);
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

// // Delete a Product
// export const deleteProduct = createAsyncThunk(
//   "products/delete",
//   async (id, thunkAPI) => {
//     try {
//       return await productService.deleteProduct(id);
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

const salerSlice = createSlice({
  name: "saler",
  initialState,
  reducers: {
    CALC_SALER_VALUE(state, action) {
      const salers = action.payload;
      console.log("salers", salers);
      const array = [];
      salers.map((item) => {
        const { total } = item;
        const salerValue = parseFloat(total);
        return array.push(salerValue);
      });
      
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalSalerValue = totalValue;
    },
    // CALC_OUTOFSTOCK(state, action) {
    //   const products = action.payload;
    //   const array = [];
    //   products.map((item) => {
    //     const { quantity } = item;

    //     return array.push(quantity);
    //   });
    //   let count = 0;
    //   array.forEach((number) => {
    //     if (number === 0 || number === "0") {
    //       count += 1;
    //     }
    //   });
    //   state.outOfStock = count;
    // },
    // CALC_CATEGORY(state, action) {
    //   const products = action.payload;
    //   const array = [];
    //   products.map((item) => {
    //     const { category } = item;

    //     return array.push(category);
    //   });
    //   const uniqueCategory = [...new Set(array)];
    //   state.category = uniqueCategory;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(createProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isError = false;
      //   console.log(action.payload);
      //   state.products.push(action.payload);
      //   toast.success("Produto adicionado com sucesso");
      // })
      // .addCase(createProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   toast.error(action.payload);
      // })
      .addCase(getSalers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.salers = action.payload;
      })
      .addCase(getSalers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // .addCase(deleteProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isError = false;
      //   toast.success("Produto deletado com sucesso");
      // })
      // .addCase(deleteProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   toast.error(action.payload);
      // })
      .addCase(getSaler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSaler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.saler = action.payload;
      })
      .addCase(getSaler.rejected, (state, action) => {
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

export const { CALC_SALER_VALUE } =
  salerSlice.actions;

export const selectIsLoading = (state) => state.saler.isLoading;
export const selectSaler = (state) => state.saler.saler;
export const selectTotalSalerValue = (state) => state.saler.totalSalerValue;

// export const selectOutOfStock = (state) => state.product.outOfStock;
// export const selectCategory = (state) => state.product.category;

export default salerSlice.reducer;
