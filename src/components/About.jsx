import { motion } from "framer-motion";
import Particles from "./Particles";

export default function About() {
  return (
    <section id="sobre" className="relative py-24 px-6 md:px-12 bg-black text-white flex flex-col items-center border-t border-zinc-900 overflow-hidden">

      {/* Partículas de fundo */}
      <Particles count={25} color="#a855f7" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Coluna da Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          // Modificado: animate no lugar de whileInView
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow animado atrás da imagem */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-purple-400/30 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Imagem com borda glow */}
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] border border-purple-500/20">
            <img
              src="/perfil.jpg"
              alt="DJ CYRIO PERFIL"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay gradiente animado */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-purple-900/20 opacity-50" />
          </div>
        </motion.div>

        {/* Coluna do Texto (Biografia) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          // Modificado: animate no lugar de whileInView
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              // Modificado: animate no lugar de whileInView
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
                Bio
              </h2>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              // Modificado: animate no lugar de whileInView
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
            >
              Thiago,<br />
              conhecido como<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 animate-pulse">
                CYRIO
              </span>
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            // Modificado: animate no lugar de whileInView
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-zinc-300 text-lg font-light leading-relaxed">
              Thiago Pedroso, mais conhecido como <strong className="text-purple-400">DJ CYRIO</strong>, nasceu e vive em São José dos Campos. Desde muito cedo, a música esteve presente em sua vida, influenciado por familiares que já fizeram parte de bandas. O contato com instrumentos musicais despertou sua paixão, e na adolescência ele decidiu transformar esse amor em arte, começando a produzir suas próprias músicas.
            </p>
            <p className="text-zinc-300 text-lg font-light leading-relaxed">
              Apaixonado pelo funk e suas diversas vertentes, DJ CYRIO se destaca com seus sets no SoundCloud e também com suas faixas autorais disponíveis no Spotify, levando sua identidade única ao público e conquistando cada vez mais ouvintes. Já se apresentou em casas conhecidas da cena como <strong className="text-purple-400">Obeco</strong>, <strong className="text-purple-400">Santonofre</strong>, <strong className="text-purple-400">Palácio Sunset</strong> e <strong className="text-purple-400">Honey.Club</strong>, e foi responsável por abrir o show do Filipe Ret no Palácio Sunset, consolidando seu nome como um dos nomes promissores do cenário.
            </p>
          </motion.div>

          {/* Divider animado */}
          <motion.div
            initial={{ scaleX: 0 }}
            // Modificado: animate no lugar de whileInView
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="h-px bg-gradient-to-r from-purple-600 via-purple-400 to-transparent w-full mt-4"
          />
        </motion.div>

      </div>
    </section>
  );
}