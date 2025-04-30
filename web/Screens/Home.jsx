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

    //html #1400b4-cor principal 
    <>
      //html
      <header>
        <img src="" alt="" />
      </header><div>
        <h1>Página Home</h1>
        <button onClick={proxima}>proxima</button>
      </div></>
    
  );
}

