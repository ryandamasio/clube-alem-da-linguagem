const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.01 });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    const bounds = element.getBoundingClientRect();
    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      element.classList.add('reveal-pending');
    }
    observer.observe(element);
  });
}

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const rail = document.getElementById(button.dataset.target);
    const card = rail.firstElementChild;
    const gap = parseFloat(getComputedStyle(rail).columnGap);
    const step = card.getBoundingClientRect().width + gap;
    rail.scrollBy({
      left: button.dataset.scroll === 'next' ? step : -step,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  });
});

// Preencha com as URLs oficiais dos dois produtos antes de publicar.
const checkouts = {
  avista: '',
  parcelado: '',
};

const checkoutDialog = document.getElementById('checkout');

document.querySelectorAll('[data-checkout]').forEach((button) => {
  button.addEventListener('click', () => {
    const url = checkouts[button.dataset.checkout];

    if (url) {
      window.location.assign(url);
      return;
    }

    checkoutDialog.showModal();
  });
});

// Numera os filhos de cada bloco animado para entrarem em cascata (ver .revealed > * no CSS).
document.querySelectorAll('[data-reveal]').forEach((block) => {
  [...block.children].forEach((child, i) => child.style.setProperty('--i', i));
});
