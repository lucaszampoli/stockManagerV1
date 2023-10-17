//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">Em Estoque</span>;
    }
    return <span className="--color-danger">Sem Estoque</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Detalhes do Produto</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image_path ? (
                <img
                  src={product.image_path}
                  alt={product.image_path}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Status do Produto: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span>Nome: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Categoria : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Preço : </b> 
              {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(product.price)}
            </p>
            <p>
              <b>&rarr; Quantidade em Estoque : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Valor Total em Estoque : </b> 
              {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(product.price * product.quantity)}
            </p>
            <hr />
            <p>
              <b>&rarr; Descrição : </b> 
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
