//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./salerList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_SALERS,
  selectFilteredSalers,
} from "../../../redux/features/salers/filterSalerSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getSalers,
} from "../../../redux/features/salers/salerSlice";
import { Link } from "react-router-dom";

// Format Amount
export const formatNumbers = (x) => {
  return x.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const formatDate = (x) => {
  let dateString = x.slice(0,19).replace('T', ' ').replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
  //let dateString = aux.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
  return dateString;
};

const SalerList = ({ salers, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredSalers = useSelector(selectFilteredSalers);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  // const delProduct = async (id) => {
  //   await dispatch(deleteProduct(id));
  //   await dispatch(getProducts());
  // };

  // const confirmDelete = (id) => {
  //   confirmAlert({
  //     title: "Deletar Produto",
  //     message: "Tem certeza que deseja deletar este produto.",
  //     buttons: [
  //       {
  //         label: "Deletar",
  //         onClick: () => delProduct(id),
  //       },
  //       {
  //         label: "Cancelar",
  //         // onClick: () => alert('Click No')
  //       },
  //     ],
  //   });
  // };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredSalers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredSalers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredSalers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredSalers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_SALERS({ salers, search }));
  }, [salers, search, dispatch]);

  return (
    <div className="saler-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Lista de Vendas</h3>
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
          {!isLoading && salers.length === 0 ? (
            <p>-- Nenhuma venda encontrada...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Nome do vendedor</th>
                  <th>Metodo de pagamento</th>
                  <th>Data da venda</th>
                  <th>Valor Total</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((saler, index) => {
                  const { id, name, payment_method, date_added, total } = saler;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{payment_method}</td>
                      <td>
                      {`${formatDate(date_added)}  `}
                      </td>
                      <td>
                        {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total)}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/saler-detail/${id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        {/* <span>
                          <Link to={`/edit-product/${id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(id)}
                          />
                        </span> */}
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

export default SalerList;
