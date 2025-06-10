import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageCadastro.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import logoBranca from '@images/logos/Logo4eBranco.png'

export default function PageCadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        cpf: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        birthdate: '',
        address: '',
        city: '',
        cep: ''
    });

    const voltar = () => {
        navigate('/paginaLogin');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Aplicar máscaras conforme o campo
        let formattedValue = value;
        
        if (id === 'cpf') {
            // Máscara de CPF (000.000.000-00)
            formattedValue = value
                .replace(/\D/g, '') // Remove tudo que não é dígito
                .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após 3 dígitos
                .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após mais 3 dígitos
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca hífen antes dos últimos 2 dígitos
                .substring(0, 14); // Limita a 14 caracteres
        } else if (id === 'phone') {
            // Máscara de telefone ((00) 00000-0000)
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15);
        } else if (id === 'cep') {
            // Máscara de CEP (00000-000)
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{5})(\d)/, '$1-$2')
                .substring(0, 9);
        } else if (id === 'birthdate') {
            // Garante que o campo de data só aceite o formato correto
            formattedValue = value;
        } else {
            formattedValue = value;
        }
        
        setFormData(prev => ({
            ...prev,
            [id]: formattedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validações adicionais podem ser adicionadas aqui
        console.log('Formulário enviado:', formData);
        // Lógica para enviar os dados
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <div className={styles.mainContent}>
                <div className={styles.cadastroWrapper}>
                    <div className={styles.logoSide}>
                        <img 
                            src={logoBranca} 
                            alt="Logo da Empresa" 
                            className={styles.logoImage}
                        />
                    </div>
                    
                    <div className={styles.cadastroContainer}>
                        <h1>Cadastro</h1>
                        
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Nome de usuário*</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    value={formData.username}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="cpf">CPF*</label>
                                    <input 
                                        type="text" 
                                        id="cpf" 
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        placeholder="000.000.000-00"
                                        maxLength="14"
                                        required 
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">E-mail*</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Senha*</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        value={formData.password}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Telefone*</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(00) 00000-0000"
                                        maxLength="15"
                                        required 
                                    />
                                </div>
                            </div>
          
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">Sexo*</label>
                                    <select 
                                        id="gender" 
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="male">Masculino</option>
                                        <option value="female">Feminino</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="birthdate">Data de Nascimento*</label>
                                    <input 
                                        type="date" 
                                        id="birthdate" 
                                        value={formData.birthdate}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Endereço*</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    value={formData.address}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="city">Cidade*</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        value={formData.city}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="cep">CEP*</label>
                                    <input 
                                        type="text" 
                                        id="cep" 
                                        value={formData.cep}
                                        onChange={handleChange}
                                        placeholder="00000-000"
                                        maxLength="9"
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className={styles.cadastroButton}>Cadastrar</button>

                            <div className={styles.loginContainer}>
                                <span>Já tem conta? </span>
                                <button 
                                    type="button" 
                                    onClick={voltar} 
                                    className={styles.loginLink}
                                >
                                    Faça login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}