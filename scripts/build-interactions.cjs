const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'visualizar-becake.html');
let html = fs.readFileSync(file, 'utf8');
if (!html.includes('id="gallery-lightbox"')) {
  html = html.replace(/<div class="photo-tile ([^"]+)" role="img" aria-label="([^"]+)"([^>]*)><\/div>/g,
    (_, classes, label, attrs) => `<button type="button" class="photo-tile ${classes}" aria-label="Ampliar: ${label}" data-photo-label="${label}"${attrs}></button>`);
  const seal = `<div class="seal" role="img" aria-label="Feito para celebrar"><svg class="seal-orbit" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="seal-text-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><text textLength="276" lengthAdjust="spacing"><textPath href="#seal-text-circle">FEITO PARA CELEBRAR · FEITO COM CARINHO · </textPath></text></svg><span class="seal-center" aria-hidden="true">♡</span></div>`;
  html = html.replace(/<div class="seal">[\s\S]*?<\/div>/, seal);
  const slogans = '<span>AFETO EM CADA DETALHE</span><b aria-hidden="true">✿</b><span>CELEBRAÇÕES COM PERSONALIDADE</span><b aria-hidden="true">✿</b><span>DOÇURA FEITA À MÃO</span><b aria-hidden="true">✿</b>';
  html = html.replace(/<div class="ribbon">[\s\S]*?<\/div>/, `<div class="ribbon"><div class="marquee-track"><div class="marquee-group">${slogans}</div><div class="marquee-group" aria-hidden="true">${slogans}</div></div></div>`);
  const filters = `<div class="creation-filters" role="group" aria-label="Filtrar nossas criações"><button type="button" class="filter-chip" data-creation-filter="all" aria-pressed="true">Todas</button><button type="button" class="filter-chip" data-creation-filter="cakes" aria-pressed="false">Bolos Decorados</button><button type="button" class="filter-chip" data-creation-filter="parties" aria-pressed="false">Festas</button><button type="button" class="filter-chip" data-creation-filter="sweets" aria-pressed="false">Doces de Celebração</button></div>`;
  html = html.replace('<div class="features">', filters + '<div class="features">');
  let cardIndex = 0;
  html = html.replace(/<article class="card">/g, () => `<article class="card" data-category="${['cakes', 'parties', 'sweets'][cardIndex++]}">`);
  html = html.replace('<div class="tiny">Fotos de referência.', '<p class="filter-status" role="status" aria-live="polite">3 categorias exibidas. Valores e disponibilidade sob consulta.</p><div class="tiny">Fotos de referência.');
  const testimonials = `<section class="testimonials" id="depoimentos" aria-labelledby="testimonials-title"><div class="wrap"><div class="heading"><div><div class="eyebrow">MEMÓRIAS QUE FICAM</div><h2 id="testimonials-title">Depoimentos de <em>clientes.</em></h2></div></div><div class="review-card"><div class="review-empty"><span aria-hidden="true" style="font:32px Georgia;color:#a96e79">♡</span><h3>Cada celebração guarda uma história.</h3><p>Em breve, as histórias de quem celebra com a BêCake estarão aqui.</p><a class="link" href="https://www.instagram.com/becakeconfeitaria_/" target="_blank" rel="noopener noreferrer">Acompanhe nossos momentos no Instagram ↗</a></div><div class="review-content" aria-live="polite" aria-atomic="true" hidden><div class="review-stars" role="img"></div><blockquote></blockquote><p class="review-name"></p><p class="review-event"></p></div><div class="review-controls" hidden><button class="icon-button" type="button" data-review-step="-1" aria-label="Depoimento anterior">←</button><span class="review-status" aria-live="polite"></span><button class="icon-button" type="button" data-review-step="1" aria-label="Próximo depoimento">→</button></div></div></div></section>`;
  html = html.replace('<section class="order">', testimonials + '<section class="order">');
  const lightbox = `<dialog class="lightbox" id="gallery-lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-description"><div class="lightbox-panel"><button type="button" class="icon-button lightbox-close" aria-label="Fechar imagem ampliada" autofocus>×</button><div class="lightbox-image" role="img"></div><div class="lightbox-copy"><div class="eyebrow">UMA INSPIRAÇÃO PARA CELEBRAR</div><h2 id="lightbox-title">Criação BêCake</h2><p id="lightbox-description">Referência de decoração. Vamos conversar sobre a sua ideia, data e disponibilidade.</p><a class="pill lightbox-request" href="https://wa.me/5588981196996" target="_blank" rel="noopener noreferrer">Quero uma opção assim ↗</a><div class="lightbox-controls"><button type="button" class="icon-button" data-photo-step="-1" aria-label="Foto anterior">←</button><span class="lightbox-count" aria-live="polite"></span><button type="button" class="icon-button" data-photo-step="1" aria-label="Próxima foto">→</button></div></div></div></dialog>`;
  const floating = `<a class="floating-whatsapp" href="https://wa.me/5588981196996?text=Ol%C3%A1%2C%20B%C3%AACake!%20Gostaria%20de%20consultar%20uma%20encomenda." target="_blank" rel="noopener noreferrer" aria-label="Conversar com a BêCake pelo WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8 7c-1 1-1 3 1 5s4 3 5 2l1-2-2-1-1 1c-1-.4-2-1.4-2.4-2.4l1-1L9.5 7Z"/></svg><span>Vamos conversar?</span></a><button type="button" class="motion-toggle" aria-pressed="false">Ⅱ Pausar animações</button>`;
  html = html.replace('</body>', lightbox + floating + '</body>');
}
html = html.replace(/<section class="testimonials" id="depoimentos"(?! hidden)/, '<section class="testimonials" id="depoimentos" hidden');
html = html.replace(/<!-- BECAKE-COMPONENTS-CSS -->[\s\S]*?<!-- END-BECAKE-COMPONENTS-CSS -->/g, '');
html = html.replace(/<!-- BECAKE-COMPONENTS-JS -->[\s\S]*?<!-- END-BECAKE-COMPONENTS-JS -->/g, '');
const css = fs.readFileSync(path.join(root, 'preview/components.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'preview/components.js'), 'utf8');
const reviews = fs.readFileSync(path.join(root, 'preview/reviews.js'), 'utf8');
html = html.replace('</head>', `<!-- BECAKE-COMPONENTS-CSS --><style>${css}</style><!-- END-BECAKE-COMPONENTS-CSS --></head>`);
html = html.replace('</body>', `<!-- BECAKE-COMPONENTS-JS --><script>${reviews}\n${js}</script><!-- END-BECAKE-COMPONENTS-JS --></body>`);
fs.writeFileSync(file, html);
console.log('Lightbox, filtros, selo, marquee, WhatsApp e depoimentos incorporados ao HTML.');
