//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import IntlCurrencyInput from "react-intl-currency-input"

import "./ProductForm.scss";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};
// // Format Amount
// export const formatNumbers = (x) => {
//   const y = x > 0 ? parseFloat(x) : 0;
//   var formatter = new Intl.NumberFormat('pt-BR', {
//     style: 'currency',
//     currency: 'BRL',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   return formatter.format(y);
// };
// Format Amount
// export const formatNumbers = (x) => {
//   console.log("entrou assim", x);
//   const value = isNaN(x) ? x : "R$"+parseFloat(x).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
//   console.log("saiu assim", value);
//   return value;
// };

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleInputPrice,
  handleImageChange,
  saveProduct,
}) => {

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Imagem do Produto</label>
            <code className="--color-dark">
              Formatos suportados: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image_path"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>Sem imagem selecionada para este produto.</p>
            )}
          </Card>
          <label>Nome do Produto:</label>
          <input
            type="text"
            placeholder="Nome do Produto"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Categoria do Produto:</label>
          <input
            type="text"
            placeholder="Categoria do Produto"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
          <IntlCurrencyInput 
            currency="BRL" 
            config={currencyConfig}
            type="text"
            placeholder="Preço do Produto"
            name="price"
            value={ product?.price }
            onChange={handleInputPrice} 
          />

          <label>Quantidade do Produto:</label>
          <input
            type="number"
            placeholder="Quantidade do Produto"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          
          <label>Descrição do Produto:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Salvar Produto
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
