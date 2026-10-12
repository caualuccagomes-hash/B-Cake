/* Portable browser components: no CDN, server or installation required. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const tiles = [...document.querySelectorAll('.photo-tile')];
  const dialog = document.querySelector('#gallery-lightbox');
  const image = dialog.querySelector('.lightbox-image');
  const title = dialog.querySelector('#lightbox-title');
  const count = dialog.querySelector('.lightbox-count');
  const request = dialog.querySelector('.lightbox-request');
  let activeTile = null;
  let closing = false;
  const visibleTiles = () => tiles.filter(tile => !tile.hidden);
  function showTile(tile) {
    activeTile = tile;
    const source = [...tile.classList].find(name => /^source-\d+$/.test(name));
    const label = tile.dataset.photoLabel;
    image.className = `lightbox-image ${source}`;
    image.style.backgroundPosition = tile.style.backgroundPosition;
    image.setAttribute('aria-label', label);
    title.textContent = label;
    const visible = visibleTiles();
    count.textContent = `${visible.indexOf(tile) + 1} de ${visible.length}`;
    request.href = `https://wa.me/5588981196996?text=${encodeURIComponent(`Olá, BêCake! Quero consultar uma opção inspirada nesta referência: ${label}. Podemos conversar sobre data, decoração e disponibilidade?`)}`;
  }
  function openLightbox(tile) {
    if (closing) return;
    showTile(tile);
    document.body.classList.add('lightbox-open');
    if (!dialog.open) dialog.showModal();
  }
  async function closeLightbox() {
    if (closing || !dialog.open) return;
    closing = true;
    if (!reduce.matches) {
      await dialog.querySelector('.lightbox-panel').animate([
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(12px) scale(.97)' }
      ], { duration: 180, easing: 'cubic-bezier(.23,1,.32,1)' }).finished.catch(() => {});
    }
    dialog.close();
    document.body.classList.remove('lightbox-open');
    closing = false;
    activeTile?.focus({ preventScroll: true });
  }
  function stepPhoto(direction) {
    const visible = visibleTiles();
    if (!visible.length || closing) return;
    showTile(visible[(visible.indexOf(activeTile) + direction + visible.length) % visible.length]);
  }
  tiles.forEach(tile => {
    tile.addEventListener('click', () => openLightbox(tile));
    let frame;
    tile.addEventListener('pointermove', event => {
      if (!fine.matches || reduce.matches || document.documentElement.classList.contains('motion-paused')) return;
      const rect = tile.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - .5) * -8;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { tile.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`; });
    });
    tile.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      tile.style.transform = '';
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  dialog.querySelector('[data-photo-step="-1"]').addEventListener('click', () => stepPhoto(-1));
  dialog.querySelector('[data-photo-step="1"]').addEventListener('click', () => stepPhoto(1));
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeLightbox(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeLightbox(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); stepPhoto(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); stepPhoto(-1); }
  });
  const filters = [...document.querySelectorAll('[data-creation-filter]')];
  const cards = [...document.querySelectorAll('.features .card')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let shown = 0;
    cards.forEach(card => {
      const visible = button.dataset.creationFilter === 'all' || card.dataset.category === button.dataset.creationFilter;
      card.hidden = !visible;
      if (visible) {
        shown++;
        if (!reduce.matches) card.animate([{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 250, easing: 'cubic-bezier(.23,1,.32,1)' });
      }
    });
    document.querySelector('.filter-status').textContent = `${shown} ${shown === 1 ? 'categoria exibida' : 'categorias exibidas'}. Valores e disponibilidade sob consulta.`;
  }));
  const pause = document.querySelector('.motion-toggle');
  pause.addEventListener('click', () => {
    const paused = document.documentElement.classList.toggle('motion-paused');
    pause.setAttribute('aria-pressed', String(paused));
    pause.textContent = paused ? '▶ Retomar animações' : 'Ⅱ Pausar animações';
    tiles.forEach(tile => { tile.style.transform = ''; });
  });
  reduce.addEventListener('change', () => tiles.forEach(tile => { tile.style.transform = ''; }));
  const reviews = (Array.isArray(window.BECAKE_REVIEWS) ? window.BECAKE_REVIEWS : []).filter(review =>
    review && typeof review.name === 'string' && review.name.trim() && typeof review.comment === 'string' && review.comment.trim() && Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5
  );
  document.querySelector('#depoimentos').hidden = reviews.length === 0;
  if (reviews.length) {
    document.querySelector('.review-empty').hidden = true;
    const card = document.querySelector('.review-content');
    const controls = document.querySelector('.review-controls');
    card.hidden = false;
    controls.hidden = reviews.length < 2;
    let index = 0;
    function renderReview() {
      const review = reviews[index];
      card.querySelector('blockquote').textContent = review.comment;
      card.querySelector('.review-name').textContent = review.name;
      card.querySelector('.review-event').textContent = review.event || '';
      card.querySelector('.review-stars').textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      card.querySelector('.review-stars').setAttribute('aria-label', `${review.rating} de 5 estrelas`);
      document.querySelector('.review-status').textContent = `${index + 1} de ${reviews.length}`;
      if (!reduce.matches) card.animate([{ opacity: .5 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' });
    }
    document.querySelectorAll('[data-review-step]').forEach(button => button.addEventListener('click', () => {
      index = (index + Number(button.dataset.reviewStep) + reviews.length) % reviews.length;
      renderReview();
    }));
    renderReview();
  }
  if ('IntersectionObserver' in window && !reduce.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('waiting'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.testimonials .heading,.review-card').forEach(el => {
      el.classList.add('component-reveal', 'waiting'); observer.observe(el);
    });
  }
})();
