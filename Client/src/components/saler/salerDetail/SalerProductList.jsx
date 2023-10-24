//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./SalerDetail.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_ORDER_PRODUCTS,
  selectFilteredOrderProduct,
} from "../../../redux/features/orderProduct/filterOrderProductSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  //deleteProduct,
  getOrderProductsSaler,
} from "../../../redux/features/orderProduct/orderProductSlice";
import { Link } from "react-router-dom";

// Format Amount
export const formatNumbers = (x) => {
  return x.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const SalerProductList = ({ orderProducts, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredOrderProducts = useSelector(selectFilteredOrderProduct);
console.log("salers list", orderProducts);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    //await dispatch(deleteProduct(id));
    await dispatch(getOrderProductsSaler(id));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Deletar Produto",
      message: "Tem certeza que deseja deletar este produto.",
      buttons: [
        {
          label: "Deletar",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancelar",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredOrderProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredOrderProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredOrderProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredOrderProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_ORDER_PRODUCTS({ orderProducts, search }));
  }, [orderProducts, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Resumo do Pedido</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && orderProducts.length === 0 ? (
            <p>-- Nenhum produto encontrado...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Name</th>
                  <th>Id do Produto</th>
                  <th>Quantidade</th>
                  <th>Preço Unit.</th>
                  <th>Valor Total</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((orderProduct, index) => {
                       const { id, name, product_id, quantity, price, total } = orderProduct;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{product_id}</td>
                      <td>
                        {quantity}
                      </td>
                      <td>
                      {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(price)}
                      </td>
                      <td>
                        {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total)}
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="proximo"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="retornar"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default SalerProductList;
