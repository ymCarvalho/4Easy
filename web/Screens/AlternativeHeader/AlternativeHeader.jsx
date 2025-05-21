import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AlternativeHeader.module.css';

export default function Header() {
  return (
     <header >
    
                    <div className={styles.logoContainer}>
                        <Link to="home">
                            <img
                                src="../src/assets/Logo oficial.png"
                                alt="Logo 4Easy"
                                className={styles.logo}
                            />
                        </Link>
                    </div>
                </header>
                
  );
}