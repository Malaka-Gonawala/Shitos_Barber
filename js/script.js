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

// Mobile Hamburger Menu Functionality
const hamburgerBtn = document.querySelector("#Hamburger-Btn");
const mobileMenu = document.querySelector("#Mobile-Menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const toggleMobileMenu = () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", isOpen);

  // Prevent background scrolling when menu is open
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
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
