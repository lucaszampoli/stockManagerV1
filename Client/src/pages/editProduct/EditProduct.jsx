//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const productEdit = useSelector(selectProduct);
  const [product, setProduct] = useState(productEdit);
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

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image_path ? `${productEdit.image_path}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  // const handleInputChange = (e) => {
  //   // console.log("me diz e.target sem",e.target.value);
  //   // console.log("me diz e.target",e.target.value.replace(/[^,0-9]+/g,"").replace(".", "").replace(",", ""));
  //   // console.log("vamo ver qualé",e.target.value.slice(2).replace(/\./g, "").replace(/,/g, "."));
  //   // console.log("estou connfiante", parseFloat(e.target.value.replace('R$', '')).toFixed(2))
  //   const { name, value } = e.target;
  //   const aux = e.target.value.replace(/[^,0-9]+/g,"").replace(".", "").replace(",", ",");
  //   const val = parseFloat(aux).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  //   setProduct({ ...product, [name]: value });
  //   console.log("este é o aux", val);
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  
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

  const saveProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", parseFloat(product?.price).toFixed(2));
    formData.append("description", description);
    if (productImage) {
      formData.append("file", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading }
      <h3 className="--mt">Editar Produto</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
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

export default EditProduct;
