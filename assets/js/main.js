// =========================
// Bab Al Maghrib - main.js
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const heroBg = document.querySelector(".hero-bg");
  const playBtn = document.querySelector(".play-btn");

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-cta[href^="#"], .btn[href^="#"]');
  const sections = document.querySelectorAll("main section[id], header[id]");

  const revealItems = document.querySelectorAll(
    ".destination-card, .mini-card, .featured-card, .discover-reasons article, .category-block"
  );

  // =========================
  // Smooth scroll
  // =========================
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });

  // =========================
  // Navbar on scroll
  // =========================
  const updateNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  // =========================
  // Active nav link on section
  // =========================
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight + 40 : 100);

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  };

  // =========================
  // Hero parallax
  // =========================
  const updateParallax = () => {
    if (!heroBg) return;
    const offset = Math.min(window.scrollY * 0.22, 120);
    heroBg.style.transform = `scale(1.04) translateY(${offset}px)`;
  };

  // =========================
  // Reveal on scroll
  // =========================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 40}ms`;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach(item => {
    item.classList.add("reveal-item");
    revealObserver.observe(item);
  });

  // =========================
  // Hover light follow
  // =========================
  const glowCards = document.querySelectorAll(".destination-card, .mini-card, .thumb-card, .featured-card");

  glowCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
  });

  // =========================
  // Video button demo behavior
  // =========================
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      alert("You can connect this button later to a YouTube video or a custom modal.");
    });
  }

  // =========================
  // Run on load + scroll
  // =========================
  updateNavbar();
  updateActiveNav();
  updateParallax();

  window.addEventListener("scroll", () => {
    updateNavbar();
    updateActiveNav();
    updateParallax();
  });
});







document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("typed-line-1");
  const line2 = document.getElementById("typed-line-2");

  if (!line1 || !line2) return;

  const text1 = "Discover the timeless";
  const text2 = "soul of Morocco";

  let i = 0;
  let j = 0;

  function typeLine1() {
    if (i < text1.length) {
      line1.textContent += text1.charAt(i);
      i++;
      setTimeout(typeLine1, 55);
    } else {
      setTimeout(typeLine2, 200);
    }
  }

  function typeLine2() {
    if (j < text2.length) {
      line2.textContent += text2.charAt(j);
      j++;
      setTimeout(typeLine2, 55);
    }
  }

  typeLine1();
});