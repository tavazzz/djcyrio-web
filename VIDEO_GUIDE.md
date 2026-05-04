# 🎬 Guia de Mídia - DJ CYRIO Portfolio

## 📹 Vídeo Background (Hero Section)

Para o vídeo de fundo da seção Hero, você precisa adicionar um arquivo na pasta `public/`:

### Opção 1: Vídeo Local (Recomendado)
1. Adicione um arquivo `video-hero.mp4` na pasta `public/`
2. Formato recomendado: MP4, H.264 codec
3. Resolução: 1920x1080 (Full HD) ou 1280x720
4. Duração: 10-30 segundos em loop
5. Tamanho máximo: 10MB para carregamento rápido

**Onde conseguir:**
- Gravações de shows do DJ CYRIO
- Vídeos de pista/balada com luzes
- Stock footage gratuito (Pexels, Pixabay)

### Opção 2: Vídeo do YouTube (Alternativa)
Se não tiver arquivo local, edite `Hero.jsx` e substitua o `<video>` por:
```jsx
<div className="absolute inset-0 z-0">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0"
    frameBorder="0"
    allow="autoplay; fullscreen"
  />
  <div className="absolute inset-0 bg-black/50" />
</div>
```

---

## 🎥 Seção de Vídeos

Para a seção de vídeos (YouTube), edite `src/components/Videos.jsx`:

```javascript
const videos = [
  {
    id: 1,
    titulo: "SET OBECO HOUSE",
    thumbnail: "/set_001.jpg",
    videoId: "SEU_VIDEO_ID_AQUI" // Ex: "dQw4w9WgXcQ"
  },
  // ... mais vídeos
];
```

**Como pegar o Video ID do YouTube:**
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ` (tudo depois de `v=`)

---

## 📸 Dicas de Conteúdo

### Para contratantes, priorize:
1. **Vídeos de shows ao vivo** - Mostra energia e público
2. **Clipes profissionais** - Qualidade de produção
3. **Reels do Instagram** - Momentos marcantes
4. **Depoimentos/vinheta** - Se tiver

### Fotos da Galeria:
- Use fotos com boa iluminação
- Mostre o público (energia)
- Varie entre close-ups e ângulos amplos
- Nomeie como `set_007.jpg`, `set_008.jpg` etc. e adicione na pasta `public/`

---

## 🎨 Efeitos Adicionados

| Elemento | Descrição |
|----------|-----------|
| Partículas | Luzes flutuantes em todas as seções |
| Glow animado | Efeitos de brilho pulsante |
| Hover effects | Interações ao passar o mouse |
| Scroll reveals | Animações ao rolar a página |
| Gradientes | Tons de roxo animados |

---

## 🚀 Próximos Passos (Opcional)

Se quiser mais dinamismo:

1. **Cursor customizado** - Descomente as linhas no `index.css`
2. **Preloader animado** - Tela de carregamento inicial
3. **Transições de página** - Animação entre rotas
4. **Seção de equipamentos** - Mostrar setup do DJ
5. **Timeline de carreira** - Linha do tempo animada
