import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const encodeMediaSrc = (src) => src.split("/").map((segment) => encodeURIComponent(segment)).join("/");

export default function Highlights() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideoModal, setIsVideoModal] = useState(false);

  // Seleção dos melhores momentos (highlights)
  const highlights = [
    {
      type: "video",
      src: "/press-kit/videos/HighLights - Cyrio Atipica.mp4",
      title: "Apresentação CYRIO @ MANGO_CLUB",
      featured: true
    },
    {
      type: "foto",
      src: "/press-kit/fotos/fotos-show/DSC05357.jpg",
      title: "LIVE @ HONEY_CLUB"
    },
    {
      type: "foto",
      src: "/press-kit/fotos/fotos-show/DSC05413.jpg",
      title: "LIVE @ HONEY_CLUB"
    },
    {
      type: "foto",
      src: "/press-kit/fotos/fotos-studio/IMG_8458.jpg",
      title: "Studio Session"
    },
    {
      type: "foto",
      src: "/press-kit/fotos/fotos-show/8ca72cef-86c1-4cca-b9f0-e1a9fce9cbd7.jpg",
      title: "@ PINK_ELEPHANT"
    },
    {
      type: "foto",
      src: "/press-kit/fotos/fotos-show/enryclick (38).jpg",
      title: "Momento Épico"
    },
  ];

  const handleMediaClick = (src, isVideo) => {
    setSelectedMedia(src);
    setIsVideoModal(isVideo);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsVideoModal(false);
  };

  return (
    <>
      <section className="py-24 px-4 md:px-12 bg-zinc-950 text-white overflow-hidden relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2"
            >
              Experiência
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase mb-4"
            >
              MOMENTOS <span className="text-purple-500">MEMORÁVEIS</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto px-4"
            >
              
            </motion.p>
          </motion.div>

          {/* Grid de Highlights - Layout impactante */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Item 1 - Grande destaque (vídeo) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 row-span-2 md:col-span-2 md:row-span-2"
            >
              <HighlightCard
                media={highlights[0]}
                index={0}
                onClick={() => handleMediaClick(highlights[0].src, true)}
                size="large"
              />
            </motion.div>

            {/* Items 2-5 */}
            {highlights.slice(1, 5).map((media, index) => (
              <motion.div
                key={media.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.4) }}
              >
                <HighlightCard
                  media={media}
                  index={index + 1}
                  onClick={() => handleMediaClick(media.src, media.type === "video")}
                  size="small"
                />
              </motion.div>
            ))}
          </div>

          {/* Botão Ver Galeria Completa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/galeria"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-105 group"
            >
              Ver Galeria Completa
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MODAL LIGHTBOX */}
      <AnimatePresence>
        {selectedMedia && (
          <LightboxModal
            src={selectedMedia}
            isVideo={isVideoModal}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Card de Highlight
function HighlightCard({ media, index, onClick, size }) {
  const isLarge = size === "large";

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group h-full"
    >
      <div
        className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-zinc-900 shadow-[0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300 ${
          isLarge ? "aspect-[9/16] md:aspect-auto md:h-full" : "aspect-[9/16]"
        }`}
      >
        {/* Conteúdo */}
        {media.type === "video" ? (
          <>
            <video
              src={encodeMediaSrc(media.src)}
              muted
              loop
              playsInline
              preload="metadata"
              // O SEGREDO ESTÁ AQUI: a imagem de capa antes do play
             poster="/press-kit/fotos/fotos-show/IMG_9087.JPG"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Ícone Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-0 h-0 border-l-[14px] border-l-white border-y-[10px] border-y-transparent ml-1"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <img
              src={encodeMediaSrc(media.src)}
              alt={media.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow interno */}
            <div
              className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.25)" }}
            />
          </>
        )}

        {/* Título */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent ${isLarge ? 'md:absolute' : ''}`}>
          <h4 className={`font-bold uppercase tracking-wide text-white group-hover:text-purple-400 transition-colors ${isLarge ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>
            {media.title}
          </h4>
        </div>

        {/* Badge de tipo */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
          {media.type === "video" ? (
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal Lightbox
function LightboxModal({ src, isVideo, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
    >
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-purple-500 transition-colors z-[101] p-2 rounded-full hover:bg-white/10 transition-transform hover:scale-110"
        aria-label="Fechar"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Conteúdo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, type: "spring" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-full max-h-full"
      >
        {isVideo ? (
          <div className="relative w-full max-w-2xl md:max-w-4xl aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.4)] border border-purple-500/20">
            <video
              src={encodeMediaSrc(src)}
              controls
              autoPlay
              className="w-full h-full"
              style={{ maxHeight: "90vh" }}
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={encodeMediaSrc(src)}
              alt="Ampliada"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-[0_0_60px_rgba(168,85,247,0.3)] border border-purple-500/20"
              style={{ maxHeight: "90vh" }}
            />
            {/* Glow de fundo */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent blur-3xl" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
