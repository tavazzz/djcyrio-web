import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Agenda from "./pages/Agenda";
import Galeria from "./pages/Galeria";

// Componente wrapper para animação das rotas
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      {/* O SEGREDO ESTÁ AQUI: onExitComplete */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/galeria" element={<Galeria />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="bg-zinc-950 min-h-screen font-sans flex flex-col">
          <Header />
          <div className="flex-grow">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;