import TourDates from "../components/TourDates";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

export default function Agenda() {
  return (
    <PageTransition>
      <SEO
        title="Agenda DJ CYRIO"
        description="Confira os próximos shows e apresentações do DJ CYRIO. Agenda atualizada com datas, locais e informações de ingressos."
        keywords="DJ CYRIO, agenda, shows, apresentações, datas, ingressos, São José dos Campos"
        image="/capa.jpg"
        url="https://djcyrio.com/agenda"
      />
      <div className="pt-24 min-h-screen flex flex-col justify-center">
        <TourDates />
      </div>
    </PageTransition>
  );
}