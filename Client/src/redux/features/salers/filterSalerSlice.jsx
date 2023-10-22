//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredSalers: [],
};

const filterSalerSlice = createSlice({
  name: "filterSaler",
  initialState,
  reducers: {
    FILTER_SALERS(state, action) {
      const { salers, search } = action.payload;
      const tempSalers = salers.filter(
        (saler) =>
          saler.name.toLowerCase().includes(search.toLowerCase()) ||
          saler.payment_method.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredSalers = tempSalers;
    },
  },
});

export const { FILTER_SALERS } = filterSalerSlice.actions;

export const selectFilteredSalers = (state) => state.filterSaler.filteredSalers;

export default filterSalerSlice.reducer;
