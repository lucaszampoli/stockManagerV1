//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./UserForm.scss";

const UserForm = ({
  user,
  handleInputChange,
  saveUser,
}) => {
  return (
    <div className="add-user">
      <Card cardClass={"card"}>
        <form onSubmit={saveUser}>
          
          <label>Nome do Usuario:</label>
          <input
            type="text"
            placeholder="Nome do Usuario"
            name="name"
            value={user?.name}
            onChange={handleInputChange}
          />

          <label>Email:</label>
          <input disabled = { user?.id ? 'disabled' : ''}
            type="text"
            placeholder="Email"
            name="email"
            value={user?.email}
            onChange={handleInputChange}
          />
           
          <select name="profile" value={user?.profile} onChange={handleInputChange}>
            <option defaultValue>Perfil</option>
            <option value="1">Gerente</option>
            <option value="2">Vendedor</option>
          </select>

          <select name="status" value={user?.status} onChange={handleInputChange}>
            <option defaultValue>Status</option>
            <option value="1">Ativo</option>
            <option value="2">Inativo</option>
          </select>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

UserForm.modules = {
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
UserForm.formats = [
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

export default UserForm;
