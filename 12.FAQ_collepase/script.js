const toogles = document.querySelectorAll(".faq-toggle");
toogles.forEach((toogle) => {
  toogle.addEventListener("click", () => {
    toogle.parentNode.classList.toggle("active");
  });
});
