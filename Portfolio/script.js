let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

let morebtn = document.querySelector("#more");
let lessbtn = document.querySelector("#less");
let hideProjects = document.querySelector(".all-projects .projects-container-1");


morebtn.addEventListener("click", () => {
  hideProjects.style.display = "grid";
  morebtn.style.display = "none";
  lessbtn.style.display = "block";
  hideProjects.style.marginTop = "2rem";
});

lessbtn.addEventListener("click", () => {
  hideProjects.style.display = "none";
  morebtn.style.display = "block";
  lessbtn.style.display = "none";

  // Scroll to the start of the current section
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
  });
});

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active");
        document.querySelector('header nav a[href*="' + id + '"]').classList.add("active");
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
