// ===================================
// LOGIC SCROLL TO TOP
// ===================================
function scrolltop() {
  const home = document.querySelector("#home");
  if (home) {
    home.scrollIntoView({
      behavior: "smooth",
    });
  }
}

// ===================================
// LOGIC TYPEWRITER EFFECT (FUTURISTIK)
// ===================================
const textToType = "Hai, saya Ilham Boy Fortune";
const typingElement = document.getElementById("typing-text-area");
const typingSpeed = 70; // Kecepatan mengetik (ms)
let charIndex = 0;

function typewriter() {
  if (!typingElement) return;

  // Tambahkan Kursor Berkedip (Styling dari CSS)
  typingElement.innerHTML =
    textToType.substring(0, charIndex) + '<span class="typing-cursor"></span>';

  if (charIndex < textToType.length) {
    charIndex++;
    setTimeout(typewriter, typingSpeed);
  } else {
    // Setelah selesai, biarkan kursor berkedip
    typingElement.innerHTML =
      textToType + '<span class="typing-cursor"></span>';
  }
}

// ===================================
// LOGIC EFEK BINTANG PADA HOME SECTION
// ===================================
function createStarParticles() {
  const homeSection = document.getElementById("home");
  if (!homeSection) return;

  const numStars = 50; // Jumlah bintang
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star-particle");

    const x = Math.random() * 100; // 0% to 100% width
    const y = Math.random() * 100; // 0% to 100% height
    const size = Math.random() * 3 + 1; // Ukuran 1px hingga 4px
    const delay = Math.random() * 5; // Delay 0s to 5s
    const duration = Math.random() * 3 + 2; // Durasi animasi 2s to 5s

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;

    homeSection.appendChild(star);
  }
}

// =========================================================
// LOGIC SCROLL-IN ANIMATION (EFEK MASUK SAAT SCROLL)
// =========================================================
function setupScrollInAnimation() {
  const scrollElements = document.querySelectorAll(".scroll-in-element");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1,
    }
  );

  scrollElements.forEach((element) => {
    observer.observe(element);
  });
}

// =========================================================
// LOGIC PRELOADER: GLITCH/FUTURISTIC BOOT SEQUENCE (SEQUENTIAL)
// =========================================================
const preloader = document.getElementById("preloader");
const loadingText = document.getElementById("loading-text");
const messages = [
  "// BOOT SEQUENCE INIT",
  "// SYSTEM CHECK: OK",
  "// LOADING UI FRAMEWORK...",
  "// USER AUTHENTICATION: ILHAM BOY FORTUNE",
  "// ACCESS GRANTED.",
  "LOADING PORTFOLIO...",
];

let messageIndex = 0;
let charIndexBoot = 0;
let isTyping = false;

function typeMessage() {
  if (!loadingText || messageIndex >= messages.length) {
    // Urutan Selesai. Siap Transisi.
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("hidden");

        // START TYPEWRITER SETELAH PRELOADER FADE OUT DIMULAI
        typewriter();

        setTimeout(() => preloader.remove(), 700);
      }
    }, 800);
    return;
  }

  const currentMessage = messages[messageIndex];

  if (!isTyping) {
    // Tampilkan prompt terminal
    loadingText.innerHTML = `<span class="prompt">></span> <span class="text"></span>`;
    isTyping = true;
    charIndexBoot = 0;
  }

  const textSpan = loadingText.querySelector(".text");
  if (textSpan && charIndexBoot < currentMessage.length) {
    textSpan.textContent += currentMessage.charAt(charIndexBoot);
    charIndexBoot++;

    // Atur kecepatan ketik per karakter
    setTimeout(typeMessage, 30);
  } else {
    // Pesan selesai diketik
    isTyping = false;
    messageIndex++;

    // Jeda sebentar sebelum pesan berikutnya
    setTimeout(typeMessage, 600);
  }
}

// ===================================
// LOGIC MODE GELAP / MODE TERANG
// ===================================
const toggleButton = document.getElementById("mode-toggle");
const mobileToggleButton = document.getElementById("mobile-mode-toggle");
const body = document.body;

// 1. Fungsi untuk mengatur mode
function setMode(mode) {
  const sunIcon = '<i class="fa-solid fa-sun t-white"></i>';
  const moonIcon = '<i class="fa-solid fa-moon t-white"></i>';

  const mobileSunText = '<i class="fa-solid fa-sun"></i> Light Mode';
  const mobileMoonText = '<i class="fa-solid fa-moon"></i> Dark Mode';

  if (mode === "light") {
    body.classList.add("light-mode");

    if (toggleButton) toggleButton.innerHTML = moonIcon;
    if (mobileToggleButton) mobileToggleButton.innerHTML = mobileMoonText;

    localStorage.setItem("mode", "light");
  } else {
    body.classList.remove("light-mode");

    if (toggleButton) toggleButton.innerHTML = sunIcon;
    if (mobileToggleButton) mobileToggleButton.innerHTML = mobileSunText;

    localStorage.setItem("mode", "dark");
  }
}

// 2. Logika untuk menampilkan/menyembunyikan tombol scroll-top
function handleScroll() {
  const scrollTopBtn = document.getElementById("scroll-top");
  const navbar = document.getElementById("navbar");

  if (navbar && window.scrollY > navbar.offsetHeight) {
    if (scrollTopBtn) scrollTopBtn.style.display = "flex";
  } else {
    if (scrollTopBtn) scrollTopBtn.style.display = "none";
  }
}

// ===================================
// INISIALISASI SEMUA FUNGSI
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Mode Tema
  const currentMode = localStorage.getItem("mode");
  setMode(currentMode === "light" ? "light" : "dark");

  // 2. Inisialisasi Handler Mode Toggle
  const handleToggleClick = () => {
    const isLight = body.classList.contains("light-mode");
    setMode(isLight ? "dark" : "light");
  };

  if (toggleButton) {
    toggleButton.addEventListener("click", handleToggleClick);
  }

  if (mobileToggleButton) {
    mobileToggleButton.addEventListener("click", () => {
      handleToggleClick();
      const mobileMenu = document.getElementById("mobile-nav-menu");
      if (mobileMenu) mobileMenu.classList.remove("active");
    });
  }

  // 3. Inisialisasi Mobile Menu
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-nav-menu");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const mobileMenuLinks = document.querySelectorAll("#mobile-nav-menu ul a");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      setMode(body.classList.contains("light-mode") ? "light" : "dark");
      mobileMenu.classList.add("active");
    });
  }

  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.remove("active");
    });
  });

  // 4. Panggil Efek Visual (Hanya yang tidak bergantung pada preloader)
  createStarParticles();
  setupScrollInAnimation();

  // 5. Inisialisasi Scroll Listener
  window.addEventListener("scroll", handleScroll);
});

// Event yang dipicu setelah semua aset (termasuk gambar) dimuat
window.onload = function () {
  // Jalankan LOGIKA BOOT SEQUENCE BARU di sini
  typeMessage();

  // Pastikan tombol scroll top diatur dengan benar saat dimuat
  handleScroll();
};
