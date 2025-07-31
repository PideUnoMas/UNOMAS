function enterSite() {
  const boot = document.getElementById("boot-screen");
  const main = document.getElementById("main-content");

  // Suaviza la transición
  boot.style.transition = "opacity 0.6s ease";
  boot.style.opacity = 0;

  setTimeout(() => {
    boot.style.display = "none";
    main.style.display = "block";
    main.style.opacity = 0;
    main.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
      main.style.opacity = 1;
    }, 50);
  }, 600);
}
