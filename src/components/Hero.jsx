import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-zinc-950 text-white overflow-hidden">

      {/* VÍDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Substitua por um vídeo real do DJ ou use este placeholder de festa/luzes */}
          <source src="/video-hero.mp4" type="video/mp4" />
          {/* Fallback para imagem se o vídeo não carregar */}
          <img src="/capa.jpg" alt="DJ CYRIO" className="w-full h-full object-cover" />
        </video>

        {/* Máscara escura + gradiente roxo animado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/20 to-zinc-950"></div>

        {/* Overlay de vinheta para focar no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
      </div>

      {/* ANÉIS DE ENERGIA GIRATÓRIOS */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {/* Anel 1 - Giro horário */}
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-purple-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 60px rgba(168, 85, 247, 0.1)" }}
        />
        {/* Anel 2 - Giro anti-horário */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-purple-400/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Anel 3 - Interno pulsante */}
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border-2 border-dashed border-purple-600/30"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* PARTÍCULAS FLUTUANTES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [null, null, -100],
              x: [null, null, (Math.random() - 0.5) * 200]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full blur-[2px]"
            style={{
              boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.6)"
            }}
          />
        ))}
      </div>

      {/* PARTÍCULAS DE ENERGIA - BORDAS */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`edge-${i}`}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? 0 : window.innerWidth,
              y: i % 2 === 0 ? window.innerHeight * Math.random() : 0
            }}
            animate={{
              opacity: [0, 0.8, 0],
              x: i % 2 === 0 ? 0 : -window.innerWidth,
              y: i % 2 === 0 ? -window.innerHeight : 0
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              boxShadow: "0 0 20px 4px rgba(168, 85, 247, 0.8)"
            }}
          />
        ))}
      </div>

      {/* Conteúdo Animado */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="z-20 flex flex-col items-center text-center px-4 w-full"
      >
        {/* Logo com glow pulsante */}
        <motion.img
          src="/logo_branco_recortado.png"
          alt="Logo CYRIO"
          className="w-[80vw] md:w-[45vw] max-w-lg h-auto mb-8 drop-shadow-[0_10px_35px_rgba(168,85,247,0.5)]"
          animate={{
            scale: [1, 1.02, 1],
            filter: ["drop-shadow(0 10px 35px rgba(168,85,247,0.5))", "drop-shadow(0 15px 45px rgba(168,85,247,0.7))", "drop-shadow(0 10px 35px rgba(168,85,247,0.5))"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.p
          className="text-sm md:text-xl font-light text-zinc-300 mb-10 tracking-[0.3em] uppercase drop-shadow-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: 1,
            x: 0,
            textShadow: [
              "0 0 10px rgba(168, 85, 247, 0.3)",
              "0 0 20px rgba(168, 85, 247, 0.6)",
              "0 0 10px rgba(168, 85, 247, 0.3)"
            ]
          }}
          transition={{
            delay: 0.8,
            duration: 1,
            textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          DJ & Produtor • Funk | ID • Só Mandela Avançado
        </motion.p>

        {/* Botão Contrate com efeitos de energia */}
        <Link to="/contato">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(168, 85, 247, 0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] transition-shadow duration-300 cursor-pointer group"
          >
            {/* Efeito de brilho passando pelo botão */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            {/* Glow pulsante interno */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-300"
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(168, 85, 247, 0)",
                  "inset 0 0 40px rgba(168, 85, 247, 0.3)",
                  "inset 0 0 20px rgba(168, 85, 247, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10 group-hover:text-purple-500 transition-colors">Contrate</span>
          </motion.button>
        </Link>

        {/* Efeito de RAIO - Flash aleatório */}
        <motion.div
          className="absolute inset-0 z-[-1] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 8 + Math.random() * 4,
          }}
          style={{
            background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)"
          }}
        />

      </motion.div>

      {/* Scroll indicator animado */}
      <motion.div
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 bg-purple-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
