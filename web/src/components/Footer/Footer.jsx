import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.downloadSection}>
        <div className="leftSection">
        <img src="./src/assets/Logo4eBranco.png" alt="4e" width={'100vh'}/>
        </div>
        <div className="rightSection">
        <h3>Baixe nosso aplicativo</h3>
        <div className={styles.appButtons}>
          <button className={styles.storeButton}>
            <img 
              src="./src/assets/googlePlay.png" 
              alt="Disponível no Google Play"
              className={styles.badge}
            />
          </button>
          <button className={styles.storeButton}>
            <img 
              src="./src/assets/appStore.png" 
              alt="Disponível na App Store"
              className={styles.badge}
            />
          </button>
          </div>
        </div>
      </div>

      <div className={styles.linksSection}>
        <div className={styles.linksColumn}>
          <h4>Cidades</h4>
          <ul>
            <li>São Paulo</li>
            <li>Rio de Janeiro</li>
            <li>Belo Horizonte</li>
          </ul>
        </div>
        
        <div className={styles.linksColumn}>
          <h4>Categorias</h4>
          <ul>
            <li>Restaurantes</li>
            <li>Lojas</li>
            <li>Serviços</li>
          </ul>
        </div>
        
        <div className={styles.linksColumn}>
          <h4>Ajuda</h4>
          <ul>
            <li>SAC</li>
            <li>Perguntas Frequentes</li>
            <li>Contato</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <span className={styles.copyright}>© {new Date().getFullYear()} 4Easy. Todos os direitos reservados.</span>
        <div className={styles.socialIcons}>
          <img src="/facebook-icon.png" alt="Facebook" />
          <img src="/instagram-icon.png" alt="Instagram" />
          <img src="/twitter-icon.png" alt="Twitter" />
        </div>
      </div>
    </footer>
  );
}