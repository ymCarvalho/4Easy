import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageCadastro.module.css';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import PaginaLogin from '../PaginaLogin/PaginaLogin.jsx';

export default function PageCadastro() {
    const navigate = useNavigate();
  
    const voltar = () => {
        navigate('/home');
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <div className={styles.mainContent}>
                <div className={styles.cadastroWrapper}>
                    <div className={styles.logoSide}>
                        <img 
                            src='../src/assets/Logo4eBranco.png' 
                            alt="Logo da Empresa" 
                            className={styles.logoImage}
                        />
                    </div>
                    
                    <div className={styles.cadastroContainer}>
                        <h1>Cadastro</h1>
                        
                        <form>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Nome de usuário*</label>
                                <input type="text" id="username" required />
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="cpf">CPF*</label>
                                    <input type="text" id="cpf" required />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">E-mail*</label>
                                    <input type="email" id="email" required />
                                </div>
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Senha*</label>
                                    <input type="password" id="password" required />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Telefone*</label>
                                    <input type="tel" id="phone" required />
                                </div>
                            </div>
          
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">Sexo*</label>
                                    <select id="gender" required>
                                        <option value="">Selecione</option>
                                        <option value="male">Masculino</option>
                                        <option value="female">Feminino</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="birthdate">Data de Nascimento*</label>
                                    <input type="date" id="birthdate" required />
                                </div>
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Endereço*</label>
                                <input type="text" id="address" required />
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="city">Cidade*</label>
                                    <input type="text" id="city" required />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="cep">CEP*</label>
                                    <input type="text" id="cep" required />
                                </div>
                            </div>
                            
                            <button type="submit" className={styles.cadastroButton}>Cadastrar</button>

                            <div className={styles.loginContainer}>
                                <span>Já tem conta? </span>
                                <a href="../PaginaLogin/PaginaLogin.jsx" className={styles.loginLink}>Faça login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}