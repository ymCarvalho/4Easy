import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pagina1() {
//javascript
    const navigate = useNavigate();
  
    const voltar = () => {
      // Você pode fazer lógica aqui antes de navegar
      navigate('../Home/Home.jsx');
    };

  return (

    //html

    <div>
      <h1>Pagina1</h1>
      <button onClick={voltar}>Voltar</button>
    </div>
    
  );
}

