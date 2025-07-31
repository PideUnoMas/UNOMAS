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
      // Activar escucha de scroll solo cuando el contenido esté visible
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // llamada inicial para estado correcto si hay scroll ya
    }, 50);
  }, 600);
}

function handleScroll() {
  const sandwichContainer = document.getElementById("sandwich-container");
  if (!sandwichContainer) return;

  const layers = sandwichContainer.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Posición vertical donde comienza el sándwich
  const start = sandwichContainer.offsetTop - viewportHeight / 2;

  layers.forEach((layer, i) => {
    // Calcula cuánto "desarmar" según el scroll y la capa
    let offset = 0;
    if (scrollY > start) {
      // Cada capa se separa 50px más que la anterior al hacer scroll
      offset = Math.min((scrollY - start) * 0.5 + i * 50, 200 + i * 50);
    }

    // Aplicar el desplazamiento vertical (hacia abajo)
    layer.style.transform = `translate(-50%, ${offset}px)`;

    // Mostrar descripción si se separó algo (offset > 20 px)
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
