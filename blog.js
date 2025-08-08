document.getElementById("menuToggle").addEventListener("click", function() {
  const navMenu = document.getElementById("navMenu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});