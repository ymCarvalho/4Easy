// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Screens/Home/Home.jsx';
import PaginaLogin from '../Screens/PaginaLogin/PaginaLogin.jsx';
import AboutUs from '../Screens/AboutUs/AboutUs.jsx';

function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutUs/>} />          {/* Rota raiz */}
        <Route path="/home" element={<Home />} />      {/* Rota alternativa */}
        <Route  path='/paginaLogin' element={<PaginaLogin/>} />
        <Route  path='/aboutUs' element={<AboutUs/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigator;
