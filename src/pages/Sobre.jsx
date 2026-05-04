import About from "../components/About";
import Songs from "../components/Songs";
import MusicPlayer from "../components/MusicPlayer";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

export default function Sobre() {
  return (
    <PageTransition>
      <SEO
        title="Sobre DJ CYRIO"
        description="Conheça a história de Thiago Pedroso, conhecido como DJ CYRIO. Apaixonado pelo funk desde jovem, com sets autorais no SoundCloud e apresentações em casas como Obeco, Santonofre e Palácio Sunset."
        keywords="DJ CYRIO, Thiago Pedroso, biografia, funk, São José dos Campos, sets autorais, SoundCloud, Spotify"
        image="/perfil.jpg"
        url="https://djcyrio.com/sobre"
      />
      <div className="pt-24 min-h-screen">
        <About />
        <Songs />
        <MusicPlayer />
      </div>
    </PageTransition>
  );
}