import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaginaLogin.module.css';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

export default function PaginaLogin() {
    const navigate = useNavigate();
  
    const voltar = () => {
        navigate('/home');
    };

    return (
        <div className={styles.pageContainer}>

           
            <Header />
            
            <div className={styles.mainContent}>
                
                <div className={styles.loginWrapper}>
                    <div className={styles.logoSide}>
                        
                          <img 
                         
                               src='../src/assets/Logo4eBranco.png'  alt="Logo da Empresa" className={styles.logoImage}
                            />
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
                                <div className={styles.leftOptions}>
                                    <div className={styles.rememberMe}>
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Lembrar conta</label>
                                    </div>
                                    <a href="#" className={styles.forgotPassword}>Esqueci a senha*</a>
                                </div>
                            </div>
                            
                            <button type="submit" className={styles.loginButton}>Login</button>

                            <div className={styles.registerContainer}>
                                <span>Não tem conta? </span>
                                <a href="#" className={styles.registerLink}>Cadastre-se</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}