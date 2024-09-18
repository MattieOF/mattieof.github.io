let a = "m";
let b = "ttwa.re";

window.addEventListener('load', function() {
  let box = document.getElementById("email-box");
  let email = document.getElementById("email-button");
  box.value = `${a}@${b}`;
  email.href = `mailto:${a}@${b}`;
});
