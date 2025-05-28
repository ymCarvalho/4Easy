import React, { useState } from 'react';
import styles from './CarouselEvents.module.css';

const CarouselEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return <div className={styles.noEvents}>Nenhum evento disponível</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + events.length) % events.length;
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={prevSlide} aria-label="Slide anterior">
        &lt;
      </button>
      
      <div className={styles.carousel}>
        {/* Slide anterior - mostra apenas imagem */}
        <div className={`${styles.slide} ${styles.leftSlide}`}>
          <img 
            src={events[getAdjacentIndex(-1)].image} 
            alt={events[getAdjacentIndex(-1)].alt} 
            className={styles.slideImage}
          />
        </div>

        {/* Slide atual - mostra imagem e descrição */}
        <div className={`${styles.slide} ${styles.centerSlide}`}>
          <img 
            src={events[currentIndex].image} 
            alt={events[currentIndex].alt} 
            className={styles.slideImage}
          />
          <div className={styles.currentSlideInfo}>
            <h3 className={styles.eventTitle}>{events[currentIndex].nome}</h3>
            <div className={styles.eventDetails}>
              <span className={styles.eventLocation}>📍 {events[currentIndex].local}</span>
              <span className={styles.eventDate}>🗓️ {events[currentIndex].data}</span>
            </div>
          </div>
        </div>

        {/* Próximo slide - mostra apenas imagem */}
        <div className={`${styles.slide} ${styles.rightSlide}`}>
          <img 
            src={events[getAdjacentIndex(1)].image} 
            alt={events[getAdjacentIndex(1)].alt} 
            className={styles.slideImage}
          />
        </div>
      </div>

      <button className={styles.navButton} onClick={nextSlide} aria-label="Próximo slide">
        &gt;
      </button>
    </div>
  );
};

export default CarouselEvents;