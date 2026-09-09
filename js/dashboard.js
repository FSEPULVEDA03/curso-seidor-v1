const session = sessionStorage.getItem("novaraSession") || localStorage.getItem("novaraSession");

if (!session) {
  window.location.replace("index.html");
}

const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector("#sidebarOverlay");
const mobileMenu = document.querySelector("#mobileMenu");
const sidebarClose = document.querySelector("#sidebarClose");

function setSidebar(open) {
  sidebar.classList.toggle("is-open", open);
  overlay.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

mobileMenu.addEventListener("click", () => setSidebar(true));
sidebarClose.addEventListener("click", () => setSidebar(false));
overlay.addEventListener("click", () => setSidebar(false));

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((link) => link.classList.remove("is-active"));
    item.classList.add("is-active");
    if (window.innerWidth <= 900) setSidebar(false);
  });
});

document.querySelector("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem("novaraSession");
  sessionStorage.removeItem("novaraSession");
  window.location.replace("index.html");
});

const dateText = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(new Date());

document.querySelector("#currentDate").textContent = dateText.toUpperCase();
