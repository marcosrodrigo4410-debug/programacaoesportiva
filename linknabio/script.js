document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".reveal");

  buttons.forEach((btn, index) => {
    // Cria um atraso (delay) para cada botão
    setTimeout(
      () => {
        btn.style.transition = "all 0.6s ease-out";
        btn.classList.add("active");
      },
      200 * (index + 1),
    );
  });
});
