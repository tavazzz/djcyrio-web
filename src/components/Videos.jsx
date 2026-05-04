import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { youtubeVideos } from "../data/media";

export default function Videos() {
  const [videoSelecionado, setVideoSelecionado] = useState(null);

  return (
    <>
      <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white flex flex-col items-center border-t border-zinc-900">
        <div className="max-w-7xl w-full">

          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
              Mídia
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              VÍDEOS & <br />PERFORMANCES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youtubeVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setVideoSelecionado(video.videoId)}
                className="relative group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Assistir vídeo: ${video.titulo}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setVideoSelecionado(video.videoId);
                  }
                }}
              >
                {/* Container do vídeo com glow */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-shadow duration-300">

                  {/* Thumbnail */}
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={`Thumbnail do vídeo: ${video.titulo}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Overlay escuro */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

                    {/* Botão de Play animado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center border-2 border-purple-400/50"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        <motion.div
                          className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>

                    {/* Glow animado nas bordas */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.3)"
                      }}
                    />
                  </div>

                  {/* Título */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <h4 className="text-xl font-bold uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                      {video.titulo}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL DE VÍDEO (Lightbox) */}
      <AnimatePresence>
        {videoSelecionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoSelecionado(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <button
              onClick={() => setVideoSelecionado(null)}
              className="absolute top-8 right-8 text-white hover:text-purple-500 transition-colors z-[101] p-2 rounded-full hover:bg-white/10"
              aria-label="Fechar vídeo"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoSelecionado}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                id="video-modal-title"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
