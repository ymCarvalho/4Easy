import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
//javascript
    const navigate = useNavigate();
  
    const proxima = () => {
      // Você pode fazer lógica aqui antes de navegar
      navigate('/Pagina1');
    };

  return (

    //html

    <div>
      <h1>Página Home</h1>
      <button onClick={proxima}>paroxima</button>
    </div>
    
  );
}

