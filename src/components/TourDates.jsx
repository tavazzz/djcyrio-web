import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";

export default function TourDates() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchShows = useCallback(async (retry = 0) => {
    const maxRetries = 3;
    const urlDaAPI = `https://rest.bandsintown.com/artists/id_15636564/events?app_id=1e361c8977042e16a9ae59186b795342&date=upcoming&nocache=${new Date().getTime()}`;

    try {
      setLoading(true);
      setError(null);

      const resposta = await fetch(urlDaAPI, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000)
      });

      if (!resposta.ok) {
        throw new Error(`Erro na API: ${resposta.status} ${resposta.statusText}`);
      }

      const dados = await resposta.json();

      if (Array.isArray(dados)) {
        setShows(dados);
        // Cache básico no localStorage
        localStorage.setItem('cyrio_shows_cache', JSON.stringify({
          data: dados,
          timestamp: Date.now()
        }));
      } else {
        throw new Error('Formato de dados inválido');
      }

      setLoading(false);
    } catch (erro) {
      console.error("Erro ao buscar shows:", erro);

      // Tentar cache se disponível (válido por 24h)
      const cached = localStorage.getItem('cyrio_shows_cache');
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const cacheAge = Date.now() - timestamp;
          const cacheValid = cacheAge < 24 * 60 * 60 * 1000; // 24 horas

          if (cacheValid && Array.isArray(data)) {
            console.log('Usando dados em cache');
            setShows(data);
            setLoading(false);
            return;
          }
        } catch (cacheError) {
          console.error('Erro ao ler cache:', cacheError);
        }
      }

      // Retry logic
      if (retry < maxRetries) {
        console.log(`Tentativa ${retry + 1} de ${maxRetries + 1}`);
        setTimeout(() => fetchShows(retry + 1), 2000 * (retry + 1)); // Exponential backoff
        setRetryCount(retry + 1);
      } else {
        setError(erro.message || 'Erro ao carregar agenda');
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const handleRetry = () => {
    setRetryCount(0);
    fetchShows();
  };

  return (
    <section id="agenda" className="relative py-24 px-6 md:px-12 bg-black text-white flex flex-col items-center overflow-hidden">

      {/* Partículas de fundo */}
      <Particles count={30} color="#57449a" />

      <div className="relative z-10 max-w-6xl w-full">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-[#57449a] uppercase mb-2"
          >
            Agenda Oficial
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight uppercase"
          >
            PRÓXIMOS SHOWS
          </motion.h3>
        </div>

        <div className="border-t border-zinc-800">

          {/* ESTADO 1: Carregando */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-zinc-500 font-light tracking-widest uppercase">
                {retryCount > 0 ? `Tentando novamente... (${retryCount}/3)` : 'Procurando datas...'}
              </p>
            </motion.div>
          )}

          {/* ESTADO 2: Erro */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center text-center gap-6"
            >
              <div className="text-red-400 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-zinc-400 font-light text-lg">
                  {error.includes('AdBlock') ? 'Bloqueador de anúncios detectado.' : 'Erro ao carregar agenda.'}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full uppercase tracking-widest transition-all duration-300"
                >
                  Tentar Novamente
                </button>
                <a
                  href="https://www.bandsintown.com/a/15636564-cyrio"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#57449a] hover:bg-[#715cbe] text-white font-bold rounded-full uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(87,68,154,0.4)] hover:shadow-[0_0_40px_rgba(87,68,154,0.6)]"
                >
                  Ver no Bandsintown
                </a>
              </div>
            </motion.div>
          )}

          {/* ESTADO 3: Sem shows */}
          {!loading && !error && shows.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="text-zinc-500 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-zinc-500 font-light tracking-widest uppercase">
                Nenhuma data confirmada no momento.
              </p>
              <p className="text-zinc-600 text-sm mt-2">
                Fique ligado nas redes sociais para novidades!
              </p>
            </motion.div>
          )}

          {/* ESTADO 4: Shows disponíveis */}
          {!loading && !error && shows.map((show, index) => {
            const dataObj = new Date(show.datetime);
            const dia = dataObj.toLocaleDateString('pt-BR', { day: '2-digit' });
            const mes = dataObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
            const nomeDaFesta = show.title || show.venue.name;

            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-6 md:px-8 mb-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                {/* Glow de fundo ao hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-900/0 via-purple-900/20 to-purple-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex flex-row items-center gap-6 mb-4 md:mb-0">
                  {/* Data com destaque */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    <span className="text-xs font-bold text-purple-200 uppercase">{mes}</span>
                    <span className="text-4xl font-black text-white tracking-tighter">{dia}</span>
                  </motion.div>

                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors uppercase">
                      {nomeDaFesta}
                    </span>
                    <span className="text-sm text-zinc-500 font-light tracking-wide mt-1 uppercase">
                      {show.venue.city}, {show.venue.country}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <a
                    href={show.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative px-8 py-3 overflow-hidden rounded-full bg-transparent border border-purple-500/50 text-purple-400 font-bold uppercase tracking-widest transition-all duration-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                  >
                    <span className="relative z-10">Ingressos / Info</span>
                    {/* Fill animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
