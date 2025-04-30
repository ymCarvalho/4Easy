// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Screens/Home/Home.jsx';
import Pagina1 from '../Screens/Pagina1/Pagina1.jsx';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />          {/* Rota raiz */}
        <Route path="/home" element={<Home />} />      {/* Rota alternativa */}
        <Route  path='/pagina1' element={<Pagina1/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
