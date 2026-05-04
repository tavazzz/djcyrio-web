import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = "DJ CYRIO - Portfólio Oficial",
  description = "DJ CYRIO - Conheça o trabalho do DJ Thiago Pedroso, residente em São José dos Campos. Sets autorais, apresentações em casas renomadas e identidade única no funk.",
  keywords = "DJ CYRIO, Thiago Pedroso, DJ, funk, São José dos Campos, sets autorais, música eletrônica",
  image = "/capa.jpg",
  url = "https://djcyrio.com"
}) {
  const siteName = "DJ CYRIO";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Título */}
      <title>{fullTitle}</title>

      {/* Meta tags básicas */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />

      {/* Outras meta tags */}
      <meta name="author" content="DJ CYRIO" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Favicon e Ícones de Dispositivos */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      
      {/* Caso ainda queira manter o suporte ao formato antigo .ico */}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
}