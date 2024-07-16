
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
  
    document
      .querySelector(".skill-show")
      .addEventListener("click", showMoreSkills);
    document
      .querySelector(".skill-less")
      .addEventListener("click", showLessSkills);
  
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
  