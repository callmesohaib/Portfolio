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
          <div class="content">
            <div class="heading1">${project.title}</div>
            <div class="desc">
              <div class="heading1">${project.title}</div>
              <p>${project.description}</p>
               <a href="${project.codeLink}"><div class="btn code">
               Code
              </div></a>
            </div>
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

document.addEventListener("DOMContentLoaded", () => {
  fetch("./JSON/skills.json")
    .then((response) => response.json())
    .then((data) => {
      showSkills(data);
    });

  function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";

    skills.forEach((skill, index) => {
      skillHTML += `
        <div class="bar ${index >= 6 ? "hidden" : ""}">
          <div class="info">
            <img src="${skill.icon}" alt="skill" />
            <span>${skill.name}</span>
          </div>
        </div>`;
    });

    skillsContainer.innerHTML = skillHTML;
  }

  document.querySelector(".skill-show").addEventListener("click", showMoreSkills);
  document.querySelector(".skill-less").addEventListener("click", showLessSkills);

  function showMoreSkills() {
    const hiddenSkills = document.querySelectorAll(".bar.hidden");
    hiddenSkills.forEach((skill, index) => {
      setTimeout(() => {
        skill.classList.remove("hidden");
        skill.classList.add("visible");
      }, 100 * index); 
    });
    document.querySelector(".skill-show").style.display = "none";
    document.querySelector(".skill-less").style.display = "block";
  }

  function showLessSkills() {
    const skills = document.querySelectorAll(".bar");
    skills.forEach((skill, index) => {
      if (index >= 6) {
        skill.classList.remove("visible");
        skill.classList.add("hidden");
      }
    });
    document.querySelector(".skill-show").style.display = "block";
    document.querySelector(".skill-less").style.display = "none";
  }
});
