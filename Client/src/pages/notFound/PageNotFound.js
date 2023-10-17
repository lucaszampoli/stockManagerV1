import React from "react";
import styles from "./notfound.module.scss";
import { Link, useNavigate } from "react-router-dom";
const NotFound = () => {
  return (
    <body>
       
    <div className={`container ${styles.notfound}`}>
       
        <div class="container">
            <h2>Oops! Pagina não encontrada!</h2>
            <h1>404</h1>
            <p> Para retonar clique no botão abaixo. </p>
            
            <Link to="/dashboard"> Ir para Home</Link>
        </div>
     </div>
     
     </body>
  );
};



export default NotFound;
