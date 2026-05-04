import { motion } from "framer-motion";

export default function Particles({ count = 30, color = "#a855f7" }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0
          }}
          animate={{
            opacity: [0, 0.4 + Math.random() * 0.4, 0],
            x: [
              Math.random() * 100 + "%",
              (Math.random() * 80 + 10) + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              (Math.random() * 80 + 10) + "%",
              Math.random() * 100 + "%"
            ],
            scale: [0, Math.random() * 0.8 + 0.2, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            backgroundColor: color,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 2 + 1}px ${color}40`
          }}
        />
      ))}
    </div>
  );
}
