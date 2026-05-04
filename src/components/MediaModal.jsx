import { motion, AnimatePresence } from "framer-motion";

export default function MediaModal({ isOpen, onClose, src, isVideo, title }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl max-h-[90vh] w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 z-10 text-white hover:text-purple-400 transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Conteúdo do Modal */}
          <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
            {isVideo ? (
              <video
                src={src}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] object-contain"
                title={title}
              />
            ) : (
              <img
                src={src}
                alt={title || "Imagem ampliada"}
                className="w-full h-auto max-h-[80vh] object-contain"
                loading="lazy"
              />
            )}

            {title && (
              <div className="p-4 bg-zinc-900">
                <h3 className="text-white text-lg font-bold text-center">{title}</h3>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}