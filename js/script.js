document.addEventListener("DOMContentLoaded", () => {
  const layers = document.querySelectorAll(".sandwich-layer");

  const revealOnScroll = () => {
    const scrollTop = window.scrollY;
    layers.forEach((layer, index) => {
      const offset = layer.offsetTop;
      if (scrollTop + window.innerHeight > offset + 100) {
        layer.classList.add("visible");
      }
    });
  };

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
});
