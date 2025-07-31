function handleScroll() {
  const container = document.getElementById("sandwich-container");
  if (!container) return;

  const layers = container.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Punto donde empieza la animación, 80% arriba de la pantalla
  const startY = container.getBoundingClientRect().top + scrollY - viewportHeight * 0.8;

  // Obtener todos los textos explicativos
  const texts = document.querySelectorAll(".layer-text");

  layers.forEach((layer, index) => {
    let offset = 0;
    if (scrollY > startY) {
      offset = Math.min((scrollY - startY) * 0.5 + index * 50, 300 + index * 50);
    }

    // Mover capa verticalmente
    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    // Activar texto relacionado cuando offset > 20
    texts.forEach(text => {
      if (parseInt(text.dataset.layer) === (index + 1)) {
        if (offset > 20) {
          text.classList.add("active");
        } else {
          text.classList.remove("active");
        }
      }
    });
  });
}

// Listener para scroll
window.addEventListener("scroll", handleScroll);

// Ejecutar al cargar para inicializar bien
window.addEventListener("load", handleScroll);
