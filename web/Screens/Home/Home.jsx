import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from "../Header/Header.jsx";
import EventCarousel from './EventCarousel';

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
        <h1 className={styles.title}>Página Home</h1>

        <button onClick={proxima} className={styles.button}>Proxima pagina</button>
      </div></>
      
  );
}

