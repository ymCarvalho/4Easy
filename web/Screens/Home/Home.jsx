import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CarouselColecao from './CarouselColecao';
import CarouselElements from './CarouselElements';
import CarouselEvents from './CarouselEvents';
import Rafael from '@images/team/Rafael.png';
import Jorge from '@images/team/Jorge.png'
import Leandro from '@images/team/Lele.png';
import cellphone from '@images/placeholders/cellphone.png';
import cellphone4easy from '@images/placeholders/cellPhone4easy.png';
import money from '@images/placeholders/money.png';

const events = [
  {
    image: Rafael,
    alt: "Evento 1",
    nome: "Nome do Evento 1",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: Jorge,
    alt: "Evento 1",
    nome: "Nome do Evento 2",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  {
    image: Leandro,
    alt: "Evento 1",
    nome: "Nome do Evento 3",
    local: "São Paulo",
    data: "sexta-feira, 12 de Fev às 20:00"
  },
  // Adicione mais eventos conforme necessário
];

export default function Home() {

  const navigate = useNavigate();

  const proxima = () => {
 
     navigate('/AboutUs');
  };

  return (


    <>
      <Header />

      <section className={styles.eventsSection}>
            
          <CarouselEvents events={events} />
        </section>

        <div className={styles.secondPart}>
          <div className={styles.carouselWrapper}>
          <CarouselColecao />
        </div>

        <div className={styles.carouselWrapper}>
          <CarouselElements />
        </div>
        
        
        </div>
       
          <div className={styles.featureSection}>
          <div className={styles.featureContent}>
            <h1 className={styles.mainTitle}>Seu evento, do jeito <br /> que você imagina.</h1>
            <h2 className={styles.subTitle}>Baixe o app e crie</h2>
            
            <div className={styles.featureBoxes}>
              <div className={styles.featureBox}>
                <img src={cellphone} alt="Celular" className={styles.featureIcon} />
                <p className={styles.featureText}>Com apenas <b>alguns cliques</b></p>
              </div>
              
              <div className={styles.featureBox}>
                <img src={money} alt="Dinheiro" className={styles.featureIcon} />
                <p className={styles.featureText}>Crie seu evento <b>gratuitamente!</b> </p>
              </div>
            </div>

            
          </div>
          
            <div className="featureContent2">
                <div className={styles.featureBox}>
                <img src={cellphone4easy} alt="Celular" className={styles.featureIcon2} />
                
              </div>

            <div className={styles.actionButtons}>
              <button onClick={proxima} className={styles.actionButton}>Sobre nós</button>
              <button className={styles.actionButton}>Veja como funciona</button>
            </div>

          </div>
        </div>
      
      <Footer />
    </>

  );
}