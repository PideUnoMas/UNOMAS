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

function handleScroll() {
  const container = document.getElementById("sandwich-container");
  if (!container) return;

  const layers = container.querySelectorAll(".sandwich-layer");
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;
  const startY = container.offsetTop - viewportHeight / 1.3;

  layers.forEach((layer, index) => {
    const offset = scrollY > startY
      ? Math.min((scrollY - startY) * 0.5 + index * 50, 300 + index * 50)
      : 0;

    layer.style.transform = `translateX(-50%) translateY(${offset}px)`;

    const desc = layer.querySelector(".description");
    if (desc) {
      if (offset > 20) {
        desc.style.display = "block";
        desc.style.opacity = Math.min((offset - 20) / 100, 1);
      } else {
        desc.style.opacity = 0;
        setTimeout(() => {
          if (desc.style.opacity === "0") desc.style.display = "none";
        }, 300);
      }
    }
  });
}
