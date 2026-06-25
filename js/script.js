const body = document.querySelector("body");
const nav_container = document.querySelector("#Nav-Container");
const nav_active = false;

const toggleNab = () => {
  if (!nav_active) {
    nav_container.classList.add("nav-container-visible");
    nav_active = true;
  } else {
    nav_container.classList.remove("nav-container-hidden");
    nav_active = false;
  }
};

body.addEventListener("click", toggleNab);
