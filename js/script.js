// Quitar la pantalla de carga, mostrar sandwich y textos desde inicio
// Ya no hay enterSite ni boot-screen

let descTimeouts = new WeakMap();

function handleScroll() {
  const container = document.getElementById("sandwich-container");
  if (!container) return;

  const layers = container.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Punto de inicio para el efecto
  const startY = container.getBoundingClientRect().top + scrollY - viewportHeight * 0.8;

  layers.forEach((layer, i) => {
    let offset = 0;
    if (scrollY > startY) {
      // Más compacto: abro las capas progresivamente
      offset = Math.min((scrollY - startY) * 0.5 + i * 35, 210 + i * 35);
    }

    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    // Mostrar/Ocultar textos sincronizados con capas
    const desc = document.querySelectorAll('.layer-text')[i];
    if (desc) {
      if (offset > 20) {
        if (descTimeouts.has(desc)) {
          clearTimeout(descTimeouts.get(desc));
          descTimeouts.delete(desc);
        }
        desc.style.opacity = Math.min((offset - 20) / 100, 1);
      } else {
        desc.style.opacity = 0;
        if (!descTimeouts.has(desc)) {
          const timeoutId = setTimeout(() => {
            descTimeouts.delete(desc);
          }, 300);
          descTimeouts.set(desc, timeoutId);
        }
      }
    }
  });
}

// Añadir listener scroll
window.addEventListener("scroll", handleScroll);
// Llamar la función una vez al cargar
window.addEventListener("load", () => {
  handleScroll();
});
