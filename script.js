const reveals = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((item) => observer.observe(item));

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

const typingTarget = document.getElementById("typing-text");

const typingWords = [
  "professional barista",
  "coffee product manager",
  "menu creator",
  "bar trainer",
  "quality control expert"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (!isDeleting) {
    typingTarget.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    typingTarget.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  const speed = isDeleting ? 45 : 85;
  setTimeout(typeEffect, speed);
}

if (typingTarget) {
  typeEffect();
}

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const phone = form.querySelector("input[type='tel']").value;
    const text = form.querySelector("textarea").value;

    const message = `Yangi mijoz:%0AIsm: ${name}%0ATel: ${phone}%0AXabar: ${text}`;

    window.open(`https://t.me/alximiyaa?text=${message}`, "_blank");
  });
}

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", function(e) {
    e.preventDefault();

    const imgSrc = this.querySelector("img").src;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.9)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "20px";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
  });
});
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", function(e) {
    e.preventDefault();

    const imgSrc = this.querySelector("img").src;

    const overlay = document.createElement("div");
    overlay.classList.add("lightbox");

    const img = document.createElement("img");
    img.src = imgSrc;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      overlay.remove();
    });
  });
});

const light = document.querySelector(".cursor-light");

document.addEventListener("mousemove", (e) => {
  light.style.left = e.clientX + "px";
  light.style.top = e.clientY + "px";
});