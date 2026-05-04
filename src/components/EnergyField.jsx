import { motion } from "framer-motion";
import { useMemo } from "react";

// Gerar valores aleatórios uma vez no nível do módulo
const generateParticleData = () => {
  return [...Array(6)].map(() => ({
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    duration: 3 + Math.random() * 2,
  }));
};

/**
 * EnergyField - Campo de energia para adicionar em seções
 * Cria um efeito de "aura" animada que dá sensação de energia/movimento
 */
export default function EnergyField({ className = "" }) {
  const particleData = useMemo(() => generateParticleData(), []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Ondas de energia laterais */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Partículas de energia flutuantes */}
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [null, null, -80],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            boxShadow: "0 0 10px 3px rgba(168, 85, 247, 0.6)",
          }}
        />
      ))}

      {/* Linha de energia horizontal */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        animate={{
          opacity: [0, 0.3, 0],
          top: ["20%", "50%", "80%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
          boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.3)",
        }}
      />
    </div>
  );
}
