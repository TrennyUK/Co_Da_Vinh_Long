// ─── Bật/tắt Menu ───
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

menuToggle.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  menuToggle.classList.toggle("active"); // để bạn làm hiệu ứng dấu X
});

// ─── Ẩn menu khi click ra ngoài ───
document.addEventListener("click", (e) => {
  const clickedInside = sideMenu.contains(e.target) || menuToggle.contains(e.target);
  if (!clickedInside) {
    sideMenu.classList.remove("open");
    menuToggle.classList.remove("active");
  }
});
