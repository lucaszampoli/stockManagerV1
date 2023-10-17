//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER, SET_TOKEN } from "../../redux/features/auth/authSlice";
import { getUserLogged } from "../../services/authService";
import "./Profile.scss";
 
const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting use");
    setIsLoading(true);
    async function getUserData() {
      const token = await JSON.parse(localStorage.getItem("token")); 
      const data = await getUserLogged();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
      await dispatch(SET_TOKEN(token));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Algo deu errado, atualize a página...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-data">
              <p>
                <b>Nome : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Editar Perfil</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
