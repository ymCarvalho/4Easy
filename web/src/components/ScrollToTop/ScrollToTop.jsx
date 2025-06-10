import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que rola a página para o topo sempre que a rota muda
 * @component
 * @example
 * return (
 *   <Router>
 *     <ScrollToTop />
 *     <Routes>...</Routes>
 *   </Router>
 * )
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rolagem instantânea para o topo
    window.scrollTo(0, 0);
    
    // Alternativa para rolagem suave (descomente se preferir):
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]); // Executa sempre que o pathname mudar

  return null; // Este componente não renderiza nada visível
}