import React from 'react';
import Slider from 'react-slick';
import styles from './EventCarousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventCarousel = () => {
  const events = [
    {
      id: 1,
      name: "Show de Rock",
      location: "São Paulo",
      date: "12/02 às 20:00"
    },
    {
      id: 2,
      name: "Festival de Jazz",
      location: "Rio de Janeiro", 
      date: "15/02 às 19:30"
    },
    {
      id: 3,
      name: "Teatro Nacional",
      location: "Belo Horizonte",
      date: "18/02 às 21:00"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {events.map(event => (
          <div key={event.id} className={styles.slide}>
            <div className={styles.eventCard}>
              <h3>{event.name}</h3>
              <div className={styles.eventDetails}>
                <span>📍 {event.location}</span>
                <span>📅 {event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;