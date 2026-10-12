// CSS drives the motion; JS only suspends work outside the viewport or in hidden tabs.
(() => {
  const hosts = document.querySelectorAll('.bg-host');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('bg-running', entry.isIntersecting));
    }, { rootMargin: '60px', threshold: 0 });
    hosts.forEach(host => observer.observe(host));
  }
  function updateVisibility() {
    document.documentElement.classList.toggle('bg-tab-hidden', document.hidden);
  }
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();
})();
