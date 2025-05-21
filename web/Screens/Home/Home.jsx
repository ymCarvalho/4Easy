import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import CarouselColecao from './CarouselColecao';

export default function Home() {

  const navigate = useNavigate();

  const proxima = () => {
 
    navigate('./PaginaLogin/PaginaLogin.jsx');
  };

  return (


    <>
      <Header />
      <div className={styles.container}>

        <div className={styles.carouselWrapper}>
          <CarouselColecao />
        </div>

        <button onClick={proxima} className={styles.button}>
          Próxima página
        </button>
      </div>
      <div className={styles.secondPart}></div>
      <Footer />
    </>

  );
}