import React, { useRef } from 'react';
import Slider from 'react-slick';
import styles from './EventCarousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventCarousel = () => {
  const sliderRef = useRef(null);
  
  const events = [
    {
      id: 1,
      imageUrl: "/images/evento1.jpg",
      title: "EXPO ECOMM CIRCUITO 2025",
      subtitle: "EXPOECOMM GOIÂNIA 2025",
      location: "Goiânia - GO",
      date: "Terça, 14 de Outubro 2025"
    },
    // Adicione mais eventos...
  ];

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const nextSlide = () => sliderRef.current.slickNext();
  const prevSlide = () => sliderRef.current.slickPrev();


  return (
    <div className={styles.carouselContainer}>
      {/* Botão Anterior */}
      <button 
        onClick={prevSlide} 
        className={`${styles.navButton} ${styles.prevButton}`}
        aria-label="Evento anterior"
      >
        &lt;
      </button>
      
      {/* Carrossel */}
      <Slider ref={sliderRef} {...settings}>
        {events.map((event) => (
          <div key={event.id} className={styles.slide}>
            <div className={styles.eventCard}>
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className={styles.eventImage}
              />
            </div>
            <div className={styles.eventInfo}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventSubtitle}>{event.subtitle}</p>
              <div className={styles.eventMeta}>
                <span className={styles.eventLocation}>{event.location}</span>
                <span className={styles.eventDate}>{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Botão Próximo */}
      <button 
        onClick={nextSlide} 
        className={`${styles.navButton} ${styles.nextButton}`}
        aria-label="Próximo evento"
      >
        &gt;
      </button>
    </div>
  );
};

export default EventCarousel;