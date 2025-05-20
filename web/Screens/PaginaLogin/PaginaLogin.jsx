import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaginaLogin.module.css';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";


export default function PaginaLogin() {
//javascript
    const navigate = useNavigate();
  
    const voltar = () => {
      // Você pode fazer lógica aqui antes de navegar
      navigate('./Home/Home.jsx'); // Navega para a rota "/home"
    };

  return (
    

          
    <div className={styles.loginWrapper}>
      <div className={styles.logoSide}>
        <div className={styles.logoPlaceholder}>LOGO AQUI</div>
      </div>
      
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email">Endereço de e-mail*</label>
            <input type="email" id="email" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha*</label>
            <input type="password" id="password" required />
          </div>
          
          <div className={styles.options}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Lembrar conta</label>
            </div>
            
            <a href="#" className={styles.registerLink}>Não tem conta?</a>
            <a href="#" className={styles.registerLink}>Cadastre-se</a>
          </div>
          
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>

        
        
    
      </div>
    </div>
  );
}

