//
// Created by Lucas V A Zampoli o 22/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredOrderProducts: [],
};

const filterOrderProductSlice = createSlice({
  name: "filterOrderProduct",
  initialState,
  reducers: {
    FILTER_ORDER_PRODUCTS(state, action) {
      const { orderProducts, search } = action.payload;
      const tempOrderProducts = orderProducts.filter(
        (orderProduct) =>
        orderProduct.name.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredOrderProducts = tempOrderProducts;
    },
  },
});

export const { FILTER_ORDER_PRODUCTS } = filterOrderProductSlice.actions;

export const selectFilteredOrderProduct = (state) => state.filterOrderProduct.filteredOrderProducts;

export default filterOrderProductSlice.reducer;
