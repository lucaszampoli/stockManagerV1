//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  //tratamento status login
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

  }, [isLoggedIn, isError, message, dispatch]);

  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //pega o preço
  const handleInputPrice = (event, value, maskedValue) => {
    event.preventDefault();
    
    // console.log(value); // value without mask (ex: 1234.56)
    // console.log(maskedValue); // masked value (ex: R$1234,56)
    // console.log(event.target.name); // name (ex: price)
    const name = event.target.name;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", parseFloat(price).toFixed(2));
    formData.append("description", description);
    formData.append("file", productImage);

    console.log(...formData);

   await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading  }
      <h3 className="--mt">Adicionar novo Produto</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleInputPrice={handleInputPrice}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
