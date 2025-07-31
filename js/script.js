// Controla el comportamiento del sandwich y textos explicativos al hacer scroll

function handleScroll() {
  const container = document.getElementById("sandwich-container");
  const texts = document.querySelectorAll(".layer-text");
  if (!container) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Punto donde inicia la animacion (justo antes de que el sandwich salga a la mitad de la pantalla)
  const startY = container.getBoundingClientRect().top + scrollY - viewportHeight * 0.8;

  const layers = container.querySelectorAll(".sandwich-layer");

  layers.forEach((layer, i) => {
    let offset = 0;
    if (scrollY > startY) {
      offset = Math.min((scrollY - startY) * 0.5 + i * 50, 300 + i * 50);
    }
    // Mover cada capa hacia abajo y ligeramente al centro (separacion animada)
    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    // Mostrar la descripción de la capa si se movió más de 20px
    const desc = layer.querySelector(".description");
    if (desc) {
      if (offset > 20) {
        desc.style.display = "block";
        desc.style.opacity = Math.min((offset - 20) / 100, 1);
      } else {
        desc.style.opacity = 0;
        setTimeout(() => {
          desc.style.display = "none";
        }, 300);
      }
    }

    // Mostrar textos explicativos a la derecha sincronizados con la capa animada
    if (texts[i]) {
      if (offset > 20) {
        texts[i].style.opacity = 1;
      } else {
        texts[i].style.opacity = 0;
      }
    }
  });
}

window.addEventListener("scroll", handleScroll);

// Inicia con el sandwich armado (texto oculto)
window.addEventListener("load", () => {
  const container = document.getElementById("sandwich-container");
  const layers = container.querySelectorAll(".sandwich-layer");
  layers.forEach(layer => {
    layer.style.transform = "translateX(-50%) translateY(0)";
    const desc = layer.querySelector(".description");
    if (desc) desc.style.display = "none";
  });

  const texts = document.querySelectorAll(".layer-text");
  texts.forEach(text => {
    text.style.opacity = 0;
  });

  // Para casos que el usuario cargue con scroll bajado
  handleScroll();
});
