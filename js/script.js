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

    requestAnimationFrame(() => {
      main.style.opacity = 1;
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    });
  }, 600);
}

let descTimeouts = new WeakMap();

function handleScroll() {
  const container = document.getElementById("sandwich-container");
  if (!container) return;

  const layers = container.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  // Ajuste para que la animación empiece justo cuando el contenedor está casi visible
  const startY = container.getBoundingClientRect().top + scrollY - viewportHeight * 0.8;

  layers.forEach((layer, index) => {
    let offset = 0;
    if (scrollY > startY) {
      offset = Math.min((scrollY - startY) * 0.5 + index * 50, 300 + index * 50);
    }

    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    const desc = layer.querySelector(".description");
    if (desc) {
      if (offset > 20) {
        if (descTimeouts.has(desc)) {
          clearTimeout(descTimeouts.get(desc));
          descTimeouts.delete(desc);
        }
        desc.style.display = "block";
        desc.style.opacity = Math.min((offset - 20) / 100, 1);
      } else {
        desc.style.opacity = 0;
        if (!descTimeouts.has(desc)) {
          const timeoutId = setTimeout(() => {
            desc.style.display = "none";
            descTimeouts.delete(desc);
          }, 300);
          descTimeouts.set(desc, timeoutId);
        }
      }
    }
  });
}
