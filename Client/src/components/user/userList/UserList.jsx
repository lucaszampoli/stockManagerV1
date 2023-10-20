//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./UserList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_USERS,
  selectFilteredUsers,
} from "../../../redux/features/users/filterUserSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteUser,
  getUsers,
} from "../../../redux/features/users/userSlice";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

// Format Amount
export const formatNumbers = (x) => {
  return x.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const UserList = ({ users, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredUsers = useSelector(selectFilteredUsers);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Deletar Usuario",
      message: "Tem certeza que deseja deletar este usuario.",
      buttons: [
        {
          label: "Deletar",
          onClick: () => delUser(id),
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

    setCurrentItems(filteredUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredUsers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [users, search, dispatch]);

  return (
    <div className="user-list">
      <hr />
      <br />
     <div className="--flex-between --flex-dir-column">
      <span>
           
      <button className="--btn --btn-primary --btn-block" text-align="right">
       <BiPlus />
              <Link to="/add-user">Criar novo usuario</Link>
      </button>
      </span> 
      </div>
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Lista de Usuarios</h3>
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
          {!isLoading && users.length === 0 ? (
            <p>-- Nenhum usuario encontrado, adicione um novo usuario...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((user, index) => {
                  const { id, name, email, profile, status } = user;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{email}</td>
                      <td>
                        {profile === '1' ? 'Gerente' : 'Vendedor'}
                      </td>
                      <td>{status === '1' ? 'Ativo' : 'Inativo'}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/user-detail/${id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-user/${id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(id)}
                          />
                        </span>
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

export default UserList;
