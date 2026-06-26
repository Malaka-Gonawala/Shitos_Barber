const navContainer = document.querySelector("#Nav-Container");

/**
 * Calculates the scroll threshold (6rem) in pixels dynamically
 * based on the root html element's font size.
 */
const getScrollThreshold = () => {
  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return 6 * rootFontSize;
};

/**
 * Toggles navbar states (expanded vs base circular state)
 * based on scroll position.
 */
const handleScroll = () => {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const threshold = getScrollThreshold();

  if (scrollPosition >= threshold) {
    navContainer.classList.add("expanded");
  } else {
    navContainer.classList.remove("expanded");
  }
};

// Listen to scroll events
window.addEventListener("scroll", handleScroll);

// Set the initial state on DOM content load
window.addEventListener("DOMContentLoaded", handleScroll);
// Run once immediately in case scripts load late
handleScroll();

// ── Mobile Hamburger Menu ──
const hamburgerBtn = document.querySelector("#Hamburger-Btn");
const mobileMenu = document.querySelector("#Mobile-Menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const toggleMobileMenu = () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", isOpen);

  // Prevent background scrolling when menu is open
  document.body.style.overflow = isOpen ? "hidden" : "";
};

hamburgerBtn.addEventListener("click", toggleMobileMenu);

// Close menu when a link is clicked
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburgerBtn.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ── Gallery and Lightbox Carousel Logic ──

const galleryMedia = [
  { type: "video", src: "assets/video/main.mp4" },
  { type: "video", src: "assets/video/redvid_io_5e03ee0282.mp4" },
  {
    type: "video",
    src: "assets/video/ssstik.io_@shitosbarber_1782500784146.mp4",
  },
  {
    type: "video",
    src: "assets/video/ssstik.io_@shitosbarber_1782501252250.mp4",
  },
  {
    type: "video",
    src: "assets/video/ssstik.io_@shitosbarber_1782501436302.mp4",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.54 (1).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.54 (2).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.54 (3).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.54 (4).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.54.jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (1).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (2).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (3).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (4).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (5).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55 (6).jpeg",
  },
  {
    type: "image",
    src: "assets/img/WhatsApp Image 2026-06-26 at 20.51.55.jpeg",
  },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Shuffling excluding the first item (main.mp4)
const firstItem = galleryMedia[0];
const restItems = galleryMedia.slice(1);
const shuffledRest = shuffleArray(restItems);
const finalMedia = [firstItem, ...shuffledRest];

let activeIndex = 0;
const INITIAL_SHOW_COUNT = 4; // initially show 4 items
let showingAll = false;

const galleryGrid = document.querySelector("#Gallery-Grid");
const galleryMoreBtn = document.querySelector("#Gallery-More-Btn");
const lightbox = document.querySelector("#Lightbox");
const lightboxContent = lightbox.querySelector(".lightbox-content");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");

const renderGallery = () => {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  finalMedia.forEach((media, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("gallery-item");
    if (media.type === "video") {
      itemDiv.classList.add("video-item");
    }
    if (index >= INITIAL_SHOW_COUNT) {
      itemDiv.classList.add("hidden-item");
    }

    // Media markup
    if (media.type === "video") {
      itemDiv.innerHTML = `
        <video src="${media.src}" autoplay loop muted playsinline></video>
      `;
    } else {
      itemDiv.innerHTML = `
        <img src="${media.src}" alt="Taglio di capelli Shitos Barber Milano" loading="lazy" />
      `;
    }

    itemDiv.addEventListener("click", () => {
      openLightbox(index);
    });

    galleryGrid.appendChild(itemDiv);
  });
};

const openLightbox = (index) => {
  activeIndex = index;
  updateLightboxContent();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightboxContent.innerHTML = ""; // Stop video playback
  document.body.style.overflow = "";
};

const updateLightboxContent = () => {
  lightboxContent.innerHTML = "";
  const media = finalMedia[activeIndex];

  if (media.type === "video") {
    lightboxContent.innerHTML = `
      <video src="${media.src}" controls autoplay playsinline></video>
    `;
  } else {
    lightboxContent.innerHTML = `
      <img src="${media.src}" alt="Taglio di capelli Shitos Barber Milano" />
    `;
  }

  // Update button states (extremities disabled)
  lightboxPrev.disabled = activeIndex === 0;
  lightboxNext.disabled = activeIndex === finalMedia.length - 1;
};

// Next / Prev listeners
lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  if (activeIndex > 0) {
    activeIndex--;
    updateLightboxContent();
  }
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  if (activeIndex < finalMedia.length - 1) {
    activeIndex++;
    updateLightboxContent();
  }
});

// Close listeners
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", closeLightbox);
lightboxContent.addEventListener("click", (e) => e.stopPropagation());

// Keyboard navigation in lightbox
window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex--;
    updateLightboxContent();
  } else if (e.key === "ArrowRight" && activeIndex < finalMedia.length - 1) {
    activeIndex++;
    updateLightboxContent();
  } else if (e.key === "Escape") {
    closeLightbox();
  }
});

// "Visualizza altro" button logic
if (galleryMoreBtn) {
  galleryMoreBtn.addEventListener("click", () => {
    const hiddenItems = galleryGrid.querySelectorAll(".hidden-item");
    if (!showingAll) {
      // Show all
      hiddenItems.forEach((item) => item.classList.remove("hidden-item"));
      galleryMoreBtn.textContent = "MOSTRA MENO";
      showingAll = true;
    } else {
      // Hide
      const allItems = galleryGrid.querySelectorAll(".gallery-item");
      allItems.forEach((item, index) => {
        if (index >= INITIAL_SHOW_COUNT) {
          item.classList.add("hidden-item");
        }
      });
      galleryMoreBtn.textContent = "VISUALIZZA ALTRO";
      showingAll = false;
      // Scroll back to gallery top smoothly
      document.querySelector("#work").scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Initialize Gallery
if (galleryGrid && galleryMoreBtn) {
  renderGallery();
}
