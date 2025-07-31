function enterSite() {
  const boot = document.getElementById("boot-screen");
  const main = document.getElementById("main-content");

  boot.style.transition = "opacity 0.6s ease";
  boot.style.opacity = 0;

  setTimeout(() => {
    boot.style.display = "none";
    main.style.display = "block";
    main.style.opacity = 0;
    main.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
      main.style.opacity = 1;
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }, 50);
  }, 600);
}

function handleScroll() {
  const sandwichContainer = document.getElementById("sandwich-container");
  if (!sandwichContainer) return;

  const layers = sandwichContainer.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Punto donde empieza la animación (ajusta si quieres)
  const start = sandwichContainer.offsetTop - viewportHeight / 2;

  layers.forEach((layer, i) => {
    let offset = 0;
    if (scrollY > start) {
      offset = Math.min((scrollY - start) * 0.5 + i * 50, 300 + i * 50);
    }

    // Mover capa hacia abajo
    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    // Mostrar descripción si se separó lo suficiente
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
  });
}
