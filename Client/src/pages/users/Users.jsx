//
// Created by Lucas V A Zampoli o 19/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../../components/user/userList/UserList";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getUsers } from "../../redux/features/users/userSlice";

const Users = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getUsers());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <UserList users={users} isLoading={isLoading} />
    </div>
  );
};

export default Users;
