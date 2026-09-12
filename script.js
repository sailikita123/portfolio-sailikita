/* ---------- Preloader ---------- */
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
  setTimeout(() => preloader && preloader.classList.add("done"), 400);
});

/* ---------- Footer year ---------- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav ---------- */
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

/* ---------- Contact form ---------- */
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  if (!status) return;

  status.textContent = "Thanks for reaching out! Please email me directly at sailikitas@gmail.com and I will respond soon.";
}

/* ---------- LeetCode count (edit this one line) ---------- */
const LEETCODE_COUNT = "150+";
document.querySelectorAll(".js-leetcode-count").forEach(el => {
  el.textContent = LEETCODE_COUNT;
});

/* ---------- Typewriter over the hero role line ---------- */
const typewriterEl = document.getElementById("typewriter");
const ROLES = ["Software Engineer", "Full-Stack Developer", "Java Developer", "Problem Solver"];

if (typewriterEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 70);
  }
  tick();
} else if (typewriterEl) {
  typewriterEl.textContent = ROLES[0];
}

/* ---------- Section-title reveal (one moment per section) ---------- */
const titleTargets = document.querySelectorAll(".section-title");

/* ---------- Stagger reveal for card groups ---------- */
const staggerGroups = [
  ".about-highlights .highlight-card",
  ".skills-grid .skills-group",
  ".projects-grid .project-card",
  ".timeline .timeline-item",
  ".certs-activities > div",
];

staggerGroups.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--delay", `${Math.min(i, 6) * 80}ms`);
  });
});

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  [...titleTargets, ...revealTargets].forEach(el => revealObserver.observe(el));
} else {
  [...titleTargets, ...revealTargets].forEach(el => el.classList.add("in-view"));
}

/* ---------- Tilt-on-hover for cards marked [data-tilt] ---------- */
if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    let frame = null;

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      if (frame) cancelAnimationFrame(frame);
      card.style.transform = "";
    });
  });

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow) {
    window.addEventListener("mousemove", e => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }
}

/* ---------- Nav active-section highlight ---------- */
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(s => navObserver.observe(s));
}

/* ---------- Particle constellation background ---------- */
(function particles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, dpr;
  let points = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(70, Math.floor((width * height) / 22000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(139, 108, 247, ${0.14 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach(p => {
      ctx.fillStyle = "rgba(53, 208, 192, 0.55)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  step();
})();
