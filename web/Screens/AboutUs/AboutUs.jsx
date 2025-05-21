import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer.jsx";
import styles from "./AboutUs.module.css";
import AlternativeHeader from "../AlternativeHeader/AlternativeHeader.jsx";


export default function AboutUs() {

    return (

        <>

           <AlternativeHeader/>

               
            
            
            <body>
                <div className={styles.boxContainer}>
                    <div className={styles.imgContainer}>

                        <img
                            src=''
                            alt='Foto da Logo 4e'
                            className='styles.img'
                        ></img>

                    </div>
                    <div className={styles.txtContainer}>
                        Xoxota e xoxota e xoxota e xoxota
                        e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota e xoxota



                    </div>
                </div>


            </body>
            <Footer />
        </>



    );
}

