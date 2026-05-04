import PageTransition from "../components/PageTransition";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

export default function Contato() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('_subject', 'NOVO CONTATO - Site CYRIO!');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append('Nome', data.nome);
      formData.append('Email', data.email);
      formData.append('Mensagem', data.mensagem);

      const response = await fetch('https://formsubmit.co/contatodjcyrio@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        reset();
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.');
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Contato DJ CYRIO"
        description="Entre em contato com DJ CYRIO para bookings, eventos e colaborações. WhatsApp, email ou formulário de contato."
        keywords="DJ CYRIO, contato, booking, eventos, WhatsApp, email, colaborações"
        image="/capa.jpg"
        url="https://djcyrio.com/contato"
      />
      <div className="relative pt-32 min-h-screen flex flex-col items-center overflow-hidden">

      {/* (Opcional) Fundo da página inteira bem escurecido para dar clima */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/capa.jpg" alt="Fundo" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950"></div>
      </div>

      {/* Cabeçalho da Página */}
      <div className="z-10 text-center mb-16 px-6">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-widest uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Contato</span> & Bookings
        </h1>
        <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto">
          Envie uma mensagem direta para bookings, parcerias e detalhes técnicos.
        </p>
      </div>

      <div className="z-10 max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

        {/* 1. SEÇÃO WHATSAPP (AGORA É A PRIMEIRA!) */}
        <div className="relative flex flex-col justify-center bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden p-8 md:p-12 group">

          {/* Imagem de Fundo do Cartão (Efeito VIP) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/perfil.jpg" /* Você pode trocar por /set_001.jpg se preferir foto de show */
              alt="CYRIO Background"
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Máscara escura para garantir leitura do texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-end">
            <h2 className="text-3xl font-black text-white mb-4 tracking-wide uppercase drop-shadow-md">
              Contato Direto
            </h2>
            <p className="text-zinc-300 font-light mb-8 text-lg leading-relaxed drop-shadow-md">
              Para respostas mais rápidas sobre disponibilidade de datas, cachês e detalhes técnicos, entre em contato diretamente via WhatsApp com a nossa equipe de produção.
            </p>

            <a
              href="https://wa.me/5512996300394"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(22,163,74,0.4)]"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.39 0 0 5.39 0 12.031c0 2.628.686 5.176 1.983 7.424L.367 24l4.673-1.61c2.158 1.156 4.606 1.766 7.151 1.766 6.641 0 12.031-5.39 12.031-12.031S18.672 0 12.031 0zm0 22.015c-2.228 0-4.414-.597-6.324-1.728l-.454-.27-3.468 1.195 1.218-3.38-.297-.472c-1.242-1.972-1.898-4.25-1.898-6.586 0-5.461 4.444-9.904 9.905-9.904 5.462 0 9.905 4.443 9.905 9.904 0 5.462-4.443 9.905-9.905 9.905zm5.429-7.41c-.297-.15-1.764-.872-2.036-.972-.27-.1-.471-.15-.67.15-.198.298-.767.973-.94 1.171-.173.199-.347.224-.644.075-2.012-.998-3.486-2.188-4.436-4.103-.127-.253.125-.236.417-.824.074-.15.037-.282-.037-.432-.075-.15-.67-1.619-.918-2.215-.241-.578-.485-.5-.67-.509-.172-.01-.371-.01-.57-.01-.198 0-.52.074-.792.373-.272.298-1.04 1.018-1.04 2.484s1.064 2.88 1.213 3.08c.149.199 2.1 3.205 5.087 4.494 2.162.937 2.946 1.01 3.996.85 1.144-.176 3.518-1.436 4.013-2.825.495-1.388.495-2.576.347-2.824-.149-.248-.545-.398-.842-.548z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {/* 2. SEÇÃO E-MAIL (AGORA É A SEGUNDA) */}
        <div className="bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-zinc-800 shadow-xl flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">Envie um E-mail</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                {...register("nome", { required: "Nome é obrigatório" })}
                placeholder="Seu Nome / Empresa"
                className={`w-full bg-zinc-950/80 border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.nome ? 'border-red-500' : 'border-zinc-800'
                }`}
              />
              {errors.nome && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.nome.message}
                </motion.p>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "E-mail inválido"
                  }
                })}
                placeholder="Seu E-mail para resposta"
                className={`w-full bg-zinc-950/80 border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-zinc-800'
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <textarea
                {...register("mensagem", {
                  required: "Mensagem é obrigatória",
                  minLength: {
                    value: 10,
                    message: "Mensagem deve ter pelo menos 10 caracteres"
                  }
                })}
                placeholder="Assunto / Proposta"
                rows="4"
                className={`w-full bg-zinc-950/80 border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                  errors.mensagem ? 'border-red-500' : 'border-zinc-800'
                }`}
              />
              {errors.mensagem && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.mensagem.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
    </PageTransition>
  );
}