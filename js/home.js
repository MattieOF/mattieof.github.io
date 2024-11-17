let a = "m";
let b = "ttwa.re";

window.addEventListener('load', function() {
  let box = document.getElementById("email-box");
  let email = document.getElementById("email-button");
  box.value = `${a}@${b}`;
  email.href = `mailto:${a}@${b}`;

  let projects = document.getElementsByClassName("portfolio-project");
  for (let i = 0; i < projects.length; i++) {
    let proj = projects[i];
    proj.style.height = `${proj.scrollHeight}px`;
    proj.setAttribute("initialHeight", proj.scrollHeight.toString()); // Cache the initial height for a hack later (see portfolioItemClicked)
  }
});

window.portfolioItemClicked = function(item) {
  // MW @hack: For some reason, when hiding the long description, the height is not reset to the initial height
  // (and is usually just ~4px shorter than with it visible).
  // So, we cache the initial height, and then set it back to it if we've just hidden the long description.
  document.getElementById(item + "-desc").classList.toggle("hidden");
  var longDescVisible = !document.getElementById(item + "-more-desc").classList.toggle("hidden");
  let proj = document.getElementById("proj-" + item);
  proj.style.height = longDescVisible ? `${proj.scrollHeight}px` : `${proj.getAttribute("initialHeight")}px`;
}
