import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "../components/Particles";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

const encodeMediaSrc = (src) => src.split("/").map((segment) => encodeURIComponent(segment)).join("/");

export default function Galeria() {
  const [activeTab, setActiveTab] = useState("show");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideoModal, setIsVideoModal] = useState(false);
  const scrollContainerRef = useRef(null);

  // Lista de imagens de Shows
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

  // Lista de imagens de Studio
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

  // Vídeos (Agora com 3 vídeos e títulos atualizados)
  const videos = [
    { src: "/press-kit/videos/DJCyrio.MP4", title: "MANGO SESSIONS HIGHLIGHTS" },
    { src: "/press-kit/videos/Comercial Video - DJ CYRIO.mp4", title: "COMERCIAL CYRIO" },
    { src: "/press-kit/videos/HighLights - Cyrio Atipica.mp4", title: "Atípica Session" },
    
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
    <PageTransition>
      <SEO
        title="Galeria DJ CYRIO"
        description="Galeria completa do DJ CYRIO: fotos de shows, sessões de estúdio e vídeos. Explore o trabalho visual e artístico."
        keywords="DJ CYRIO, galeria, fotos, shows, estúdio, vídeos, Thiago Pedroso"
        image="/capa.jpg"
        url="https://djcyrio.com/galeria"
      />
      <section className="min-h-screen py-32 px-4 md:px-12 bg-zinc-950 text-white overflow-hidden">
        <Particles count={30} color="#a855f7" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2"
            >
              Press Kit
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl font-black tracking-tight leading-tight uppercase mb-4"
            >
              GALERIA <span className="text-purple-500">OFICIAL</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              Fotos e vídeos dos melhores momentos ao vivo e sessões exclusivas
            </motion.p>
          </motion.div>

          {/* Tabs de Navegação - Melhoradas para mobile */}
          <div className="flex justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-105"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-zinc-700"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Conteúdo */}
          <AnimatePresence mode="wait">
            {activeTab === "videos" ? (
            
              /* GRID DE VÍDEOS - Ajustado para 3 colunas perfeitas */
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
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
              /* GRID DE FOTOS 9:16 - Responsivo */
              <motion.div
                key="fotos"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {imagensAtivas.map((src, index) => (
                    <PhotoCard
                      key={src}
                      src={src}
                      index={index}
                      onClick={() => handleMediaClick(src, false)}
                    />
                  ))}
                </div>
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
    </PageTransition>
  );
}

// Card de Foto 9:16
function PhotoCard({ src, index, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  // As primeiras 10 fotos carregam a animação na hora, as outras aguardam o scroll
  const animarDireto = index < 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={animarDireto ? { opacity: 1, scale: 1 } : undefined}
      whileInView={!animarDireto ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300 bg-zinc-900">
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        )}
        <img
          src={encodeMediaSrc(src)}
          alt={`Foto ${index + 1}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.25)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="w-12 h-12 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.div>
        </div>
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
          <span className="text-purple-300 font-bold text-[10px]">{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Card de Vídeo
function VideoCard({ video, index, onClick }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // Todos os 4 vídeos carregam a animação na hora
  const animarDireto = index < 4;

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
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 shadow-[0_0_25px_rgba(168,85,247,0.15)] border border-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300">
        <video
          ref={videoRef}
          src={encodeMediaSrc(video.src)}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
        />
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isHovered ? "opacity-70" : "opacity-50"}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h4 className="text-sm md:text-lg font-bold uppercase tracking-wide text-white group-hover:text-purple-400 transition-colors line-clamp-2">
            {video.title}
          </h4>
        </div>
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.25)" }}
        />
      </div>
    </motion.div>
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-purple-500 transition-colors z-[101] p-2 rounded-full hover:bg-white/10 transition-transform hover:scale-110"
        aria-label="Fechar"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

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
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent blur-3xl" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}