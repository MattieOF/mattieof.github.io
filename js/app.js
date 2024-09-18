import '../css/style.css';

if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  localStorage.theme = 'dark';
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', localStorage.theme === 'dark');
  const button = document.getElementsByName("theme-button");
  if (button.length > 0) { // The button won't exist when this is first called
    button[0].innerText = localStorage.theme === 'dark' ? '☀️' : '🌙';
  }
}
applyTheme();

window.toggleDarkMode = function() {
  if ('theme' in localStorage) {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
  } else {
    localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
  }
  applyTheme();
}

// Add dark mode toggle
window.onload = function() {
  const button = document.createElement('button');
  button.className = 'theme-button-color floating-button';
  button.name = "theme-button";
  button.onclick = toggleDarkMode;
  button.innerText = document.documentElement.classList.contains("dark") ? '☀️' : '🌙';
  document.body.appendChild(button);
}
