import { motion } from "framer-motion";

export default function ImageGrid({ images, onImageClick, className = "" }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 ${className}`}>
      {images.map((image, index) => {
        // Animamos as 6 primeiras fotos (2 fileiras no desktop) direto!
        const animarDireto = index < 6;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={animarDireto ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            whileInView={!animarDireto ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1, // O delay em cascata vai ficar lindo aqui
              type: "spring",
              stiffness: 100
            }}
            onClick={() => onImageClick && onImageClick(image.src || image, false, image.alt || image.title)}
            className="relative overflow-hidden rounded-2xl aspect-square bg-zinc-900 shadow-[0_0_30px_rgba(168,85,247,0.15)] border border-purple-500/10 group cursor-pointer"
          >
            <img
              src={image.src || image}
              alt={image.alt || image.title || `Imagem ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />

            {/* Overlay com gradiente animado */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Borda glow animada */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.4)"
              }}
            />

            {/* Texto de hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="px-6 py-3 bg-purple-600/90 backdrop-blur-sm rounded-full border border-purple-400/50"
              >
                <p className="text-white text-sm font-bold uppercase tracking-widest">
                  Visualizar
                </p>
              </motion.div>
            </div>

            {/* Número da imagem */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
              <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}