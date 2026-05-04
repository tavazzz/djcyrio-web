import { motion } from "framer-motion";
import { useMemo } from "react";

// Gerar valores aleatórios uma vez no nível do módulo
const generateParticleData = () => {
  return [...Array(10)].map(() => ({
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 3,
  }));
};

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  const particleData = useMemo(() => generateParticleData(), []);

  return (
    <footer className="relative bg-black py-16 px-6 border-t border-zinc-900 overflow-hidden">

      {/* Glow de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Partículas sutis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: particle.x,
              y: particle.y
            }}
            animate={{
              opacity: [0, 0.2, 0],
              y: [null, null, -30],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
            className="absolute w-1 h-1 bg-purple-500 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Logo com glow */}
        <motion.img
          src="/logo_branco_recortado.png"
          alt="Logo CYRIO"
          className="w-40 md:w-56 h-auto mb-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          whileHover={{ scale: 1.05 }}
        />

        {/* Redes Sociais - Ícones grandes */}
        <div className="flex justify-center gap-6 mb-10">
          {[
            {
              href: "https://www.instagram.com/dj.cyrio/",
              label: "Instagram",
              icon: (
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              )
            },
            {
              href: "https://soundcloud.com/djcyrio",
              label: "SoundCloud",
              icon: (
                <path d="M11.568 7.908l-3.783.074c-.906 0-1.66.66-1.66 1.57v5.852c0 .884.716 1.597 1.6 1.597h9.749c.884 0 1.6-.713 1.6-1.597v-3.96c0-.884-.716-1.597-1.6-1.597h-.25c-.176-1.712-1.518-3.056-3.216-3.056-.31 0-.604.05-.884.136l-1.556-2.974s-.66.992-1.6 1.955zM7.785 7.908c.234-.79.336-1.82.336-1.82s-.352 1.284-1.496 1.82h1.16zm-2.48 0c-.29-.79-.392-1.82-.392-1.82s.408 1.284 1.552 1.82H5.305zm-2.536 0c-.234-.79-.336-1.82-.336-1.82s.352 1.284 1.496 1.82H2.77z" />
              )
            },
            {
              href: "https://www.youtube.com/@DJCYRIO",
              label: "YouTube",
              icon: (
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              )
            },
            {
              href: "https://open.spotify.com/intl-pt/artist/7hlUm6PnC1UNORVacWbdyz",
              label: "Spotify",
              icon: (
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.36-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              )
            }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-300">
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </div>

              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </span>

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Contato */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-500 font-light mb-3 uppercase tracking-widest text-sm">
            Bookings & Parcerias
          </p>
          <motion.a
            href="https://wa.me/5512996300394"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-2xl md:text-3xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            +55 (12) 99630-0394
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-purple-900 to-transparent mb-8" />

        {/* Copyright */}
        <motion.p
          className="text-zinc-700 text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {anoAtual} DJ CYRIO • São José dos Campos - SP
        </motion.p>

        <motion.p
          className="text-zinc-800 text-[10px] tracking-wider mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Todos os direitos reservados.
        </motion.p>

      </div>
    </footer>
  );
}
