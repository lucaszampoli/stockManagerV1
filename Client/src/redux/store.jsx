//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import userReducer from "../redux/features/users/userSlice";
import filterUserReducer from "../redux/features/users/filterUserSlice";
import salerReducer from "../redux/features/salers/salerSlice";
import filterSalerReducer from "../redux/features/salers/filterSalerSlice";
import orderProductReducer from "../redux/features/orderProduct/orderProductSlice";
import filterOrderProductReducer from "../redux/features/orderProduct/filterOrderProductSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    user: userReducer,
    filterUser: filterUserReducer,
    saler: salerReducer,
    filterSaler: filterSalerReducer,
    orderProduct: orderProductReducer,
    filterOrderProduct: filterOrderProductReducer,
  },
});
