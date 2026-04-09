document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll('.menu a, .mobile-menu a, .footer-links a');
  const sections = document.querySelectorAll("main section[id]");
  const reveals = document.querySelectorAll(".reveal");
  const typingText = document.getElementById("typing-text");
  const cursorLight = document.querySelector(".cursor-light");
  const contactForm = document.querySelector(".contact-form");

  /* =========================
     1. MOBILE MENU TOGGLE
  ========================= */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  /* =========================
     2. TYPING EFFECT
  ========================= */
  const typingWords = [
    "Professional Barista",
    "Coffee Consultant",
    "Menu Creator",
    "Bar Trainer",
    "Product Manager"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = typingWords[wordIndex];
    const visibleText = currentWord.substring(0, charIndex);
    typingText.textContent = visibleText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      typingSpeed = 90;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      typingSpeed = 45;
    } else if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1400;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      typingSpeed = 250;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* =========================
     3. CURSOR LIGHT EFFECT
  ========================= */
  if (cursorLight) {
    document.addEventListener("mousemove", (e) => {
      cursorLight.style.left = `${e.clientX}px`;
      cursorLight.style.top = `${e.clientY}px`;
    });
  }

  /* =========================
     4. HEADER SCROLL EFFECT
  ========================= */
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 30) {
      header.style.background = "rgba(10, 10, 10, 0.78)";
      header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.20)";
      header.style.backdropFilter = "blur(22px)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.5)";
      header.style.boxShadow = "none";
      header.style.backdropFilter = "blur(18px)";
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* =========================
     5. SCROLL REVEAL ANIMATION
  ========================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.8s ease";
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  reveals.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(45px)";
    revealObserver.observe(item);
  });

  /* =========================
     6. ACTIVE NAV LINK ON SCROLL
  ========================= */
  function setActiveNav() {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      const href = link.getAttribute("href");

      if (href === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* =========================
     7. SMOOTH SCROLL CLOSE MENU
  ========================= */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    });
  });

  /* =========================
     8. CONTACT FORM DEMO SUCCESS
  ========================= */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = contactForm.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "rgba(255, 90, 90, 0.7)";
        } else {
          input.style.borderColor = "rgba(231, 199, 122, 0.35)";
        }
      });

      if (!isValid) {
        alert("Iltimos, barcha maydonlarni to‘ldiring.");
        return;
      }

      alert("Xabaringiz yuborildi. Tez orada siz bilan bog‘lanamiz.");
      contactForm.reset();

      inputs.forEach((input) => {
        input.style.borderColor = "rgba(255,255,255,0.08)";
      });
    });
  }

  /* =========================
     9. PARALLAX FEEL FOR HERO
  ========================= */
  const hero = document.querySelector(".hero");
  const smoke1 = document.querySelector(".smoke-1");
  const smoke2 = document.querySelector(".smoke-2");
  const smoke3 = document.querySelector(".smoke-3");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (hero && scrollY < hero.offsetHeight) {
      if (smoke1) smoke1.style.transform = `translateY(${scrollY * 0.08}px)`;
      if (smoke2) smoke2.style.transform = `translateY(${scrollY * -0.05}px)`;
      if (smoke3) smoke3.style.transform = `translateY(${scrollY * 0.04}px)`;
    }
  });
});