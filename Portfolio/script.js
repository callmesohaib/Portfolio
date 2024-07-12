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
  fetch("project.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById("projects-container");
      const projectsContainer1 = document.getElementById(
        "projects-container-1"
      );

      data.slice(0, 4).forEach((project) => {
        const projectBox = createProjectBox(project);
        projectsContainer.appendChild(projectBox);
      });

      data.slice(4).forEach((project) => {
        const projectBox = createProjectBox(project);
        projectsContainer1.appendChild(projectBox);
      });

      document.getElementById("more").addEventListener("click", () => {
        projectsContainer1.style.display = "grid";
        document.getElementById("more").style.display = "none";
        document.getElementById("less").style.display = "block";

      });

      document.getElementById("less").addEventListener("click", () => {
        projectsContainer1.style.display = "none";
        document.getElementById("more").style.display = "block";
        document.getElementById("less").style.display = "none";
      });
    })
    .catch((error) => console.error("Error fetching the projects:", error));
});

function createProjectBox(project) {
  const projectBox = document.createElement("div");
  projectBox.classList.add("project-box");

  const projectInfo = document.createElement("div");
  projectInfo.classList.add("project-info");

  const img = document.createElement("img");
  img.src = project.image;
  img.alt = "";

  const link = document.createElement("a");
  link.href = project.link;

  const description = document.createElement("h3");
  description.textContent = project.description;

  link.appendChild(description);
  projectInfo.appendChild(img);
  projectInfo.appendChild(link);
  projectBox.appendChild(projectInfo);

  return projectBox;
}
