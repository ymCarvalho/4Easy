import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import LogoOficial from '@images/logos/LogoOficial.png';
import LogoCompleta from '@images/logos/LogoExtended.png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
 
  const [isScrolled, setIsScrolled] = useState(() => {
    if (isHomePage) {
  
      return typeof window !== 'undefined' ? window.scrollY > 50 : false;
    }

    return true;
  });

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

     
      handleScroll();
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

  }, [isHomePage]);

  const loginButton = () => navigate('/paginaLogin');
  const CadastroButton = () => navigate('/pageCadastro');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fechar o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(`.${styles.menuButton}, .${styles.menuDropdown}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Bloqueio do scroll quando o menu está aberto
useEffect(() => {
  const originalStyle = window.getComputedStyle(document.body).overflow;
  const originalPosition = window.getComputedStyle(document.body).position;
  const scrollY = window.scrollY;
  
  if (isMenuOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  }

  return () => {
    document.body.style.overflow = originalStyle;
    document.body.style.position = originalPosition;
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
  };
}, [isMenuOpen]);

  return (
    <>
       <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>  
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img
                src={isScrolled ? LogoOficial : LogoCompleta}
                alt="Logo 4Easy"
                className={styles.logo} />
            </Link> 
            {!isScrolled && <p>Seu evento, do jeito que você imagina.</p>}
          </div>

          {/* Barra de pesquisa (modo compacto) */}
          {isScrolled && (
            <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  placeholder="Pesquisar eventos..."
                  className={styles.searchInput} />
              </div>
            </div>
          )}

          {/* Menu direito */}
          <div className={styles.rightSection}>
            <div className={styles.rightAboveSection}>
              {isScrolled && (
                <div className={styles.locationDropdown}>
                  <svg className={styles.locationIcon} viewBox="0 0 24 24">
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
              )}

              <div className={styles.authButtons}>
                <button onClick={loginButton} className={styles.loginButton}>LOGIN</button>
                <button onClick={CadastroButton} className={styles.registerButton}>CADASTRE-SE</button>
              </div>

              <button onClick={toggleMenu} className={styles.menuButton}>
                <div className={styles.menuIcon}></div>
                <div className={styles.menuIcon}></div>
                <div className={styles.menuIcon}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de pesquisa completa (apenas quando não scrolled) */}
        {!isScrolled && (
          <>
            <div className={styles.fullSearchContainer}>
              <div className={styles.searchBar}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  placeholder="Pesquisar eventos, categorias, produtores..."
                  className={styles.searchInput} />
              </div>
            </div>

            <div className={styles.locationBarContainer}>
              <div className={styles.locationDropdownRow}>
                <div className={styles.locationDropdown}>
                  <svg className={styles.locationIcon} viewBox="0 0 24 24">
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

                {/* Aqui você pode adicionar outros filtros no futuro */}
              </div>
            </div>
          </>
        )}
      </header>
      
      {/* Menu Dropdown Centralizado */}
      {isMenuOpen && (
        
        <div className={styles.menuDropdown}>
          <div className={styles.menuContent}>
            <h3 className={styles.menuTitle}>Menu</h3>
            <ul className={styles.menuItems}>
              <li className={styles.menuItem} onClick={() => navigate('/')}>Home</li>
              <li className={styles.menuItem} onClick={() => navigate('/eventos')}>Eventos</li>
              <li className={styles.menuItem} onClick={() => navigate('/categorias')}>Categorias</li>
              <li className={styles.menuItem} onClick={() => navigate('/aboutus')}>Sobre Nós</li>
              <li className={styles.menuItem} onClick={() => navigate('/contato')}>Contato</li>
            </ul>
            <div className={styles.menuAuthButtons}>        
              <button onClick={loginButton} className={styles.menuLoginButton}>Login</button>
              <button onClick={CadastroButton} className={styles.menuRegisterButton}>Cadastre-se</button>
            </div>
          </div>
        </div>
      )}

      
      
      <div className="header-spacer" />
    </>
  );
}