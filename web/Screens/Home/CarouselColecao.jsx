import React, { useState } from 'react';
import styles from './Carousel.module.css';

const CollectionsCarousel = () => {
  const allCollections = [
    "Coleção 1", "Coleção 2", "Coleção 3", 
    "Coleção 4", "Coleção 5", "Coleção 6",
    "Coleção 7", "Coleção 8"
  ];
  
  const [visibleCollections, setVisibleCollections] = useState(allCollections.slice(0, 5));
  const [startIndex, setStartIndex] = useState(0);

  const showNext = () => {
    const newStartIndex = (startIndex + 1) % allCollections.length;
    updateVisibleCollections(newStartIndex);
  };

  const showPrev = () => {
    const newStartIndex = (startIndex - 1 + allCollections.length) % allCollections.length;
    updateVisibleCollections(newStartIndex);
  };

  const updateVisibleCollections = (newStartIndex) => {
    let newCollections = [];
    for (let i = 0; i < 5; i++) {
      const index = (newStartIndex + i) % allCollections.length;
      newCollections.push(allCollections[index]);
    }
    setStartIndex(newStartIndex);
    setVisibleCollections(newCollections);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>COLEÇÕES</h2>
      
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button onClick={showPrev} className={styles.navButton}>
              &lt;
            </button>
            <button onClick={showNext} className={styles.navButton}>
              &gt;
            </button>
          </div>
          <button className={styles.seeAllButton}>Ver tudo</button>
        </div>
      </div>
      
      <div className={styles.carouselContainer}>
        <div className={styles.collectionsTrack}>
          {visibleCollections.map((item, index) => (
            <div 
              key={`${startIndex}-${index}`} 
              className={styles.collectionItem}
            >
              <div className={styles.ball}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;