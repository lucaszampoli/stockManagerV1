import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_TOKEN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const token = await JSON.parse(localStorage.getItem("token"));
       if(token){
          const decodedJwt = JSON.parse(atob(token.split(".")[1]));
            if(decodedJwt.exp * 1000 < Date.now()) {
              const isLoggedIn = false;
              localStorage.clear();
              toast.info("Sua sessão expirou, por favor faça o login novamente.");
              navigate(path);
              return;
              } else {
                const isLoggedIn = true;
                dispatch(SET_LOGIN(isLoggedIn));
                }
            } else {
              const isLoggedIn = false;
              navigate(path);
            }
       }
    console.log("redirectLoggedOutUser", path);
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};
// const useRedirectLoggedOutUser = (path) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const redirectLoggedOutUser = async () => {
//       const isLoggedIn = await getLoginStatus();
//       dispatch(SET_LOGIN(isLoggedIn));

//       if (!isLoggedIn) {
//         toast.info("Session expired, please login to continue.");
//         navigate(path);
//         return;
//       }
//     };
//     redirectLoggedOutUser();
//   }, [navigate, path, dispatch]);
// };
export default useRedirectLoggedOutUser;
