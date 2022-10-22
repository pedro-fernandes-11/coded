var arrow = document.getElementById("down-arrow");

arrow.addEventListener("click", () => {
  window.scrollTo({top: 300, behavior: 'smooth'})
})