const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  if (!status) return;

  status.textContent = "Thanks for reaching out! Please email me directly at sailikita@gmail.com and I will respond soon.";
}
