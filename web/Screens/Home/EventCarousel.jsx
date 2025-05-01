// src/Screens/Home/EventCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import styles from './EventCarousel.module.css';

const EventCarousel = () => {
  // Dados de exemplo (substitua pelos seus eventos)
  const events = [
    {
      id: 1,
      name: "NOME DO EVENTO",
      location: "São Paulo",
      date: "sexta-feira, 12 de Fev às 20:00"
    },
    // Adicione mais eventos...
  ];

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [ // Configurações de responsividade
      {
        breakpoint: 768, // Para telas menores que 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false // Opcional: esconde dots em mobile
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.header}>
        <h2>Select one um local</h2>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>LOGIN</button>
          <button className={styles.registerBtn}>CADASTRE-SE</button>
        </div>
      </div>
      
      <Slider {...settings}>
        {events.map(event => (
          <div key={event.id} className={styles.eventCard}>
            <h3>{event.name}</h3>
            <div className={styles.eventDetails}>
              <span>📍 {event.location}</span>
              <span>📅 {event.date}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;