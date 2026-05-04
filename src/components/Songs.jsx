import { motion } from "framer-motion";

export default function Songs() {
  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white flex flex-col items-center border-t border-zinc-900">
      <div className="max-w-4xl w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
              Discografia
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">
              TOP TRACKS SPOTIFY
            </h3>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full shadow-[0_0_30px_rgba(168,85,247,0.1)] rounded-xl overflow-hidden"
        >
          {/* O Iframe que você pegou, convertido para o padrão do React! */}
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/artist/7hlUm6PnC1UNORVacWbdyz?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}