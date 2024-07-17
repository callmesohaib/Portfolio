let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector('header nav a[href*="' + id + '"]')
          .classList.add("active");
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const projectContainer = document.getElementById("project-container");
  const showMoreBtn = document.getElementById("show-more");
  const showLessBtn = document.getElementById("show-less");
  let projects = [];
  let isExpanded = false;

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 500);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section, index) => {
    observer.observe(section);
  });

  fetch("./JSON/project.json")
    .then((response) => response.json())
    .then((data) => {
      projects = data;
      renderProjects();
    });

  function renderProjects() {
    projectContainer.innerHTML = "";
    const visibleProjects = isExpanded ? projects : projects.slice(0, 4);

    visibleProjects.forEach((project, index) => {
      const projectBox = document.createElement("div");
      projectBox.classList.add("project-box");
      projectBox.innerHTML = `
          <div class="img">
            <img src="${project.img}" alt="${project.title}" />
          </div>
          
            <div class="desc">
              <div class="project-heading">${project.title}</div>
              <p>${project.description}</p>
               <a href="${project.codeLink}"><div class="btn code">
               Code
              </div></a>
          </div>
        `;
      projectContainer.appendChild(projectBox);
      setTimeout(() => {
        projectBox.classList.add("visible");
      }, index * 100);
    });

    showMoreBtn.style.display =
      isExpanded || projects.length <= 4 ? "none" : "block";
    showLessBtn.style.display = isExpanded ? "block" : "none";
  }

  showMoreBtn.addEventListener("click", () => {
    isExpanded = true;
    renderProjects();
  });

  showLessBtn.addEventListener("click", () => {
    isExpanded = false;
    renderProjects();
  });
});
