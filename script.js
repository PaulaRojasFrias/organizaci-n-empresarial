// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".service-card");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.scrollLeft = currentSlide * (slides[0].offsetWidth + 32); // 32px for gap
  }
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.scrollLeft = currentSlide * (slides[0].offsetWidth + 32);
  }
}

// Carousel controls
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

if (nextBtn) {
  nextBtn.addEventListener("click", nextSlide);
}

if (prevBtn) {
  prevBtn.addEventListener("click", prevSlide);
}

// Auto-scroll carousel
setInterval(() => {
  if (document.querySelector(".carousel")) {
    nextSlide();
  }
}, 5000);

// Smooth scrolling para todos los enlaces con #
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // 80px para compensar la navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".service-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Add glitch effect on hover for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const title = card.querySelector("h3");
    if (title) {
      title.style.animation = "glitch 0.3s ease-in-out";
    }
  });

  card.addEventListener("mouseleave", () => {
    const title = card.querySelector("h3");
    if (title) {
      title.style.animation = "none";
    }
  });
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Solución alternativa más directa
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scroll-btn");
  const servicesSection = document.getElementById("servicios");

  if (scrollBtn && servicesSection) {
    scrollBtn.addEventListener("click", function () {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
});
