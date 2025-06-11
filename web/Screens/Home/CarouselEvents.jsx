  import React, { useState, useRef } from 'react';
  import Slider from 'react-slick';
  import styles from './CarouselEvents.module.css';
  import 'slick-carousel/slick/slick.css';
  import 'slick-carousel/slick/slick-theme.css';

  const CarouselEvents = ({ events }) => {
    if (!events || events.length === 0) {
      return <div className={styles.noEvents}>Nenhum evento disponível</div>;
    }

    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0',
      beforeChange: (current, next) => setCurrentIndex(next),
      initialSlide: currentIndex,
      afterChange: (current) => setCurrentIndex(current),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: false
          }
        }
      ]
    };

    const nextSlide = () => {
      sliderRef.current.slickNext();
    };

    const prevSlide = () => {
      sliderRef.current.slickPrev();
    };

    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={prevSlide} aria-label="Slide anterior">
            &lt;
          </button>
          
          <div className={styles.carousel}>
            <Slider ref={sliderRef} {...settings} className={styles.slider}>
              {events.map((event, index) => (
                <div key={index} className={styles.slideWrapper}>
                  <div 
                    className={`${styles.slide} ${
                      index === currentIndex ? styles.centerSlide : styles.sideSlide
                    }`}
                  >
                    <img 
                      src={event.image} 
                      alt={event.alt} 
                      className={styles.slideImage}
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <button className={styles.navButton} onClick={nextSlide} aria-label="Próximo slide">
            &gt;
          </button>
        </div>

        {/* Div com informações do slide central */}
        <div className={styles.currentSlideInfo}>
          <h3 className={styles.eventTitle}>{events[currentIndex].nome}</h3>
          <div className={styles.eventDetails}>
            <span className={styles.eventLocation}>📍 {events[currentIndex].local}</span>
            <span className={styles.eventDate}>🗓️ {events[currentIndex].data}</span>
          </div>
        </div>
      </div>
    );
  };

  export default CarouselEvents;