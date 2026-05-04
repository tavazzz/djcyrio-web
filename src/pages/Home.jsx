import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Highlights from "../components/Highlights";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="DJ CYRIO - Portfólio Oficial"
        description="DJ CYRIO - Thiago Pedroso - Funk, São José dos Campos, Sets Autorais, Todos os direitos Reservados."
        keywords="DJ CYRIO, Thiago Pedroso, DJ, funk, São José dos Campos, sets autorais, música eletrônica, Obeco, Santonofre, Palácio Sunset, Honey Club, Mandela, SoundCloud, Spotify"
        image="/capa.jpg"
      />
      <Hero />
      <Marquee />
      <Highlights />
    </PageTransition>
  );
}