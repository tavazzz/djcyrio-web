import { motion, useMotionValue, useTransform, useSpring, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Gallery3D() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Dados da galeria - substitua com conteúdo real depois

  // Duplicar itens para criar loop infinito visual
  const extendedItems = [...items, ...items, ...items];
  const startIndex = items.length;

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Suporte a swipe/touch para mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    window.touchStartX = touch.clientX;
  };

  const handleTouchEnd = (e) => {
    if (!window.touchStartX) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = window.touchStartX - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    window.touchStartX = null;
  };

  return (
    <section
      className="py-24 px-4 md:px-12 bg-zinc-950 text-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
            Galeria
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
            MOMENTOS <span className="text-purple-500">AO VIVO</span>
          </h3>
        </motion.div>

        {/* Container do Carrossel 3D */}
        <div className="relative perspective-1000" ref={containerRef}>
          {/* Botão Esquerdo */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-600/80 backdrop-blur-sm border-2 border-purple-400/50 flex items-center justify-center hover:bg-purple-500 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botão Direito */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-600/80 backdrop-blur-sm border-2 border-purple-400/50 flex items-center justify-center hover:bg-purple-500 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            aria-label="Próximo"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carrossel */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            {items.map((item, index) => {
              // Calcular posição relativa ao item selecionado
              const offset = ((index - selectedIndex + items.length) % items.length);
              const positionOffset = offset - Math.floor(items.length / 2);

              const isActive = index === selectedIndex;
              const isVisible = Math.abs(positionOffset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleSelect(index)}
                  className={`absolute cursor-pointer transition-all duration-500 ease-out ${
                    isActive ? "z-20" : "z-10"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    x: positionOffset * (window.innerWidth < 768 ? 100 : 180),
                    z: isActive ? 10 : 5 - Math.abs(positionOffset),
                    rotateY: positionOffset * -15,
                    scale: isActive ? 1 : 0.8 - Math.abs(positionOffset) * 0.1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Card */}
                  <div
                    className={`relative w-[280px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)] border-2 transition-all duration-300 ${
                      isActive
                        ? "border-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.5)]"
                        : "border-zinc-700"
                    }`}
                  >
                    {/* Imagem */}
                    <div className="absolute inset-0 bg-zinc-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect fill='%231a1a1a' width='400' height='600'/%3E%3Ctext fill='%23333' font-size='48' text-anchor='middle' x='200' y='300'%3EDJ CYRIO%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />

                    {/* Ícone de tipo */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-purple-400/30">
                      {item.type === "video" ? (
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      )}
                    </div>

                    {/* Título */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </h4>
                      {isActive && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="w-full h-1 bg-purple-500 mt-3 origin-left"
                        />
                      )}
                    </motion.div>

                    {/* Glow nas bordas quando ativo */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 60px rgba(168, 85, 247, 0.2)",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicadores de página */}
          <div className="flex justify-center gap-3 mt-12">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? "w-8 h-2 bg-purple-500"
                    : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Dica de swipe para mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-8 md:hidden"
          >
            <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Deslize para navegar
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
