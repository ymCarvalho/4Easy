// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Screens/Home';
import Pagina1 from '../Screens/pagina1';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />      // Rota raiz adicionada
        <Route path="/Home" element={< Home/>} />
        <Route  path='/pagina1' element={< Pagina1/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
