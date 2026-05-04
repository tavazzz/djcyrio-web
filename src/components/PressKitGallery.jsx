import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const encodeMediaSrc = (src) => src.split("/").map((segment) => encodeURIComponent(segment)).join("/");

export default function PressKitGallery() {
  const [activeTab, setActiveTab] = useState("show");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideoModal, setIsVideoModal] = useState(false);
  const scrollContainerRef = useRef(null);

  // Lista de imagens de Shows (16 fotos)
  const imagensShow = [
    "/press-kit/fotos/fotos-show/DSC05357.jpg",
    "/press-kit/fotos/fotos-show/DSC05371.jpg",
    "/press-kit/fotos/fotos-show/DSC05413.jpg",
    "/press-kit/fotos/fotos-show/DSC05415.jpg",
    "/press-kit/fotos/fotos-show/IMG_9087.JPG",
    "/press-kit/fotos/fotos-show/IMG_9100.JPG",
    "/press-kit/fotos/fotos-show/IMG_9106.JPG",
    "/press-kit/fotos/fotos-show/IMG_9107.JPG",
    "/press-kit/fotos/fotos-show/7e37ef9f-23da-4525-abd4-8520cbd8ddf0.jpg",
    "/press-kit/fotos/fotos-show/7e37ef9f-23da-4525-abd4-8520cbd8ddf0(1).jpg",
    "/press-kit/fotos/fotos-show/8ca72cef-86c1-4cca-b9f0-e1a9fce9cbd7.jpg",
    "/press-kit/fotos/fotos-show/enryclick (38).jpg",
    "/press-kit/fotos/fotos-show/Cópia de DSC08537.jpg",
  ];

  // Lista de imagens de Studio (10 fotos)
  const imagensStudio = [
    "/press-kit/fotos/fotos-studio/IMG_8448.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8452.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8458.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8509.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8517.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8527.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8542.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8543.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8554.jpg",
    "/press-kit/fotos/fotos-studio/IMG_8580.jpg",
  ];


 // Vídeos (Agora com 4 vídeos)
  const videos = [
    { src: "public/press-kit/videos/DJCyrio.MP4", title: "MANGO SESSIONS HIGHLIGHTS" },
    { src: "public/press-kit/videos/Comercial Video - DJ CYRIO.mp4", title: "COMERCIAL CYRIO" },
    { src: "public/press-kit/videos/HighLights - Cyrio Atipica.mp4", title: "Atípica Session" },
    { src: "public/press-kit/videos/Comercial Video Dj Cyrio 21.11.mp4", title: "TECH FUNK @ HONEY CLUB" },
  ];

  const imagensAtivas = activeTab === "show" ? imagensShow : imagensStudio;

  // Auto-scroll suave para mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let direction = 1;
    let animationId;

    const autoScroll = () => {
      if (window.innerWidth < 768) {
        scrollAmount += direction * 0.5;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          direction = -1;
        } else if (scrollAmount <= 0) {
          direction = 1;
        }
        container.scrollLeft = scrollAmount;
        animationId = requestAnimationFrame(autoScroll);
      }
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [activeTab]);

  const handleMediaClick = (src, isVideo = false) => {
    setSelectedMedia(src);
    setIsVideoModal(isVideo);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsVideoModal(false);
  };

  // Tabs de navegação
  const tabs = [
    { id: "show", label: "Shows", count: imagensShow.length },
    { id: "studio", label: "Studio", count: imagensStudio.length },
    { id: "videos", label: "Vídeos", count: videos.length },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
            Press Kit
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
            GALERIA <span className="text-purple-500">OFICIAL</span>
          </h3>
        </motion.div>

        {/* Tabs de Navegação */}
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? "bg-white/20" : "bg-zinc-700"
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-purple-600 -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            /* GRID DE VÍDEOS */
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
            >
              {videos.map((video, index) => (
                <VideoCard
                  key={video.src}
                  video={video}
                  index={index}
                  onClick={() => handleMediaClick(video.src, true)}
                />
              ))}
            </motion.div>
          ) : (
            /* CARROSSEL HORIZONTAL DE FOTOS 9:16 */
            <motion.div
              key="fotos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {imagensAtivas.map((src, index) => (
                  <PhotoCard
                    key={src}
                    src={src}
                    index={index}
                    onClick={() => handleMediaClick(src, false)}
                  />
                ))}
              </div>

              {/* Dica de scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-4 text-zinc-500 text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Deslize para ver mais
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
    </section>
  );
}

// Card de Foto 9:16
// Card de Foto 9:16
function PhotoCard({ src, index, onClick }) {
  // As primeiras 4 fotos carregam instantaneamente, as outras esperam o scroll
  const animarDireto = index < 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={animarDireto ? { opacity: 1, scale: 1, y: 0 } : undefined}
      whileInView={!animarDireto ? { opacity: 1, scale: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      onClick={onClick}
      className="flex-shrink-0 w-[280px] md:w-[350px] cursor-pointer group"
    >
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] border border-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300">
        <img
          src={encodeMediaSrc(src)}
          alt={`Foto ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 40px rgba(168, 85, 247, 0.3)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="w-14 h-14 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.div>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
          <span className="text-purple-300 font-bold text-xs">{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Card de Vídeo
// Card de Vídeo
function VideoCard({ video, index, onClick }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  // Os primeiros 3 vídeos carregam instantaneamente
  const animarDireto = index < 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={animarDireto ? { opacity: 1, y: 0 } : undefined}
      whileInView={!animarDireto ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group"
    >
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300">
        <video
          ref={videoRef}
          src={encodeMediaSrc(video.src)}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
          onLoadedMetadata={() => setThumbnailLoaded(true)}
        />
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isHovered ? "opacity-70" : "opacity-50"}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
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
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h4 className="text-lg font-bold uppercase tracking-wide text-white group-hover:text-purple-400 transition-colors">
            {video.title}
          </h4>
        </div>
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 40px rgba(168, 85, 247, 0.3)" }}
        />
      </div>
    </motion.div>
  );
}

// Modal Lightbox para Fotos e Vídeos
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
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-purple-500 transition-colors z-[101] p-2 rounded-full hover:bg-white/10"
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
