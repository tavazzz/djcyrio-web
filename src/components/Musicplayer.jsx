import { motion } from "framer-motion";

export default function MusicPlayer() {
  return (
    <section id="music" className="py-24 px-6 md:px-12 bg-black text-white flex flex-col items-center">
      <div className="max-w-4xl w-full">
        
        {/* Título da Seção */}
        {/* CABEÇALHO DO SOUNDCLOUD (Agora alinhado à esquerda) */}
        <div className="flex flex-col text-left mb-6 w-full">
          <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-2">
            Live Sets & Mixes
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase">
            SoundCloud
          </h3>
        </div>

        {/* O Player Embed do Perfil Completo do CYRIO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] border border-zinc-800"
        >
          <iframe 
            width="100%" 
            height="450" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay" 
            // O link abaixo puxa o perfil inteiro dele. O color=%23a855f7 deixa o botão de play roxo!
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/djcyrio&color=%23a855f7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}