import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import EventCarousel from './EventCarousel';
import CarouselColecao from './CarouselColecao';

export default function Home() {
//javascript
    const navigate = useNavigate();
  
    const proxima = () => {
      // Você pode fazer lógica aqui antes de navegar
      navigate('./Pagina1/Pagina1.jsx');
    };

  return (

    //html #1400b4-cor principal 
    <>
      <Header/>
      <div className={styles.container}>
        
        
        {/* Adicione o carrossel aqui */}
        <div className={styles.carouselWrapper}>
          <EventCarousel />
        </div>
        <div className={styles.carouselWrapper}>
          <CarouselColecao />
          </div>

        <button onClick={proxima} className={styles.button}>
          Próxima página
        </button>
        </div>
        <div className={styles.secondPart}></div>
        <Footer/>
        </>
      
  );
}