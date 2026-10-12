const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'visualizar-becake.html');
let html = fs.readFileSync(file, 'utf8');
function data(filePath) {
  const ext = path.extname(filePath).slice(1);
  return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${fs.readFileSync(filePath).toString('base64')}`;
}
const a = data(path.join(root, 'public/images/references.png'));
const b = data(path.join(root, 'public/images/celebrations.png'));
const c = data(path.join(root, 'public/images/celebrations-extra.png'));
const sources = [a,b,c];
const labels = [
  ['Bolo branco e rosa com flores','Bolo com flores rosa e douradas','Bolo com jardim de flores','Doces decorados de festa','Bolo vintage branco com laços rosa'],
  ['Bolo temático infantil','Bolo vintage vermelho com cerejas','Bolo branco com laços pretos','Bolo com laços rosa e azul','Bolo floral em rosa e dourado','Bolo em degradê azul','Bolo vintage azul e laranja','Bolo com esferas rosa e douradas','Bolo com flores coloridas','Bolo floral de mesversário'],
  ['Bolo rosa de aniversário','Bolo branco com laço de tecido','Bolo amarelo com flores','Pudins artesanais','Bolo de festa junina','Bolo temático de festa','Bolo junino em tons de coral','Bolo rosa com flores e laço','Bolo de mesversário junino','Bolo junino personalizado']
];
let count = 0;
const tiles = labels.flatMap((group, s) => group.map((label, i) => {
  const more = count++ >= 10;
  return `<div class="photo-tile source-${s}${more?' gallery-extra':''}" role="img" aria-label="${label}" style="background-position:${(i%5)*25}% ${i<5?0:100}%"${more?' hidden':''}></div>`;
})).join('');
html = html.replace(/<figure>[\s\S]*?<\/figure>/, `<div class="photo-gallery" aria-label="Referências de criações da BêCake">${tiles}</div><button type="button" class="gallery-toggle pill" aria-expanded="false">Ver mais criações ↓</button><p class="tiny">Fotos enviadas pela marca. Referências de decoração; disponibilidade sob consulta.</p>`);
let card = 0;
const cardPhotos = [
  '<div class="card-photo source-0" role="img" aria-label="Bolo artesanal com flores rosa e douradas" style="background-position:25% 0%"></div>',
  '<div class="card-photo source-1" role="img" aria-label="Bolo personalizado para celebração infantil" style="background-position:0% 0%"></div>',
  '<div class="card-photo source-0" role="img" aria-label="Doces de festa em tons de rosa, branco e chocolate" style="background-position:75% 0%"></div>'
];
html = html.replace(/(<article class="card">)<img[^>]+>/g, (_, start) => start + cardPhotos[card++]);
html = html.replace(/src="\.\/public\/images\/([^"]+)"/g, (_, name) => {
  // PNG originals avoid relying on WebP decoding in embedded file previews.
  const original = name.replace(/\.webp$/, '.png');
  return `src="${data(path.join(root,'public/images',original))}"`;
});
const css = `<style id="embedded-gallery">
${sources.map((src,i)=>`.source-${i}{--gallery-source:url("${src}")}`).join('\n')}
.photo-tile,.card-photo{background-image:var(--gallery-source);background-repeat:no-repeat;background-size:500% 100%;background-color:#eee7dc}
.source-1,.source-2{background-size:500% 200%}
.card-photo{aspect-ratio:274/365;height:auto;border-radius:2px}
.photo-gallery{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.photo-tile{aspect-ratio:274/365;border-radius:4px;transition:transform 250ms var(--ease-out)}
[hidden]{display:none!important}.gallery-toggle{border:0;cursor:pointer;margin:26px auto 0;display:flex}
/* Photographs remain visible even if an observer or browser script fails. */
.motion-enabled .photo-reveal{clip-path:none;opacity:1}
@media(hover:hover) and (pointer:fine){.photo-tile:hover{transform:translateY(-4px)}}
@media(max-width:760px){.photo-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.card-photo{height:auto;aspect-ratio:274/365}}
@media(prefers-reduced-motion:reduce){.photo-tile:hover{transform:none}}
</style>`;
html = html.replace('</head>', css + '</head>');
html = html.replace('</body>', `<script>
document.querySelector('.gallery-toggle').addEventListener('click',function(){
  var expanded=this.getAttribute('aria-expanded')==='true';
  document.querySelectorAll('.gallery-extra').forEach(function(el){el.hidden=expanded});
  this.setAttribute('aria-expanded',String(!expanded));
  this.textContent=expanded?'Ver mais criações ↓':'Mostrar menos ↑';
});
</script></body>`);
fs.writeFileSync(file, html);
console.log(`HTML atualizado: ${count} fotos de referência, imagens incorporadas, ${card} cartões corrigidos.`);
