// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Screens/Home/Home.jsx';
import PaginaLogin from '../Screens/PaginaLogin/PaginaLogin.jsx';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaLogin/>} />          {/* Rota raiz */}
        <Route path="/home" element={<Home />} />      {/* Rota alternativa */}
        <Route  path='/PaginaLogin' element={<PaginaLogin/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
