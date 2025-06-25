import React, { useState, useEffect, useRef } from 'react';
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
    return isHomePage ? (typeof window !== 'undefined' ? window.scrollY > 50 : false) : true;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const bodyRef = useRef(document.body);

  // Efeito de scroll para header
  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const shouldScrolled = window.scrollY > 50;
        if (shouldScrolled !== isScrolled) {
          setIsScrolled(shouldScrolled);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage, isScrolled]);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Controle do scroll quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      // Guarda a posição atual do scroll
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
      
      // Aplica estilos para congelar a posição
      bodyRef.current.style.position = 'fixed';
      bodyRef.current.style.top = `-${currentScroll}px`;
      bodyRef.current.style.left = '0';
      bodyRef.current.style.right = '0';
      bodyRef.current.style.overflow = 'hidden';
      
      // Adiciona padding-right para compensar a barra de scroll desaparecida
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      bodyRef.current.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Remove os estilos
      bodyRef.current.style.position = '';
      bodyRef.current.style.top = '';
      bodyRef.current.style.left = '';
      bodyRef.current.style.right = '';
      bodyRef.current.style.overflow = '';
      bodyRef.current.style.paddingRight = '';
      
      // Restaura o scroll
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      // Limpeza
      bodyRef.current.style.position = '';
      bodyRef.current.style.top = '';
      bodyRef.current.style.left = '';
      bodyRef.current.style.right = '';
      bodyRef.current.style.overflow = '';
      bodyRef.current.style.paddingRight = '';
    };
  }, [isMenuOpen, scrollPosition]);

  // Focar no input de busca quando a barra de pesquisa é exibida
  useEffect(() => {
    if (isScrolled && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isScrolled]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.headerContent}>
          {/* Logo Section */}
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logoLink}>
              <img
                src={isScrolled ? LogoOficial : LogoCompleta}
                alt="Logo 4Easy"
                className={styles.logo}
                loading="eager"
              />
              {!isScrolled && (
                <p className={styles.tagline}>Seu evento, do jeito que você imagina.</p>
              )}
            </Link>
          </div>

          {/* Search Bar (Visible when scrolled) */}
          {isScrolled && (
            <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
              <div className={`${styles.searchBar} ${isSearchFocused ? styles.focused : ''}`}>
                <button type="submit" className={styles.searchButton}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar eventos..."
                  className={styles.searchInput}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.clearSearchButton}
                    onClick={() => setSearchQuery('')}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Right Section */}
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
                <button
                  onClick={() => navigate('/paginaLogin')}
                  className={styles.loginButton}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigate('/pageCadastro')}
                  className={styles.registerButton}
                >
                  CADASTRE-SE
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Search Bar (Visible when not scrolled) */}
        {!isScrolled && (
          <div className={styles.fullSearchSection}>
            <form onSubmit={handleSearchSubmit} className={styles.fullSearchContainer}>
              <div className={`${styles.searchBar} ${isSearchFocused ? styles.focused : ''}`}>
                <button type="submit" className={styles.searchButton}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar eventos, categorias, produtores..."
                  className={styles.searchInput}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.clearSearchButton}
                    onClick={() => setSearchQuery('')}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

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
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Overlay Menu */}
      {isMenuOpen && (
        <>
          <div
            className={styles.menuOverlay}
            onClick={() => setIsMenuOpen(false)}
            style={{ top: `${scrollPosition}px`, height: `calc(100vh + ${scrollPosition}px)` }}
            aria-hidden="true"
          />
          <div
            className={`${styles.menuDropdown} ${isMenuOpen ? styles.open : ''}`}
            style={{ top: `${scrollPosition}px`, height: `calc(100vh - ${scrollPosition}px)` }}
          >
            <div className={styles.menuContent}>
              <h3 className={styles.menuTitle}>Menu</h3>
              <ul className={styles.menuItems}>
                <li className={styles.menuItem} onClick={() => navigateTo('/')}>
                  <span>Home</span>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </li>
                <li className={styles.menuItem} onClick={() => navigateTo('/eventos')}>
                  <span>Eventos</span>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                  </svg>
                </li>
                <li className={styles.menuItem} onClick={() => navigateTo('/categorias')}>
                  <span>Categorias</span>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2l-5.5 9h11z" />
                    <circle cx="17.5" cy="17.5" r="4.5" />
                    <path d="M3 13.5h8v8H3z" />
                  </svg>
                </li>
                <li className={styles.menuItem} onClick={() => navigateTo('/aboutus')}>
                  <span>Sobre Nós</span>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </li>
                <li className={styles.menuItem} onClick={() => navigateTo('/contato')}>
                  <span>Contato</span>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </li>
              </ul>
              <div className={styles.menuAuthButtons}>
                <button
                  onClick={() => navigateTo('/paginaLogin')}
                  className={styles.menuLoginButton}
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('/pageCadastro')}
                  className={styles.menuRegisterButton}
                >
                  Cadastre-se
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.headerSpacer} />
    </>
  );
}