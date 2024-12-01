let a = "m";
let b = "ttwa.re";

window.addEventListener('load', function() {
  let box = document.getElementById("email-box");
  let email = document.getElementById("email-button");
  box.value = `${a}@${b}`;
  email.href = `mailto:${a}@${b}`;

  // Lazy load videos
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let video = entry.target;
        video.play();
        observer.unobserve(video);
      }
    });
  }, options);

  for (let video of document.getElementsByClassName("portfolio-video")) {
    observer.observe(video);
  }

  // let projects = document.getElementsByClassName("portfolio-project");
  // for (let i = 0; i < projects.length; i++) {
  //   let proj = projects[i];
  //   proj.style.height = `${proj.scrollHeight}px`;
  // }
});

window.portfolioItemClicked = function(item) {
  // MW @hack: For some reason, when hiding the long description, the height is not reset to the initial height
  // (and is usually just ~4px shorter than with it visible).
  // So, we cache the initial height, and then set it back to it if we've just hidden the long description.

  const desc = document.getElementById(item + "-desc");
  const longDesc = document.getElementById(item + "-more-desc");

  desc.classList.toggle("hidden");
  longDesc.classList.toggle("hidden");

  // if (desc.style.display == "none") {
  //   desc.style.display = "block";
  //   longDesc.style.display = "none";
  // } else {
  //   desc.style.display = "none";
  //   longDesc.style.display = "block";
  // }

  // let proj = document.getElementById("proj-" + item);
  // proj.style.height = `${proj.scrollHeight}px`;

  // document.getElementById(item + "-desc").classList.toggle("hidden");
  // var longDescVisible = !document.getElementById(item + "-more-desc").classList.toggle("hidden");
  // let proj = document.getElementById("proj-" + item);
  // proj.style.height = longDescVisible ? `${proj.scrollHeight}px` : `${proj.getAttribute("initialHeight")}px`;
}
