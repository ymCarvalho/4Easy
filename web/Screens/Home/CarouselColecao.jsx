import React, { useState } from 'react';
import styles from './CarouselColecao.module.css';

const CollectionsCarousel = () => {
  const allCollections = [
    "Coleção 1", "Coleção 2", "Coleção 3", 
    "Coleção 4", "Coleção 5", "Coleção 6",
    "Coleção 7", "Coleção 8", "Coleção 9",
    "Coleção 10", "Coleção 11", "Coleção 12"
  ];
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allCollections.length / itemsPerPage);

  const visibleCollections = allCollections.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const showNext = () => {
    if (!isLastPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const showPrev = () => {
    if (!isFirstPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>COLEÇÕES</h2>
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button 
              onClick={showPrev} 
              className={`${styles.navButton} ${isFirstPage ? styles.disabledButton : ''}`}
              disabled={isFirstPage}
            >
              &lt;
            </button>
            <button 
              onClick={showNext} 
              className={`${styles.navButton} ${isLastPage ? styles.disabledButton : ''}`}
              disabled={isLastPage}
            >
              &gt;
            </button>
          </div>
          <button className={styles.seeAllButton}>Ver tudo</button>
        </div>
      </div>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <div className={styles.collectionsTrack}>
            {visibleCollections.map((item, index) => (
              <div 
                key={`${currentPage}-${index}`} 
                className={styles.collectionItem}
              >
                <div className={styles.ball}>{item}</div>
              </div>
            ))}
            
            {isLastPage && (
              <div className={styles.collectionItem}>
                <button className={styles.finalButton}>
                  Ver tudo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;