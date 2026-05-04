import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgress from "./ScrollProgress";

// Extraí os links para facilitar a manutenção tanto no mobile quanto no desktop
const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/galeria", label: "Galeria" },
  { to: "/agenda", label: "Agenda" },
  { to: "/contato", label: "Contato" }
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <>
      <ScrollProgress />
      <header className="fixed top-0 w-full flex justify-between items-center px-6 md:px-10 py-6 text-white z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuAberto(false)}
          className="text-2xl font-black tracking-widest cursor-pointer hover:text-purple-500 transition-colors relative z-50 group"
        >
          <img
            src="/logo_branco_recortado.png"
            alt="Logo CYRIO"
            className="w-28 md:w-36 h-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300"
          />
        </Link>

        {/* NAVEGAÇÃO DESKTOP (Escondida no mobile, visível a partir de "md") */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest relative z-50">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative group transition-colors duration-300 hover:text-purple-400"
            >
              {item.label}
              {/* Efeito de underline sutil ao passar o mouse */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* BOTÃO HAMBÚRGUER ANIMADO MOBILE (Visível no mobile, escondido a partir de "md") */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none relative z-50 flex flex-col gap-[6px] p-2 group"
        >
          <span className={`block w-8 h-[3px] bg-white transition-all duration-300 rounded-full ${menuAberto ? "rotate-45 translate-y-[9px] bg-purple-500" : "group-hover:bg-purple-400"}`}></span>
          <span className={`block w-8 h-[3px] bg-white transition-all duration-300 rounded-full ${menuAberto ? "opacity-0" : "group-hover:bg-purple-400"}`}></span>
          <span className={`block w-8 h-[3px] bg-white transition-all duration-300 rounded-full ${menuAberto ? "-rotate-45 -translate-y-[9px] bg-purple-500" : "group-hover:bg-purple-400"}`}></span>
        </button>

      </header>

      {/* TELA DE MENU CHEIA - MOBILE OVERLAY */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            // Adicionei md:hidden aqui também por precaução, para garantir que o overlay suma se a tela for redimensionada
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl flex md:hidden flex-col items-center justify-center"
          >
            {/* Efeito de partículas no menu */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%"
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    y: [null, null, -50],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-1 h-1 bg-purple-500 rounded-full blur-[2px]"
                />
              ))}
            </div>

            {/* Conteúdo do menu Mobile */}
            <nav className="relative z-50 flex flex-col gap-8 text-3xl font-black uppercase tracking-widest text-center text-white">
              {NAV_LINKS.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    onClick={toggleMenu}
                    className="block relative group overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-purple-600 transition-all duration-300">
                      {item.label}
                    </span>

                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="absolute inset-0 text-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Rodapé do menu Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 text-center"
            >
              <p className="text-zinc-500 text-sm uppercase tracking-widest">
                São José dos Campos - SP
              </p>
              {/* Ícones de redes sociais mantidos */}
              <div className="flex gap-4 mt-4 justify-center">
                {/* ... (seus ícones SVG aqui) ... */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}