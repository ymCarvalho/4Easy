import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.css';


export default function Header() {

  const navigate = useNavigate();

  const loginButton = () => {
    navigate('/paginaLogin');

  };
   const CadastroButton = () => {

    navigate('/pageCadastro');

  };
  return (
    <header className={styles.header}>
      {/* Logo à esquerda */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src="../src/assets/Logo oficial.png"
            alt="Logo 4Easy"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Barra de pesquisa no centro */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar eventos, categorias, produtores..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Lado direito com local, botões e menu */}
      <div className={styles.rightSection}>

        <div className={styles.locationDropdown}>
          <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <select className={styles.locationSelect}>
            <option>Selecione o Local</option>
            <option>São Paulo</option>
            <option>Rio de Janeiro</option>
            <option>Belo Horizonte</option>
          </select>
          <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>

        <div className={styles.authButtons}>
          <button onClick={loginButton} className={styles.loginButton}>LOGIN</button>
          <button onClick={CadastroButton} className={styles.registerButton}>CADASTRE-SE</button>
        </div>

        <button className={styles.menuButton}>
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
        </button>
      </div>
    </header>
  );
}