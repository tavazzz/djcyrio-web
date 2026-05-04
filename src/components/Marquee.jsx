import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="w-full bg-purple-600 py-4 overflow-hidden flex items-center border-y border-purple-400/30">
      <motion.div
        className="flex whitespace-nowrap text-white font-black text-4xl tracking-widest uppercase"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        
        <span className="mx-8">• DJ CYRIO</span>   
        <span className="mx-8">• SÓ MANDELA AVANÇADO</span>
        <span className="mx-8">• FUNK | ID</span>
        <span className="mx-8">• FUNK</span>
        <span className="mx-8">• SUBMUNDO</span>
        <span className="mx-8">• DJ CYRIO</span>   
        <span className="mx-8">• SÓ MANDELA AVANÇADO</span>
        <span className="mx-8">• FUNK | ID</span>
        <span className="mx-8">• FUNK</span>
        <span className="mx-8">• SUBMUNDO</span>
    
      </motion.div>
    </div>
  );
}